import { Component, OnInit } from '@angular/core';
import { FormControl, FormControlName, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  constructor(private auth:AuthService, private router:Router){

  }

  loginForm = new FormGroup({
    username : new FormControl("", [Validators.required]),
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


  goToRegister(){
    this.router.navigate(["register"])
  }
}
