export interface Album {
  name: string;
  description: string;
  price?: number | null;
  likes?: number;         // Read-only
  downloads?: number;     // Read-only
}

export interface AlbumWithId extends Album {
  id: number;
}