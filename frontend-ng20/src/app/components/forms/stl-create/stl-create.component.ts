import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from "../../reusable/navbar/navbar.component";
import { ReactiveFormsModule } from '@angular/forms';
import { StlService } from '../../../services/stl.service';
import { Router } from '@angular/router';
import { AuthService } from "../../../services/auth.service";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-stl-create',
  standalone: true,
  imports: [NavbarComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './stl-create.component.html',
  styleUrl: './stl-create.component.css'
})
export class StlCreateComponent {
  postSTLForm: FormGroup;
  selectedFile: File | null = null;
  selectedImages: File[] = [];

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
      price: [""],
    });
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    console.log(file?.name.endsWith(".stl"))
    console.log(file)
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
    console.log("valid: ",this.postSTLForm.valid)
    console.log(this.postSTLForm.value)
    console.log("selectedfile",this.selectedFile)
    if (!this.postSTLForm.valid || !this.selectedFile) {
      alert("Please fill the form correctly and select a .stl file.");
      return;
    }


    try {
      // ✅ Subir STL
      const stlUrl = await this.stlService.uploadSTL(this.selectedFile, this.auth.userId.toString());

      // ✅ Subir imágenes
      const imageUrls: string[] = [];
      for (const image of this.selectedImages) {
        const url = await this.stlService.uploadImagePreview(image);
        imageUrls.push(url);
      }

      // 📦 Enviar datos al backend (Django)
      const payload = {
        ...this.postSTLForm.value,
        file_url: stlUrl,
        images: imageUrls
      };

      this.stlService.createSTL(payload).subscribe({
        next: (res) => {
          console.log("STL saved:", res);
          this.router.navigate(['/explore']);
        },
        error: (err) => {
          console.error("Upload failed:", err);
        }
      });

    } catch (err) {
      console.error("Upload error:", err);
      alert("Something went wrong during upload.");
    }
  }
}



