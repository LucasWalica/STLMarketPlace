import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AlbumService } from '../../../../services/album.service';
import { Album } from '../../../../models/album.model';

@Component({
  selector: 'app-album-card',
  imports: [],
  templateUrl: './album-card.html',
  styleUrl: './album-card.css'
})
export class AlbumCard {


  @Input({required:true}) album!:Album;

  constructor(
    private router:Router,
    private albumService:AlbumService
  ) { }

  goToOwnAlbum(){
    this.albumService.selectedAlbum = this.album;
    this.router.navigate(["/album"])
  }
}
