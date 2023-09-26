export interface Product {
  _id: string;
  name: string;
  seats: number;
  image: string[];
  description: string;
  projector: boolean;
  television: boolean;
  is_confirmed: boolean;
  window: boolean;
}
