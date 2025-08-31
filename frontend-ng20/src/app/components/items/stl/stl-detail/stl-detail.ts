import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';
import { StlService } from '../../../../services/stl.service';
import { STL } from '../../../../models/STL.models';
import { StlViewerComponent } from '../../../reusable/three-visualizer/three-visualizer';
import { NavbarComponent } from '../../../reusable/navbar/navbar.component';

@Component({
  selector: 'app-stl-detail',
  imports: [
    StlViewerComponent,
    NavbarComponent
  ],
  templateUrl: './stl-detail.html',
  styleUrl: './stl-detail.css'
})
export class StlDetail {


  stl:STL = {} as STL;

  constructor(
    private router:Router,
    private stlService:StlService,
    private authService:AuthService,
  ){}

  ngOnInit(){
    this.stl = this.stlService.selectedSTL;
    if(!this.stl || !this.stl.id){
      this.router.navigate(["/"])
    }
  }

  isAuthenticated(): boolean{
    return this.authService.isAuthenticated();
  }


}
