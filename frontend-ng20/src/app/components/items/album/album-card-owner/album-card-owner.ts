import { Component, Input } from '@angular/core';
import { Album } from '../../../../models/album.model';
import { Router } from '@angular/router';
import { AlbumService } from '../../../../services/album.service';

@Component({
  selector: 'app-album-card-owner',
  imports: [],
  templateUrl: './album-card-owner.html',
  styleUrl: './album-card-owner.css'
})
export class AlbumCardOwner {

  @Input({required:true}) album!:Album;

  constructor(
    private router:Router,
    private albumService:AlbumService
  ) { }


  goToOwnAlbum(){
    this.albumService.selectedAlbum = this.album;
    this.router.navigate(["album/own/detail"])
  }
}
