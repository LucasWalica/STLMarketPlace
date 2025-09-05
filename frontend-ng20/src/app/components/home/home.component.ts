import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../reusable/navbar/navbar.component";
import { STL } from '../../models/STL.models';
import { StlService } from '../../services/stl.service';
import { AlbumService } from '../../services/album.service';
import { Router } from '@angular/router';
import { Album } from '../../models/album.model';
import { StlCard } from '../items/stl/stl-card/stl-card';
import { CommonModule } from '@angular/common';
import { AlbumCard } from '../items/album/album-card/album-card';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-home',
  imports: [NavbarComponent, StlCard, CommonModule, AlbumCard, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{


  searchingForAlbum:boolean = false;
  searchingForSTL:boolean = false;


  searchAlbumInput:string = "";
  bestAlbum:Album[] = [] as Album[];
  albumPrevPageAvaible:boolean = false;
  albumNextPageAvaible:boolean = false;
  albumCurrentPage:number = 1;

  searchSTLInput:string =  "";
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
    this.searchForSTL();
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

  albumNextPage(){
    if(this.albumNextPageAvaible){
      this.albumCurrentPage++;
      this.getAlbumData(this.albumCurrentPage)
    }
  }
  albumPrevPage(){
    if(this.albumPrevPageAvaible){
      this.albumCurrentPage--;
      this.getAlbumData(this.albumCurrentPage);
    }
  }


  // usable for list by search and normal list
  getSTLData(currentpage:number){
    if(this.searchSTLInput && this.searchSTLInput.trim() != ""){
      this.stlService.stlListBySearch(this.searchSTLInput, currentpage).subscribe({
        next: (response) => {
          this.checkNextPrevAvaibility(response);
          this.bestModelSTLs =response.results
        }
      })
      return;
    }else {
      this.stlService.listSTL(currentpage).subscribe({
        next: (response) => {
          this.checkNextPrevAvaibility(response);
          this.bestModelSTLs =response.results
        }
      })
    }
  } 


  // usable for list by search and normal album list
  getAlbumData(currentPage:number){
    if(this.searchAlbumInput && this.searchAlbumInput.trim() != ""){
      this.albumService.albumListBySearch(this.searchAlbumInput, currentPage).subscribe({
        next: (response) => {
          this.checkAlbumNextPrevAvaibility(response);
          this.bestAlbum = response.results;
        }
      })
      return;
    }else{
      this.albumService.albumList(currentPage).subscribe({
        next: (response) => {
          this.checkAlbumNextPrevAvaibility(response);
          this.bestAlbum = response.results;
        }
      })
    }
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

  checkAlbumNextPrevAvaibility(response:any){
    if(response.previous){
      this.albumPrevPageAvaible = true;
    }else{
      this.albumPrevPageAvaible = false;
    }
    if(response.next){
      this.albumNextPageAvaible = true;
    }else {
      this.albumNextPageAvaible = false;
    }
  }


  searchForSTL(){
    this.searchingForAlbum = false;
    this.searchingForSTL = true;
    this.getSTLData(this.currentPage);
  }

  searchForAlbum(){
    this.searchingForSTL = false;
    this.searchingForAlbum = true;
    this.getAlbumData(this.albumCurrentPage);
  }
}
