import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Album } from '../../../../models/album.model';
import { AlbumService } from '../../../../services/album.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../../reusable/navbar/navbar.component';
import { ConsoleService, NgSelectComponent } from "@ng-select/ng-select";
import { STL } from '../../../../models/STL.models';
import { StlService } from '../../../../services/stl.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-album-detail-owner',
  imports: [CommonModule, NavbarComponent, NgSelectComponent, FormsModule],
  templateUrl: './album-detail-owner.html',
  styleUrl: './album-detail-owner.css'
})
export class AlbumDetailOwner implements OnInit {

  
  album: Album = {} as Album; 
  selectedSTLId!:number;
  confirmDeletionDialog:boolean = false;
  includedSTLs:STL[] = [] as STL[];
  stlsToAdd:STL[] = [] as STL[]; 


  
  ngOnInit(): void {
    this.album = this.albumService.selectedAlbum; 
    console.log(this.album);
    if(this.album.id){
      this.showStlsToAdd(this.album.id);
      this.listSTLsOnAlbum(this.album.id)
    }else{
      this.router.navigate(["profile"])
    }
  }

  constructor(
    private albumService: AlbumService,
    private router: Router,
    private stlService:StlService,
    private cdr: ChangeDetectorRef
  ) {}


  showStlsToAdd(album_id:number){
    this.stlService.listInputByOwner(album_id).subscribe({
      next:(response)=>{
        this.stlsToAdd = response;
      }
    })
  }

  listSTLsOnAlbum(album_id:number){
    this.stlService.listSTLByAlbum(album_id).subscribe({
      next:(response)=>{
        this.includedSTLs = response;
        console.log("response", response);
        this.cdr.detectChanges();
      }, error: (error)=>{
        console.log("error: ", error);
      }
    })
  }

  removeSTLFromAlbum(stlID:number){
    if(this.album.id){
      this.stlService.deleteSTLFromAlbum(this.album.id, stlID).subscribe({
        next:(response) => {
          alert("deleted succesfuly")
          this.listSTLsOnAlbum(this.album.id??0)
        }, error: (error) => {
          console.log("error", error)
        }
      });
    }
  }

  addSTLToAlbum(){
    if(this.album.id){
      this.stlService.addSTLtoAlbum(this.album.id, this.selectedSTLId).subscribe({
        next:(response) => {
          alert("Correctly uploaded")
          this.listSTLsOnAlbum(this.album.id??0);
        }, error: (error)=> {
          console.log(error)
        }
      })
    }
  }

  goToUpdateAlbum(){
    this.router.navigate(["album/update"])
  }


  openDeletionDialog(){
    this.confirmDeletionDialog = !this.confirmDeletionDialog;
  }

  deleteAlbum(){
    this.albumService.deleteAlbum(this.album.id??0).subscribe({
      next:(response)=>{
        alert("Deleted succesfully");
        this.router.navigate(["profile"])
      }, error:(error)=>{
        console.log("error", error)
      }
    });
  }

}
