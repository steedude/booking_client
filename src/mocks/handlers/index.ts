import mockUserApi from '@/mocks/handlers/apis/user';
import mockReservationApi from '@/mocks/handlers/apis/reservation';

export const handlers = [
  mockUserApi.loginUser,
  mockUserApi.logoutUser,
  mockUserApi.postGoogleAuth,
  mockReservationApi.fetchReservations,
  mockReservationApi.postReservation,
];
