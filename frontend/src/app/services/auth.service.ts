import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  private apiUrl = "https://localhost:8000/auth/"

  login(username:string, password:string): Observable<any>{
    let data = JSON.stringify({username, password})
    return this.http.post<any>(`${this.apiUrl}login/`, data);
  }

  register(username:string, email:string, password:string){
    let data = JSON.stringify({username, email, password})
    return this.http.post<any>(`${this.apiUrl}register/`, data);
  }
}
