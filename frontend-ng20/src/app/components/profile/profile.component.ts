import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../reusable/navbar/navbar.component";
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MakerService } from '../../services/maker.service';
import { Maker } from '../../models/maker.models';
import { CommonModule } from '@angular/common';
import { StlService } from '../../services/stl.service';
import { AlbumService } from '../../services/album.service';
import { STL, STLOnAlbum } from '../../models/STL.models';
import { StlCardOwner } from '../items/stl/stl-card-owner/stl-card';
import { Album } from '../../models/album.model';
import { AlbumCardOwner } from '../items/album/album-card-owner/album-card-owner';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-profile',
  imports: [
    NavbarComponent,
    CommonModule,
    StlCardOwner,
    AlbumCardOwner,
    FormsModule
],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent  implements OnInit{


  maker:Maker = {} as Maker; 
  showCreateMakerProfile: boolean = false;
  ownerSTLs:STL[] = [] as STL[];
  ownerAlbums:Album[] = [] as Album[];
  page:number = 1;
  albumPage:number=1;
  // page avaibility for stls
  nextPageAvaible:boolean = false;
  prevPageAvaible:boolean = false;
  // page avaibility for albums
  albumNextPageAvaible:boolean = false;
  albumPrevPageAvaible:boolean = false;
  
  showSTLs:boolean = true; 
  showAlbums:boolean = false;

  constructor(
    private auth:AuthService, 
    private router:Router,
    private makerService:MakerService,
    private stlService:StlService,
    private albumService:AlbumService
  ){ }

  ngOnInit(): void {
    this.getMakerProfileData();
    if(!this.auth.isAuthenticated()){
      this.router.navigate([""]);
      return;
    }
    this.getownSTLData(this.page);
    this.getOwnAlbumData(this.albumPage)
  }

  showAlbumsfunc(){
    this.showSTLs = false;
    this.showAlbums = true;
  }

  showSTLsfunc(){
    this.showAlbums = false;
    this.showSTLs = true;
  }



  goToMakerCreate(){
    this.router.navigate(["maker/create"])
  }
  goToMakerUpdate(){
    this.router.navigate(["maker/update"])
  }
  goToPostSTL(){
    this.router.navigate(["stl/create"])
  }
  goToPostAlbum(){
    this.router.navigate(["album/create"])
  }


  getownSTLData(page:number){
    this.stlService.listSTLByOwner(page, 4).subscribe({
      next: (response:any)=>{
        this.ownerSTLs = response.results;
        this.checkPagesAvaibility(response);
      },
      error: (error)=>{
        console.log("error")
      }
    })
  }

  getOwnAlbumData(page:number){
    this.albumService.albumListByOwner(page).subscribe({
      next:(response:any)=>{
        this.ownerAlbums = response.results; 
        this.checkAlbumPagesAvaibility(response)
      }, 
      error: (error)=>{
        console.log("error: ", error)
      }
    })
  }


  // function for stl pages
  nextPage(){
    if(this.nextPageAvaible){
      this.page++;
      this.getownSTLData(this.page);
    }
  }
  // function for stl pages
  previousPage(){
    if(this.prevPageAvaible){
      this.page--;
      this.getownSTLData(this.page)
    }
  }

  albumNextPage(){
    if(this.albumNextPageAvaible){
      this.albumPage++;
      this.getownSTLData(this.albumPage)
    }
  }

  albumPrevPage(){
    if(this.albumPrevPageAvaible){
      this.albumPage--;
      this.getOwnAlbumData(this.albumPage)
    }
  }



  getMakerProfileData(){
    this.makerService.ownMakerProfile().subscribe({
      next :(maker)=>{
        this.maker = maker;
      },
     error: (err) => {
      if (err.status === 404) {
        console.log('El usuario no tiene perfil Maker aún.');
        this.showCreateMakerProfile = true;
      } else {
        console.error('Error inesperado:', err);
      }
    }
    });
  }

  checkPagesAvaibility(response:any){
    if(response.next){
        this.nextPageAvaible = true;
      }else{
        this.nextPageAvaible = false;
      }
      if(response.previous){
        this.prevPageAvaible=true;
      }else{
        this.prevPageAvaible=false
    }
  }

  checkAlbumPagesAvaibility(response:any){
    if(response.next){
        this.albumNextPageAvaible = true;
      }else{
        this.albumNextPageAvaible = false;
      }
      if(response.previous){
        this.albumPrevPageAvaible=true;
      }else{
        this.albumPrevPageAvaible=false
    }
  }
}
