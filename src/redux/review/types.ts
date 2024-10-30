// определите интерфейсы здесь
export interface Review {
    id: number;
    autosalon: string;
    rating: number;
    name?: string;
    text: string;
  }
  
  export interface ReviewState {
    reviews: Array<Review>;
    loading: boolean;
    error: string | null;
  }
  