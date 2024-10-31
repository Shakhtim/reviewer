// определите интерфейсы здесь
export interface Review {
    id: number;
    nameSalon: string;
    rating: number;
    author: string;
    title?: string;
    text: string;
    datePublished: Date;
  }
  
  export interface ReviewState {
    reviews: Array<Review>;
    loading: boolean;
    error: string | null;
  }
  