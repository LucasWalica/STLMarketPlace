import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../../reusable/navbar/navbar.component";
import { ReactiveFormsModule, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MakerService } from '../../../services/maker.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-maker-profile-create',
  imports: [NavbarComponent,ReactiveFormsModule, CommonModule],
  templateUrl: './maker-profile-create.component.html',
  styleUrl: './maker-profile-create.component.css'
})
export class MakerProfileCreateComponent implements OnInit{

  postMakerProfileForm:FormGroup;

  constructor(private fb:FormBuilder, private makerService:MakerService, private router:Router){
    this.postMakerProfileForm = this.fb.group({
      display_name: ["", Validators.required],
      bio : ["", Validators.required],
      avatar : ["Background/Icon1", Validators.required],
      instagram: [""],
      twitter: [""],
      tiktok: [""]
    })
  }


  ngOnInit(): void {
    this.makerService.ownMakerProfile().subscribe({
      next:(maker)=>{
        if(maker){
          this.router.navigate(["profile"])
        }
      }, 
      error: (error)=>{
        console.log("error: ", error)
      }
    })
  }

  onSubmit():void{
    if(this.postMakerProfileForm.valid){
      this.makerService.createMakerProfile(this.postMakerProfileForm.value).subscribe({
        next:(maker)=>{
          console.log(maker)
        },
        error:(error)=>{
          console.log("error: ", error)
        }
      });
    }else {
      console.log("Erorr: ",this.postMakerProfileForm.errors);
    }
  }



  Icons: any = [
  "Background/Icon1.png",
  "Background/Icon2.png",
  "Background/Icon3.png",
  "Background/Icon4.png",
  "Background/Icon5.png",
  "Background/Icon6.png",
  "Background/Icon7.png",
  "Background/Icon8.png",
  "Background/Icon9.png",
  "Background/Icon10.png",
  "Background/Icon11.png",
  "Background/Icon12.png",
  "Background/Icon13.png",
  "Background/Icon14.png",
  "Background/Icon15.png",
  "Background/Icon16.png",
  "Background/Icon17.png",
  "Background/Icon18.png",
  "Background/Icon19.png",
  "Background/Icon20.png",
  "Background/Icon21.png",
  "Background/Icon22.png",
  "Background/Icon23.png",
  "Background/Icon24.png",
  "Background/Icon25.png",
  "Background/Icon26.png",
  "Background/Icon27.png",
  "Background/Icon28.png",
  "Background/Icon29.png",
  "Background/Icon30.png",
  "Background/Icon31.png",
  "Background/Icon32.png",
  "Background/Icon33.png",
  "Background/Icon34.png",
  "Background/Icon35.png",
  "Background/Icon36.png",
  "Background/Icon37.png",
  "Background/Icon38.png",
  "Background/Icon39.png",
  "Background/Icon40.png",
  "Background/Icon41.png",
  "Background/Icon42.png",
  "Background/Icon43.png",
  "Background/Icon44.png",
  "Background/Icon45.png",
  "Background/Icon46.png",
  "Background/Icon47.png",
  "Background/Icon48.png"
  ]


}
