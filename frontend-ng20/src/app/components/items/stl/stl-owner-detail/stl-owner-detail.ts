import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../../reusable/navbar/navbar.component';
import { STL } from '../../../../models/STL.models';
import { StlService } from '../../../../services/stl.service';
import { Router } from '@angular/router';
import { StlViewerComponent } from "../../../reusable/three-visualizer/three-visualizer";

@Component({
  selector: 'app-stl-owner-detail',
  imports: [NavbarComponent, StlViewerComponent],
  templateUrl: './stl-owner-detail.html',
  styleUrl: './stl-owner-detail.css'
})
export class StlOwnerDetail implements OnInit {

  stl:STL = {} as STL;

  constructor(
    private stlService:StlService,
    private router:Router){

  }

  ngOnInit(): void {
    this.stl = this.stlService.selectedSTL
    if(!this.stl.file_url){
      this.router.navigate(["profile"])
    }
  }


  goToUpdateSTL(){
    this.stlService.selectedSTL = this.stl
    this.router.navigate(["stl/update"])
  }
}
