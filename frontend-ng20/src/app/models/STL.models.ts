export interface STL {
  id:number|null;
  name: string;
  description: string;
  file_url: string;
  category1?: string | null;
  category2?: string | null;
  price?: number | null;
  likes?: number;         // Read-only
  downloads?: number;     // Read-only
  images?: string[];      // URLs de imágenes (solo en POST)
}


// stl-image.model.ts
export interface STLNormalImage {
  imageUrl: string;
}


export interface STLOnAlbum {
  fkAlbum: number;  // ID del álbum
  fkSTL: number;     // ID del STL
}