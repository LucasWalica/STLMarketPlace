import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { STL, STLOnAlbum, STLWithId } from '../models/STL.models';

@Injectable({
  providedIn: 'root'
})
export class StlService { 

  apiUrl = "http://localhost:8000/stls/"
  constructor(private http:HttpClient) { }


  createSTL(stlData:FormData):Observable<any>{
    const data = stlData
    return this.http.post<any>(`${this.apiUrl}stl/create/`, data);
  }

  updateSTL(stlData:STL, stlID:number):Observable<any>{
    const data = JSON.stringify({stlData});
    return this.http.put<any>(`${this.apiUrl}stl/update/${stlID}/`, data);
  }

  deleteSTL(STLID:number):Observable<any>{
    return this.http.delete<any>(`${this.apiUrl}stl/delete/${STLID}/`);
  }

  listSTL():Observable<STLWithId>{
    return this.http.get<STLWithId>(`${this.apiUrl}stl/list`);
  }

  listSTLByUser(userID:number):Observable<STLWithId>{
    return this.http.get<STLWithId>(`${this.apiUrl}stl/list/${userID}/`);
  }

  listSTLByOwner():Observable<STLWithId>{
    return this.http.get<STLWithId>(`${this.apiUrl}stl/list/owner`);
  }

  listDownloadedSTls():Observable<STLWithId>{
    return this.http.get<STLWithId>(`${this.apiUrl}stl/downloaded/`)
  }

  addSTLtoAlbum(stlAlbumEntry:STLOnAlbum):Observable<any>{
    const data = JSON.stringify({stlAlbumEntry})
    return this.http.post<any>(`${this.apiUrl}stlAlbumEntry/create/`, data);
  }

  deleteSTLFromAlbum(stlAlbumEntryID:number):Observable<any>{
    return this.http.delete<any>(`${this.apiUrl}stlAlbumEntry/delete/${stlAlbumEntryID}/`);
  }

  // test
  uploadFileToCloudinary(file:File){
    const url = "https://api.cloudinary.com/v1_1/STLMarketPlace/upload";
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'STLmarketPlace');

    return this.http.post(url, formData);
  }


}
