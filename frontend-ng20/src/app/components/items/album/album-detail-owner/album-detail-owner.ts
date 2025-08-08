import { Component, Input } from '@angular/core';
import { Album } from '../../../../models/album.model';
import { AlbumService } from '../../../../services/album.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../../reusable/navbar/navbar.component';

@Component({
  selector: 'app-album-detail-owner',
  imports: [CommonModule, NavbarComponent],
  templateUrl: './album-detail-owner.html',
  styleUrl: './album-detail-owner.css'
})
export class AlbumDetailOwner {

  
  @Input({required:true})album!: Album; 

  confirmDeletionDialog:boolean = false;

  constructor(
    private albumService: AlbumService,
    private router: Router
  ) {}



  removeSTLFromAlbum(stlID:number|null){}
  addSTLToAlbum(){

  }

  goToUpdateAlbum(){}
  openDeletionDialog(){

  }

  deleteAlbum(){

  }

}
