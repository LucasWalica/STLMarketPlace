import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { SocialAuthService,GoogleLoginProvider,SocialUser} from '@abacritt/angularx-social-login';
import { GoogleSigninButtonModule } from '@abacritt/angularx-social-login';
@Component({
  selector: 'app-register',
  imports: [CommonModule, ReactiveFormsModule, GoogleSigninButtonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{


  constructor(
    private router:Router, 
    private auth:AuthService,
    private socialAuth:SocialAuthService
  ){ }

  ngOnInit(): void {
    if(this.auth.isAuthenticated()){
      this.router.navigate([""])
    }
  }

  registerForm = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    username: new FormControl("", [Validators.required, Validators.minLength(6), Validators.maxLength(25)]),
    password1: new FormControl("", [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
    password2: new FormControl("",[Validators.required, Validators.minLength(6), Validators.maxLength(20)])
  }, {
    validators: passwordConfirmationValidator("password1", "password2")
  });


  sendRegisterData(event:Event){
    event.preventDefault();
    console.log("pre")
    this.auth.register(
      this.registerForm.get("username")?.value??"",
      this.registerForm.get("email")?.value??"",
      this.registerForm.get("password1")?.value??""
    ).subscribe({
      next: (response) => {
        console.log("response", response);
        this.router.navigate(["login"]);
      },
      error: (err) => {
        console.log("Error", err)
      }
    })
    console.log("post")

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

  goToLogin(){
    this.router.navigate(["login"])
  }
}

import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function passwordConfirmationValidator(
  controlName: string,
  matchingControlName: string
): ValidatorFn {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    const passwordControl = formGroup.get(controlName);
    const confirmPasswordControl = formGroup.get(matchingControlName);

    if (!passwordControl || !confirmPasswordControl) {
      return null;
    }

    if (passwordControl.value !== confirmPasswordControl.value) {
      confirmPasswordControl.setErrors({ passwordMismatch: true });
    } else {
      confirmPasswordControl.setErrors(null);
    }

    return null;
  };
}