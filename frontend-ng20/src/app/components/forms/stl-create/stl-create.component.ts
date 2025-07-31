
import { NavbarComponent } from "../../reusable/navbar/navbar.component";
import { ReactiveFormsModule, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { StlService } from '../../../services/stl.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component } from "@angular/core";
@Component({
  selector: 'app-stl-create',
  imports: [NavbarComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './stl-create.component.html',
  styleUrl: './stl-create.component.css'
})
export class StlCreateComponent{

  postSTLForm:FormGroup;
  selectedFile: File | null = null;
  selectedImages: File[] = [];


  constructor(
    private fb:FormBuilder,
    private stlServive:StlService,
    private router:Router,
    private http:HttpClient
  ){
    this.postSTLForm = this.fb.group({
      name: ["", [Validators.required, Validators.minLength(6), Validators.maxLength(30)]],
      description: ["", [Validators.required, Validators.minLength(25), Validators.maxLength(300)]],  
      category1: ["", Validators.required],
      category2: ["", Validators.required],
      price: [""],
    })
  }


  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.selectedFile = input.files[0];
    }
  }

  onImagesSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      const files = Array.from(input.files);
      this.selectedImages = files.slice(0, 4); // máximo 4 imágenes
    }
  }

  onSubmit() {
    console.log(this.postSTLForm.valid)
    console.log(this.postSTLForm.value)
    if (!this.selectedFile) {
      alert("You must upload a .zip STL file.");
      return;
  }

    if (this.postSTLForm.valid && this.selectedFile) {
      const formData = new FormData();
      formData.append('name', this.postSTLForm.get('name')?.value);
      formData.append('description', this.postSTLForm.get('description')?.value);
      formData.append('stl_file', this.selectedFile); // importante

      const category1 = this.postSTLForm.get('category1')?.value;
      const category2 = this.postSTLForm.get('category2')?.value;
      const price = this.postSTLForm.get('price')?.value;

      if (category1) formData.append('category1', category1);
      if (category2) formData.append('category2', category2);
      if (price) formData.append('price', price);
      this.selectedImages.forEach((img, i) => {
        formData.append('images', img); // Django: request.FILES.getlist('images')
      });

      // enviar a servicio
      this.stlServive.createSTL(formData).subscribe({
        next: (stl:any) => console.log("stl: ", stl),
        error: (err:any)=> console.error(err)
      });
    }
  }

  uploadSTL(data: FormData) {
    return this.http.post('/api/stl/create/', data); // ajusta la URL según tu API
  }



}
