import request from '@/utils/request';
import type { FetchReservationsPayload, PostReservationPayload } from '@/types/reservation';

export function fetchReservationsApi(data: FetchReservationsPayload) {
  return request.get('/reservations', { params: data });
}

export function postReservationApi(data: PostReservationPayload) {
  return request.post('/reservation', data);
}
