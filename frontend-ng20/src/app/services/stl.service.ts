import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { STL, STLOnAlbum } from '../models/STL.models';
import { getDownloadURL , ref, uploadBytes } from 'firebase/storage';
import { Storage } from '@angular/fire/storage';
import { HttpParams } from '@angular/common/http';
import { v4 as uuidv4 } from 'uuid';
import { deleteObject, getStorage, ref as storageRefFromUrl } from "firebase/storage";

import { PaginatedResponse } from '../models/paginatedResponse.model';
@Injectable({
  providedIn: 'root'
})
export class StlService { 

  apiUrl = "http://localhost:8000/stls/"

  selectedSTL:STL = {} as STL;

  constructor(
    private http:HttpClient, 
    private storage: Storage  
  ) { }


  createSTL(stlData:FormData):Observable<any>{
    const data = stlData
    return this.http.post<any>(`${this.apiUrl}stl/create/`, data);
  }

  updateSTL(stlData:STL, stlID:number):Observable<any>{
    return this.http.put<any>(`${this.apiUrl}stl/update/${stlID}/`, stlData);
  }

  deleteSTL(STLID:number):Observable<any>{
    return this.http.delete<any>(`${this.apiUrl}stl/delete/${STLID}/`);
  }

  listSTL(page:number, pageSize:number=4):Observable<PaginatedResponse<STL>>{
    let params = new HttpParams()
    .set('page', page.toString())
    .set('page_size', pageSize.toString());
    return this.http.get<PaginatedResponse<STL>>(`${this.apiUrl}stl/list`, {params});
  }

  listSTLByUser(userID:number):Observable<STL>{
    return this.http.get<STL>(`${this.apiUrl}stl/list/${userID}/`);
  }

  listSTLByOwner(page:number, pageSize:number=4):Observable<PaginatedResponse<STL>>{
    let params = new HttpParams()
    .set('page', page.toString())
    .set('page_size', pageSize.toString());
    return this.http.get<PaginatedResponse<STL>>(`${this.apiUrl}stl/list/owner`, {params});
  }

  listSTLByAlbumPaginated(page:number, pageSize:number=4, albumID:number):Observable<PaginatedResponse<STL>>{
    let params = new HttpParams()
    .set('page', page.toString())
    .set('page_size', pageSize.toString());
    return this.http.get<PaginatedResponse<STL>>(`${this.apiUrl}stl/list/album/paginated/${albumID}/`)
  }

  listSTLByAlbum(albumID:number):Observable<STL[]>{
    return this.http.get<STL[]>(`${this.apiUrl}stl/list/album/${albumID}/`);
  }

  listInputByOwner(album_id:number):Observable<STL[]>{
    return this.http.get<STL[]>(`${this.apiUrl}stl/list/input/${album_id}/`)
  }

  listDownloadedSTls():Observable<STL>{
    return this.http.get<STL>(`${this.apiUrl}stl/downloaded/`)
  }

  addSTLtoAlbum(selctedAlbumID:number, selectedSTLID:number):Observable<any>{
    const data = {
      fkAlbum: selctedAlbumID,
      fkSTL: selectedSTLID
    };  
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${this.apiUrl}stlAlbumEntry/create/`, data, {headers});
  }

  deleteSTLFromAlbum(album_id:number, stl_id:number):Observable<any>{
    return this.http.delete<any>(`${this.apiUrl}stlAlbumEntry/delete/${album_id}/${stl_id}/`);
  }

   // 📁 Subir archivo STL (privado)
  async uploadSTL(file: File, userId: string): Promise<string> {
    const uniqueName = `${uuidv4()}_${file.name}`;
    const storageRef = ref(this.storage, `stls/${userId}/${uniqueName}`);
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

  // 🗑️ Borrar archivo STL por URL
  async deleteSTLByUrl(fileUrl: string): Promise<void> {
    try {
      const storageRef = storageRefFromUrl(this.storage, fileUrl);
      await deleteObject(storageRef);
      console.log("✔ STL eliminado correctamente");
    } catch (error) {
      console.error("❌ Error al eliminar STL:", error);
      throw error;
    }
  }

  // 🗑️ Borrar imagen preview por URL
  async deleteImageByUrl(imageUrl: string): Promise<void> {
    try {
      const storageRef = storageRefFromUrl(this.storage, imageUrl);
      await deleteObject(storageRef);
      console.log("✔ Imagen preview eliminada correctamente");
    } catch (error) {
      console.error("❌ Error al eliminar imagen preview:", error);
      throw error;
    }
  }

}
