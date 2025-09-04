import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { NavbarComponent } from '../../../reusable/navbar/navbar.component';
import { NgSelectComponent } from '@ng-select/ng-select';
import { AlbumService } from '../../../../services/album.service';
import { Router } from '@angular/router';
import { StlService } from '../../../../services/stl.service';
import { Album } from '../../../../models/album.model';
import { STL } from '../../../../models/STL.models';
import { StlCard } from "../../stl/stl-card/stl-card";
import { StlViewerComponent } from "../../../reusable/three-visualizer/three-visualizer";
import { Loader } from '../../../reusable/loader/loader';

@Component({
  selector: 'app-album-detail',
  imports: [
    CommonModule, 
    NavbarComponent, 
    StlViewerComponent,
    Loader
  ],
  templateUrl: './album-detail.component.html',
  styleUrl: './album-detail.component.css'
})
export class AlbumDetailComponent {


  album: Album = {} as Album; 
  includedSTLs:STL[] = [] as STL[];
  selectedSTL: STL = {} as STL;
  loadingSTL:boolean = true;
  
  ngOnInit(): void {
    this.album = this.albumService.selectedAlbum; 
    console.log(this.album);
    if(!this.album.id){
      //this.router.navigate([""])
    }else{
      console.log(this.includedSTLs[0])
      this.listSTLsOnAlbum(this.album.id);
    }
  }


  constructor(
    private albumService: AlbumService,
    private router: Router,
    private stlService: StlService,
    private cdr: ChangeDetectorRef
  ) { }


  listSTLsOnAlbum(album_id:number){
    this.stlService.listSTLByAlbum(album_id).subscribe({
      next:(response)=>{
        this.includedSTLs = response;
        console.log(response)
        this.selectSTL(this.includedSTLs[0]);
        this.cdr.detectChanges();
      }, error: (error)=>{
        console.log("error: ", error);
      }
    })
  }

  selectSTL(stl:STL){
    this.loadingSTL = true;
    this.stlService.stlGetByID(stl.id!).subscribe({
      next:(response)=>{
        this.selectedSTL = response;
        console.log(response)
        this.loadingSTL = false;
        this.cdr.detectChanges();
      }, error: (error)=>{
        console.log("error: ", error);
      }
    })
  }
}
