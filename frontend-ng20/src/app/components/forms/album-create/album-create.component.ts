import { Component } from '@angular/core';
import { NavbarComponent } from "../../reusable/navbar/navbar.component";
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlbumService } from '../../../services/album.service';
import { Loader } from '../../reusable/loader/loader';

@Component({
  selector: 'app-album-create',
  imports: [
    NavbarComponent,
    CommonModule,
    ReactiveFormsModule,
    Loader
  ],
  templateUrl: './album-create.component.html',
  styleUrl: './album-create.component.css'
})
export class AlbumCreateComponent {


  postAlbumForm:FormGroup;
  uploadingForm:boolean = false;

  constructor(
    private router:Router,
    private fb:FormBuilder,
    private albumService:AlbumService
  ){ 
    this.postAlbumForm = this.fb.group({
      name: ["", [Validators.required, Validators.maxLength(50), Validators.minLength(10)]],
      description: ["", [Validators.required, Validators.minLength(30), Validators.maxLength(500)]],
      price: [null, [Validators.required, Validators.min(2)]]
    })
  }


  onSubmit(){
    if(!this.postAlbumForm.valid){
      alert("The form is invalid")
      return;
    }
    this.uploadingForm = true;
    this.albumService.createAlbum(this.postAlbumForm.value).subscribe({
      next:(res) => {
        this.uploadingForm=false;
        this.router.navigate(["profile"]);
      },
      error : (err) => {
        this.uploadingForm = false; 
        alert("Server rejected the upload")
      }
    })
  }
}
