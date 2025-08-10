import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../reusable/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { Loader } from '../../reusable/loader/loader';
import { Router } from '@angular/router';
import { AlbumService } from '../../../services/album.service';
import { Album } from '../../../models/album.model';

@Component({
  selector: 'app-album-update',
  imports: [
    NavbarComponent,
    CommonModule,
    ReactiveFormsModule,
    Loader
  ],
  templateUrl: './album-update.component.html',
  styleUrl: './album-update.component.css'
})
export class AlbumUpdateComponent implements OnInit {
  updateAlbumForm:FormGroup;
  uploadingForm:boolean = false;
  actualAlbumData:Album = {} as Album;
  constructor(
    private router:Router,
    private fb:FormBuilder,
    private albumService:AlbumService
  ){
    this.updateAlbumForm = this.fb.group({
      name: [this.actualAlbumData.name, [Validators.required, Validators.maxLength(50), Validators.minLength(10)]],
      description: [this.actualAlbumData.description, [Validators.required, Validators.minLength(30), Validators.maxLength(500)]],
      price: [this.actualAlbumData.price, [Validators.required, Validators.min(2)]]
    })
  }

  ngOnInit(): void {
    this.actualAlbumData =  this.albumService.selectedAlbum;
    if(!this.actualAlbumData.id){
      this.router.navigate(["profile"])
    }
  }


  onSubmit(){
    if(!this.updateAlbumForm.valid){
      alert("the form is invalid");
      return; 
    }
    this.uploadingForm = true; 
    if(this.actualAlbumData.id){
      this.albumService.updateAlbum(this.updateAlbumForm.value, this.actualAlbumData.id).subscribe({
        next: (res) => {
          this.uploadingForm = false; 
          this.router.navigate(["profile"]);
        },
        error:(err) => {
          this.uploadingForm = false; 
          alert("server rejected the upload")
        }
      })
    }
  }
}
