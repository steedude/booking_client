import mockUserApi from '@/mocks/handlers/apis/user';
import mockProductApi from '@/mocks/handlers/apis/product';
import mockReservationApi from '@/mocks/handlers/apis/reservation';

export const handlers = [
  mockUserApi.loginUser,
  mockUserApi.logoutUser,
  mockUserApi.postGoogleAuth,
  mockUserApi.getTeamOptions,
  mockUserApi.setUserInfo,
  mockProductApi.fetchProducts,
  mockReservationApi.fetchReservations,
  mockReservationApi.postReservation,
];
