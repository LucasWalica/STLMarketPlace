import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Album } from '../models/album.model';
import { PaginatedResponse } from '../models/paginatedResponse.model';
@Injectable({
  providedIn: 'root'
})

export class AlbumService {
  apiUrl = "http://localhost:8000/album/";

  selectedAlbum:Album = {} as Album;

  constructor(private http:HttpClient) { }

  createAlbum(albumData:Album):Observable<any>{
    return this.http.post<any>(`${this.apiUrl}create/`, albumData);
  }

  updateAlbum(albumData:Album ,albumID:number):Observable<any>{
    const data = JSON.stringify({albumData});
    return this.http.put<any>(`${this.apiUrl}update/${albumID}/`, albumData);
  }

  deleteAlbum(albumID:number):Observable<any>{
    return this.http.delete<any>(`${this.apiUrl}delete/${albumID}/`);
  }

  albumList(page:number, pageSize:number=4):Observable<PaginatedResponse<Album>>{
    let params = new HttpParams()
    .set("page", page.toString())
    .set("page_size", pageSize.toString())
    return this.http.get<PaginatedResponse<Album>>(`${this.apiUrl}list/`, {params});
  }

  albumListByUser(userID:number):Observable<Album>{
    return this.http.get<Album>(`${this.apiUrl}list/${userID}/`);
  }

  albumListByOwner(page:number, pageSize:number=4):Observable<PaginatedResponse<Album>>{
    let params = new HttpParams()
    .set("page", page.toString())
    .set("page_size", pageSize.toString())
    return this.http.get<PaginatedResponse<Album>>(`${this.apiUrl}list/owner/`, {params})
  }
}
