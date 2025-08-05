import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../reusable/navbar/navbar.component';
import { Loader } from '../../reusable/loader/loader';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgSelectComponent } from '@ng-select/ng-select';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { STLCategories } from '../../../models/category.models';
import { StlService } from '../../../services/stl.service';
import { Router } from '@angular/router';
import { StlViewerComponent } from '../../reusable/three-visualizer/three-visualizer';
@Component({
  selector: 'app-stl-update',
  imports: [
    StlViewerComponent,
    NavbarComponent, 
    Loader, 
    ReactiveFormsModule, 
    CommonModule, 
    NgSelectComponent
  ],
  templateUrl: './stl-update.component.html',
  styleUrl: './stl-update.component.css'
})
export class StlUpdateComponent implements OnInit {

  updateSTLForm : FormGroup;
  selectedFile: string | null = null; 
  categoryOption = Object.values(STLCategories);
  uploadingForm:boolean = false;

  constructor(
    private fb:FormBuilder,
    private stlService:StlService,
    private router:Router
  ){
    this.updateSTLForm = this.fb.group({
      name: [this.stlService.selectedSTL.name, [Validators.required, Validators.minLength(6), Validators.maxLength(30)]],
      description: [this.stlService.selectedSTL.description, [Validators.required, Validators.minLength(25), Validators.maxLength(300)]],
      category1: [this.stlService.selectedSTL.category1, Validators.required],
      category2: [this.stlService.selectedSTL.category2, Validators.required],
      price: [this.stlService.selectedSTL.price, [Validators.required ,Validators.min(2)]],  // ← Validación del precio mínimo si aplica
    });
  }

  ngOnInit(): void {
    this.selectedFile = this.stlService.selectedSTL.file_url
  }

  

  onSubmit(){
    if(!this.updateSTLForm.valid){
      alert("Please complete all the required fields")
      return 
    }

    try {
      const userId = localStorage.getItem("userId")?? "";
      if(!userId) throw new Error("User id is Missing!");

      this.uploadingForm = true;
      const payload = {
        ...this.updateSTLForm.value, 
        file_url : this.stlService.selectedSTL.file_url,
        write_images: this.stlService.selectedSTL.images,
      };
      
      this.stlService.updateSTL(payload, this.stlService.selectedSTL.id??0).subscribe({
        next: (res) => {
          console.log("update exitoso")
          this.uploadingForm = false; 
          this.router.navigate(["profile"])
        },
        error: (err) => {
          console.log("update failed: ", err);
          this.uploadingForm = false; 
          alert("Server rejected the upload");
        }
      })
    } catch (err) {
      console.error("Upload error:", err);
      this.uploadingForm = false;
      alert("Something went wrong during upload.");
    }
  }
}
