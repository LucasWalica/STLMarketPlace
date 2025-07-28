import { Component, OnInit } from '@angular/core';
import { FormControl, FormControlName, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GoogleLoginProvider, GoogleSigninButtonModule, SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';


@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, GoogleSigninButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  constructor(
    private auth:AuthService, 
    private router:Router, 
    private socialAuth:SocialAuthService
  ){ }

  loginForm = new FormGroup({
    username : new FormControl("", [Validators.required, Validators.minLength(5), Validators.maxLength(25)]),
    password: new FormControl("", [Validators.required, Validators.minLength(6), Validators.maxLength(20)])
  })

  ngOnInit(): void {
    if(this.auth.isAuthenticated()){
      this.router.navigate([""])
    }
  }

  sendFormData(event:Event){
    event.preventDefault()
    this.auth.login(
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

   googleAuth(){
      this.socialAuth.signIn(GoogleLoginProvider.PROVIDER_ID).then((user:SocialUser)=>{
        console.log("user");
        console.log("ID token de google",user.idToken)
         console.log('Google user:', user);
        this.auth.handleGoogleLogin(user);
      }).catch(err => {
        console.log("erro al iniciar sesion: ", err);
      })
    }


  goToRegister(){
    this.router.navigate(["register"])
  }
}
