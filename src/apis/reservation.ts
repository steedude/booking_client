import request from '@/utils/request';
import type { FetchReservationsPayload, PostReservationPayload } from '@/types/reservation';

export function fetchReservationsApi(data: FetchReservationsPayload) {
  return request.get('/reservations/day', { params: data });
}

export function postReservationApi(data: PostReservationPayload) {
  return request.post('/reservation', data);
}

export function fetchFutureReservationsApi() {
  return request.get('/reservations/future');
}

export function fetchHistoryReservationsApi() {
  return request.get('/reservations/history');
}

export function deleteReservationsApi(reservationId: string) {
  return request.delete(`/reservation/${reservationId}`);
}
