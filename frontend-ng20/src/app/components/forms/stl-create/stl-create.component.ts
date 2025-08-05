import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from "../../reusable/navbar/navbar.component";
import { ReactiveFormsModule } from '@angular/forms';
import { StlService } from '../../../services/stl.service';
import { Router } from '@angular/router';
import { STLCategories } from "../../../models/category.models";
import { NgSelectModule } from '@ng-select/ng-select';
import { StlViewerComponent } from "../../reusable/three-visualizer/three-visualizer";
import { Loader}  from "../../reusable/loader/loader";

@Component({
  selector: 'app-stl-create',
  standalone: true,
  imports: [
    NavbarComponent,
    Loader, 
    ReactiveFormsModule, 
    CommonModule, 
    NgSelectModule, 
    StlViewerComponent
  ],
  templateUrl: './stl-create.component.html',
  styleUrl: './stl-create.component.css'
})
export class StlCreateComponent {
  
  postSTLForm: FormGroup;
  selectedFile: File | null = null;
  selectedImage: File | null = null;
  categoryOptions = Object.values(STLCategories);
  uploadingForm:boolean = false;

  constructor(
    private fb: FormBuilder,
    private stlService: StlService,
    private router: Router
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

  onImageSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (file && ['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      this.selectedImage = file;
    } else {
      alert("Only JPG, PNG or WEBP images are allowed.");
      this.selectedImage = null;
      input.value = '';
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

      this.uploadingForm = true;
      // ✅ 1. Subir STL a Firebase
      const stlUrl = await this.stlService.uploadSTL(this.selectedFile, userId);

      // ✅ 2. Subir imágenes (opcional)
      const imageUrls: string[] = [];
      if (this.selectedImage) {
        const url = await this.stlService.uploadImagePreview(this.selectedImage);
        imageUrls.push(url);
      }


      // ✅ 3. Enviar metadata al backend Django
      const payload = {
        ...this.postSTLForm.value,
        file_url: stlUrl,
        write_images: imageUrls,
      };

      this.stlService.createSTL(payload).subscribe({
        next: (res) => {
          console.log("STL saved:", res);
          this.uploadingForm = false;
          this.router.navigate(["profile"]);
        },
        error: (err) => {
          console.error("Upload failed:", err);
          this.uploadingForm = false;
          alert("Server rejected the upload.");
        }
      });

    } catch (err) {
      console.error("Upload error:", err);
      this.uploadingForm = false;
      alert("Something went wrong during upload.");
    }
  }
}
