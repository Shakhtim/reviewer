// определите интерфейсы здесь
export interface Autosalon {
    id: number;
    autosalon: string;
    image?: string;
    address?: string;
    phone?: string;
    url?: string;
    mapWidth?: string | number;
    mapLong?: string | number;
    date: Date;
    description?: string;
    fullText: string;
    schedule?: string;
    rating: number;
    metaTitle?: string ;
    metaDescription?: string;
    metaKeywords?: string;
  }
  
  export interface AutosalonState {
    autosalons: Array<Autosalon>;
    loading: boolean;
    error: string | null;
  }
  