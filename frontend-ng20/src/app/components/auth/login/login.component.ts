import { Component, OnInit } from '@angular/core';
import { FormControl, FormControlName, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GoogleAuthProvider, signInWithPopup, Auth } from '@angular/fire/auth';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  standalone: true,
})
export class LoginComponent implements OnInit {


  private auth:Auth = Inject(Auth)
  constructor(
    private authService:AuthService, 
    private router:Router
  ){ }

  loginForm = new FormGroup({
    username : new FormControl("", [Validators.required, Validators.minLength(5), Validators.maxLength(25)]),
    password: new FormControl("", [Validators.required, Validators.minLength(6), Validators.maxLength(20)])
  })

  ngOnInit(): void {
    if(this.authService.isAuthenticated()){
      this.router.navigate([""])
    }
  }

  sendFormData(event:Event){
    event.preventDefault()
    this.authService.login(
      this.loginForm.get("username")?.value??"",
      this.loginForm.get("password")?.value??""
    ).subscribe({
      next: (response) => {
        console.log(response)
        this.router.navigate([""])
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

   loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(this.auth, provider)
      .then((result) => {
        console.log('✅ Google login success:', result.user);
        // Aquí puedes llamar a tu backend con el token si lo necesitas:
        result.user.getIdToken().then(token => {
          console.log('🔑 Firebase ID token:', token);
          // Aquí podrías hacer POST al backend Django con este token.
        });
      })
      .catch((error) => {
        console.error('❌ Error en login con Google:', error);
      });
  }

  goToRegister(){
    this.router.navigate(["register"])
  }
}
