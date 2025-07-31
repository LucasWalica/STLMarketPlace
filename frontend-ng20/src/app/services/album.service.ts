import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Album, AlbumWithId } from '../models/album.model';
@Injectable({
  providedIn: 'root'
})

export class AlbumService {
  apiUrl = "http://localhost:8000/album/";

  constructor(private http:HttpClient) { }

  createAlbum(albumData:Album):Observable<any>{
    const data = JSON.stringify({albumData});
    return this.http.post<any>(`${this.apiUrl}create/`, data);
  }

  updateAlbum(albumData:Album ,albumID:number):Observable<any>{
    const data = JSON.stringify({albumData});
    return this.http.put<any>(`${this.apiUrl}update/${albumID}/`, albumData);
  }

  deleteAlbum(albumID:number):Observable<any>{
    return this.http.delete<any>(`${this.apiUrl}delete/${albumID}/`);
  }

  albumList():Observable<AlbumWithId>{
    return this.http.get<AlbumWithId>(`${this.apiUrl}list/`);  
  }

  albumListByUser(userID:number):Observable<AlbumWithId>{
    return this.http.get<AlbumWithId>(`${this.apiUrl}list/${userID}/`);
  }

  albumListByOwner():Observable<AlbumWithId>{
    return this.http.get<AlbumWithId>(`${this.apiUrl}list/owner/`)
  }
}
