import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Maker } from '../models/maker.models';
@Injectable({
  providedIn: 'root'
})
export class MakerService {


  apiUrl = "http://localhost:8000/auth/maker/";

  constructor(private http:HttpClient) { }

  createMakerProfile(maker:Maker){
    return this.http.post<Maker>(`${this.apiUrl}create/`, maker)
  }
  updateMakerProfile(maker:Maker, makerID:number){
    return this.http.put<Maker>(`${this.apiUrl}update/${makerID}/`, maker);
  }

  makerProfileDetail(id:number){
    return this.http.get<Maker>(`${this.apiUrl}${id}/`);
  }

  ownMakerProfile(){
    return this.http.get<Maker>(`${this.apiUrl}own/`)
  }
}
