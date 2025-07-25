import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{


  constructor(private router:Router, private auth:AuthService){}

  showLoginButton:boolean = true; 

  ngOnInit(): void {
    if(this.auth.isAuthenticated()){
      this.showLoginButton = false;
    }
  }

  goToLogin(){
    this.router.navigate(["login"])
  }
  
  logout(){
    this.auth.logout();
    this.router.navigate(["login"])
  }




}
