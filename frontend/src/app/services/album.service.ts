import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})

export class AlbumService {
  apiUrl = "http://localhost:8000/album/";

  constructor(private http:HttpClient) { }

  createAlbum(albumData:any):Observable<any>{
    const data = JSON.stringify({albumData});
    return this.http.post<any>(`${this.apiUrl}create/`, data);
  }

  updateAlbum(albumData:any ,albumID:number):Observable<any>{
    const data = JSON.stringify({albumData});
    return this.http.put<any>(`${this.apiUrl}update/${albumID}/`, albumData);
  }

  deleteAlbum(albumID:number):Observable<any>{
    return this.http.delete<any>(`${this.apiUrl}delete/${albumID}/`);
  }

  albumList():Observable<any>{
    return this.http.get<any>(`${this.apiUrl}list/`);  
  }

  albumListByUser(userID:number):Observable<any>{
    return this.http.get<any>(`${this.apiUrl}list/${userID}/`);
  }

  albumListByOwner():Observable<any>{
    return this.http.get<any>(`${this.apiUrl}list/owner/`)
  }
}
