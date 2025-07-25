import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DownloadService {

  apiUrl = "http://localhost:8000/download/";

  constructor(private http:HttpClient) { }

  downloadCreate(downloadData:any):Observable<any>{
    const data = JSON.stringify({downloadData})
    return this.http.post<any>(`${this.apiUrl}create/`, data);
  }
}
