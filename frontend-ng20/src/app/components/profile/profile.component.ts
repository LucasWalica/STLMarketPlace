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
import { StlViewerComponent } from "../reusable/three-visualizer/three-visualizer";

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

  constructor(
    private auth:AuthService, 
    private router:Router,
    private makerService:MakerService,
    private stlService:StlService,
    private albumService:AlbumService
  ){ }

  ngOnInit(): void {
    this.getMakerProfileData();
    this.getownSTLData();
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


  getownSTLData(){
    this.stlService.listSTLByOwner().subscribe({
      next: (response:any)=>{
        this.ownerSTLs = response.results;
        console.log(this.ownerSTLs)
      },
      error: (error)=>{
        console.log("error")
      }
    })
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
}
