export interface Autosalon {
    id: string; 
    status: Boolean; 
    nameSalon: string; 
    image:  Blob | null; 
    city: string; 
    address: string; 
    phone: string; 
    rating: Number; 
    site?: string; 
    schedule?: string; 
    meta_title?: string; 
    meta_description?: string; 
    meta_keywords?: string;
}

export interface AutosalonState {
    autosalons: Autosalon[]; 
    error: string | null; 
}

export interface FormDataState {
    status: Boolean; 
    nameSalon: string;
    image: Blob | null;
    city: string; 
    address: string;
    phone: string;
    rating: Number;
    site: string;
    schedule: string;
    meta_title: string;
    meta_description: string;
    meta_keywords: string;
}