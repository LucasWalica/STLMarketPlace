import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../reusable/navbar/navbar.component";
import { STL } from '../../models/STL.models';
import { StlService } from '../../services/stl.service';
import { AlbumService } from '../../services/album.service';
import { Router } from '@angular/router';
import { Album } from '../../models/album.model';
import { StlCard } from '../items/stl/stl-card/stl-card';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-home',
  imports: [NavbarComponent, StlCard, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{


  bestAlbum:Album[] = [] as Album[];

  currentPage:number = 1;
  stlNextPageAvaible:boolean = false; 
  stlPrevPageAvaible:boolean = false; 


  bestModelSTLs:STL[] = [] as STL[];

  constructor(
    private stlService:StlService,
    private albumService:AlbumService,
    private router:Router,
  ){ }

  ngOnInit(): void {
    this.getSTLData(this.currentPage);
  }

  nextPage(){
    if(this.stlNextPageAvaible){
      this.currentPage++;
      this.getSTLData(this.currentPage)
    }
  }
  prevPage(){
    if(this.stlPrevPageAvaible){
      this.currentPage--;
      this.getSTLData(this.currentPage);
    }
  }


  getSTLData(currentpage:number){
    this.stlService.listSTL(currentpage).subscribe({
      next: (response) => {
        this.checkNextPrevAvaibility(response);
        this.bestModelSTLs =response.results
      }
    })
  }

  checkNextPrevAvaibility(response:any){
    if(response.previous){
      this.stlPrevPageAvaible = true;
    }else{
      this.stlPrevPageAvaible = false;
    }
    if(response.next){
      this.stlNextPageAvaible = true;
    }else {
      this.stlNextPageAvaible = false;
    }
  }
}
