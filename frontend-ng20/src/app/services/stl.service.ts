import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { STL, STLOnAlbum, STLWithId } from '../models/STL.models';
import { getDownloadURL , ref, uploadBytes } from 'firebase/storage';
import { Storage } from '@angular/fire/storage';
import { v4 as uuidv4 } from 'uuid';
@Injectable({
  providedIn: 'root'
})
export class StlService { 

  apiUrl = "http://localhost:8000/stls/"


  constructor(
    private http:HttpClient, 
    private storage: Storage  
  ) { }


  createSTL(stlData:FormData):Observable<any>{
    const data = stlData
    return this.http.post<any>(`${this.apiUrl}stl/create/`, data);
  }

  updateSTL(stlData:STL, stlID:number):Observable<any>{
    const data = JSON.stringify({stlData});
    return this.http.put<any>(`${this.apiUrl}stl/update/${stlID}/`, data);
  }

  deleteSTL(STLID:number):Observable<any>{
    return this.http.delete<any>(`${this.apiUrl}stl/delete/${STLID}/`);
  }

  listSTL():Observable<STLWithId>{
    return this.http.get<STLWithId>(`${this.apiUrl}stl/list`);
  }

  listSTLByUser(userID:number):Observable<STLWithId>{
    return this.http.get<STLWithId>(`${this.apiUrl}stl/list/${userID}/`);
  }

  listSTLByOwner():Observable<STLWithId>{
    return this.http.get<STLWithId>(`${this.apiUrl}stl/list/owner`);
  }

  listDownloadedSTls():Observable<STLWithId>{
    return this.http.get<STLWithId>(`${this.apiUrl}stl/downloaded/`)
  }

  addSTLtoAlbum(stlAlbumEntry:STLOnAlbum):Observable<any>{
    const data = JSON.stringify({stlAlbumEntry})
    return this.http.post<any>(`${this.apiUrl}stlAlbumEntry/create/`, data);
  }

  deleteSTLFromAlbum(stlAlbumEntryID:number):Observable<any>{
    return this.http.delete<any>(`${this.apiUrl}stlAlbumEntry/delete/${stlAlbumEntryID}/`);
  }

   // 📁 Subir archivo STL (privado)
  async uploadSTL(file: File, userId: string): Promise<string> {
    const uniqueName = `${uuidv4()}_${file.name}`;
    const storageRef = ref(this.storage, `user_uploads/${userId}/${uniqueName}`);
    const snapshot = await uploadBytes(storageRef, file);

    // 👇 Opcional: puedes devolver la ruta y no la URL si usarás signed URLs
    return getDownloadURL(snapshot.ref); // Devuelve la URL de descarga (si permites firmadas)
  }

  // 🖼️ Subir imagen de preview (pública)
  async uploadImagePreview(file: File): Promise<string> {
    const uniqueName = `${uuidv4()}_${file.name}`;
    const storageRef = ref(this.storage, `public_previews/${uniqueName}`);
    const snapshot = await uploadBytes(storageRef, file);

    return getDownloadURL(snapshot.ref); // Esta URL es pública por reglas → puedes mostrarla directamente
  }


}
