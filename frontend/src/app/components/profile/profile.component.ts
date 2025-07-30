import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../reusable/navbar/navbar.component";
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MakerService } from '../../services/maker.service';
import { Maker } from '../../models/maker.models';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  imports: [NavbarComponent, CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent  implements OnInit{


  maker:Maker = {} as Maker; 
  showCreateMakerProfile: boolean = false;

  constructor(
    private auth:AuthService, 
    private router:Router,
    private makerService:MakerService
  ){ }

  ngOnInit(): void {
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

  goToMakerCreate(){
    this.router.navigate(["maker/create"])
  }
  goToMakerUpdate(){
    this.router.navigate(["maker/update"])
  }
}
