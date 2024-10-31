// определите интерфейсы здесь
export interface Review {
    id: number;
    autosalon: string;
    rating: number;
    author: string;
    title?: string;
    text: string;
    date: Date;
  }
  
  export interface ReviewState {
    reviews: Array<Review>;
    loading: boolean;
    error: string | null;
  }
  