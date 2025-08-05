import { Component, Input } from '@angular/core';
import { STL } from '../../../../models/STL.models';
import { Router } from '@angular/router';
import { StlService } from '../../../../services/stl.service';
import { StlViewerComponent } from "../../../reusable/three-visualizer/three-visualizer";

@Component({
  selector: 'app-stl-card',
  imports: [],
  templateUrl: './stl-card.html',
  styleUrl: './stl-card.css'
})
export class StlCard {

  @Input({required:true}) stl!:STL;

  constructor(
    private router:Router,
    private stlService:StlService
  ){ }

  goToOwnSTL(stl:STL){
    this.stlService.selectedSTL = stl;
    this.router.navigate(["stl/own/detail"])
  }

}
