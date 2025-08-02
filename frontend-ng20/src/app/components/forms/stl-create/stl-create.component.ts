import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from "../../reusable/navbar/navbar.component";
import { ReactiveFormsModule } from '@angular/forms';
import { StlService } from '../../../services/stl.service';
import { Router } from '@angular/router';
import { AuthService } from "../../../services/auth.service";
import { HttpClient } from '@angular/common/http';
import { STLCategories } from "../../../models/category.models";
import { NgSelectModule } from '@ng-select/ng-select';


@Component({
  selector: 'app-stl-create',
  standalone: true,
  imports: [NavbarComponent, ReactiveFormsModule, CommonModule, NgSelectModule],
  templateUrl: './stl-create.component.html',
  styleUrl: './stl-create.component.css'
})
export class StlCreateComponent {
  postSTLForm: FormGroup;
  selectedFile: File | null = null;
  selectedImages: File[] = [];
  categoryOptions = Object.values(STLCategories);

  constructor(
    private fb: FormBuilder,
    private stlService: StlService,
    private router: Router,
    private http: HttpClient,
    private auth: AuthService,
  ) {
    this.postSTLForm = this.fb.group({
      name: ["", [Validators.required, Validators.minLength(6), Validators.maxLength(30)]],
      description: ["", [Validators.required, Validators.minLength(25), Validators.maxLength(300)]],
      category1: ["", Validators.required],
      category2: ["", Validators.required],
      price: [null, [Validators.required ,Validators.min(2)]],  // ← Validación del precio mínimo si aplica
    });
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (file) {
      const ext = file.name.split('.').pop()?.toLowerCase();
      if (ext === 'stl' || ext === 'zip') {
        this.selectedFile = file;
      } else {
        alert("Only .stl or .zip files are allowed.");
        this.selectedFile = null;
        input.value = '';
      }
    }
  }

  onImagesSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      const files = Array.from(input.files).filter(file =>
        ['image/jpeg', 'image/png', 'image/webp'].includes(file.type)
      );

      if (files.length > 4) {
        alert("You can upload a maximum of 4 images.");
        return;
      }

      this.selectedImages = files;
    }
  }

  async onSubmit() {
    if (!this.postSTLForm.valid || !this.selectedFile) {
      alert("Please complete all required fields and select a .stl or .zip file.");
      return;
    }

    try {
      const userId = localStorage.getItem("userId") ?? "";
      if (!userId) throw new Error("User ID is missing!");

      // ✅ 1. Subir STL a Firebase
      const stlUrl = await this.stlService.uploadSTL(this.selectedFile, userId);

      // ✅ 2. Subir imágenes (opcional)
      const imageUrls: string[] = [];
      for (const image of this.selectedImages) {
        const url = await this.stlService.uploadImagePreview(image);
        imageUrls.push(url);
      }

      // ✅ 3. Enviar metadata al backend Django
      const payload = {
        ...this.postSTLForm.value,
        file_url: stlUrl,
        images: imageUrls,
      };

      this.stlService.createSTL(payload).subscribe({
        next: (res) => {
          console.log("STL saved:", res);
          this.router.navigate(['/explore']);
        },
        error: (err) => {
          console.error("Upload failed:", err);
          alert("Server rejected the upload.");
        }
      });

    } catch (err) {
      console.error("Upload error:", err);
      alert("Something went wrong during upload.");
    }
  }
}
