import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Download } from '../models/download.model';

@Injectable({
  providedIn: 'root'
})

export class DownloadService {

  apiUrl = "http://localhost:8000/download/";

  constructor(private http:HttpClient) { }

  downloadCreate(downloadData:any):Observable<Download>{
    const data = JSON.stringify({downloadData})
    return this.http.post<Download>(`${this.apiUrl}create/`, data);
  }
}
