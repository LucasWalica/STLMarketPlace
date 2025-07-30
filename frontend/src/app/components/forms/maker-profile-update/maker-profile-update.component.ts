import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../reusable/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MakerService } from '../../../services/maker.service';
import { Maker } from '../../../models/maker.models';
import { Router } from '@angular/router';


@Component({
  selector: 'app-maker-profile-update',
  imports: [NavbarComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './maker-profile-update.component.html',
  styleUrl: './maker-profile-update.component.css'
})
export class MakerProfileUpdateComponent implements OnInit{


  updateMakerProfileForm:FormGroup;
  currentMakerProfile:Maker = {} as Maker;

 
  constructor(private fb:FormBuilder, private makerService:MakerService, private router:Router){
    this.updateMakerProfileForm = this.fb.group({
      display_name: [this.currentMakerProfile.display_name, Validators.required],
      bio : [this.currentMakerProfile.bio, Validators.required],
      avatar : [this.currentMakerProfile.avatar, Validators.required],
      instagram: [this.currentMakerProfile.instagram],
      twitter: [this.currentMakerProfile.twitter],
      tiktok: [this.currentMakerProfile.tiktok]
    })
  }

   ngOnInit(): void {
    this.makerService.ownMakerProfile().subscribe({
      next:(maker)=>{
        console.log(maker.id)
        this.currentMakerProfile = maker;
         this.updateMakerProfileForm.patchValue({
          display_name: maker.display_name,
          bio: maker.bio,
          avatar: maker.avatar,
          instagram: maker.instagram,
          twitter: maker.twitter,
          tiktok: maker.tiktok
        });
      },
      error: (error)=>{
        console.log("error: ", error)
      }
    })
  };


  onSubmit(){
    console.log(this.updateMakerProfileForm.value)
    console.log(this.updateMakerProfileForm.valid)
    if(this.updateMakerProfileForm.valid){
      this.makerService.updateMakerProfile(this.updateMakerProfileForm.value, this.currentMakerProfile.id??0).subscribe({
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
  }

  selectIcon(icon:any){
    this.currentMakerProfile.avatar=icon
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
