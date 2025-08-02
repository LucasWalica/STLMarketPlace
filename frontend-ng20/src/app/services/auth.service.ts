import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { SocialUser } from '@abacritt/angularx-social-login';
import { Auth, user, User } from '@angular/fire/auth';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(
    private http:HttpClient, 
    private ngZone:NgZone
  ){
  }

  private apiUrl = "http://localhost:8000/auth/"

  login(username:string, password:string): Observable<any>{
    const data = { username, password };
    return this.http.post<any>(`${this.apiUrl}login/`, data).pipe(
      tap(response => {
        console.log(response)
        localStorage.setItem("stlMarketToken", response.token);
        localStorage.setItem("userId", response.userID)
      })
    );
  }

  register(username:string, email:string, password:string){
    const data = { username, email, password };
    return this.http.post<any>(`${this.apiUrl}register/`, data);
  }


  handleGoogleLogin(user:SocialUser){
    const idToken = user.idToken;
    this.http.post<{token:string}>(`${this.apiUrl}google-login/`, {
      token:idToken,
    }).subscribe({
      next: (response) => {
        console.log("Login exitoso",response.token);
        localStorage.setItem("stlMarketToken", response.token);
        //localStorage.setItem("userId", response.userId)
      },
      error: (err) => {
        console.error("Error: ", err);
      }
    })
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
