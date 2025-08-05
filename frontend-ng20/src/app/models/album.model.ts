export interface Album {
  id:number|null;
  name: string;
  description: string;
  price?: number | null;
  likes?: number;         // Read-only
  downloads?: number;     // Read-only
}

