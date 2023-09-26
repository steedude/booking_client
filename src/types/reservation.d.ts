import type { Product } from '@/types/product';

export interface Reservation {
  _id: string;
  start_time: string;
  end_time: string;
  confirmed: boolean;
  product: Product;
  team: string;
}

export interface FetchReservationsPayload {
  start_time: string;
}

export interface PostReservationPayload extends FetchReservationsPayload {
  end_time: string;
  product_id: string;
}
