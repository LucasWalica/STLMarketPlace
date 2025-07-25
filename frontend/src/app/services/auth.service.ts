import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  private apiUrl = "http://localhost:8000/auth/"

  login(username:string, password:string): Observable<any>{
    let data = JSON.stringify({username, password})
    return this.http.post<any>(`${this.apiUrl}login/`, data).pipe(
      tap(response => {
        localStorage.setItem("stlMarketToken", response.token);
      })
    );
  }

  register(username:string, email:string, password:string){
    let data = JSON.stringify({username, email, password})
    return this.http.post<any>(`${this.apiUrl}register/`, data);
  }

  logout(): void {
    localStorage.removeItem('stlMarketToken');
  }

  getToken(): string | null {
    return localStorage.getItem('stlMarketToken');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
