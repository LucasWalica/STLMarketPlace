import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../reusable/navbar/navbar.component";
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MakerService } from '../../services/maker.service';
import { Maker } from '../../models/maker.models';
import { CommonModule } from '@angular/common';
import { StlService } from '../../services/stl.service';
import { AlbumService } from '../../services/album.service';
import { STL } from '../../models/STL.models';
import { StlCard } from '../items/stl/stl-card-owner/stl-card';
import { Album } from '../../models/album.model';

@Component({
  selector: 'app-profile',
  imports: [NavbarComponent, CommonModule, StlCard],
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
  nextPageAvaible:boolean = false;
  prevPageAvaible:boolean = false;
  
  
  showSTLs:boolean = true; 
  showAlbums:boolean = true;

  constructor(
    private auth:AuthService, 
    private router:Router,
    private makerService:MakerService,
    private stlService:StlService,
    private albumService:AlbumService
  ){ }

  ngOnInit(): void {
    this.getMakerProfileData();
    this.getownSTLData(this.page);
  }

  showAlbumsfunc(){
    this.showSTLs = false;
    this.showAlbums = true;
    this.getOwnAlbumData(this.albumPage)
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


  getownSTLData(page:number){
    this.stlService.listSTLByOwner(page, 4).subscribe({
      next: (response:any)=>{
        this.ownerSTLs = response.results;
        this.checkPagesAvaibility(response);
        console.log(response)
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
        // needs to check page avaibility
        console.log(this.ownerAlbums)
      }, 
      error: (error)=>{
        console.log("error: ", error)
      }
    })
  }

  nextPage(){
    if(this.nextPageAvaible){
      this.page++;
      this.getownSTLData(this.page);
    }
  }

  previousPage(){
    if(this.prevPageAvaible){
      this.page--;
      this.getownSTLData(this.page)
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
}
