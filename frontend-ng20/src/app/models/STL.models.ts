export interface STL {
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

export interface STLWithId extends STL {
  id: number;  // si necesitas el id cuando lo recibes del backend
}

// stl-image.model.ts
export interface STLNormalImage {
  imageUrl: string;
}


export interface STLOnAlbum {
  fkAlbum: number;  // ID del álbum
  fkSTL: number;     // ID del STL
}