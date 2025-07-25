import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StlService { 

  apiUrl = "http://localhost:8000/stls/"
  constructor(private http:HttpClient) { }


  createSTL(stlData:any):Observable<any>{
    const data = JSON.stringify({stlData})
    return this.http.post<any>(`${this.apiUrl}stl/create/`, data);
  }

  updateSTL(stlData:any, stlID:number):Observable<any>{
    const data = JSON.stringify({stlData});
    return this.http.put<any>(`${this.apiUrl}stl/update/${stlID}/`, data);
  }

  deleteSTL(STLID:number):Observable<any>{
    return this.http.delete<any>(`${this.apiUrl}stl/delete/${STLID}/`);
  }

  listSTL():Observable<any>{
    return this.http.get<any>(`${this.apiUrl}stl/list`);
  }

  listSTLByUser(userID:number):Observable<any>{
    return this.http.get<any>(`${this.apiUrl}stl/list/${userID}/`);
  }

  listSTLByOwner():Observable<any>{
    return this.http.get<any>(`${this.apiUrl}stl/list/owner`);
  }

  listDownloadedSTls():Observable<any>{
    return this.http.get<any>(`${this.apiUrl}stl/downloaded/`)
  }

  addSTLtoAlbum(stlAlbumEntry:any):Observable<any>{
    const data = JSON.stringify({stlAlbumEntry})
    return this.http.post<any>(`${this.apiUrl}stlAlbumEntry/create/`, data);
  }

  deleteSTLFromAlbum(stlAlbumEntryID:number):Observable<any>{
    return this.http.delete<any>(`${this.apiUrl}stlAlbumEntry/delete/${stlAlbumEntryID}/`);
  }


}
