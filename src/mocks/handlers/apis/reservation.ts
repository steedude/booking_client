import { rest } from 'msw';

const mockReservationApi = {
  fetchReservations: rest.get('*/reservations', (_req, res, ctx) => {
    const currentDay = new Date().toJSON().slice(0, 10);

    return res(
      ctx.status(200),
      ctx.json({
        message: 'success',
        data: {
          reservations: [
            {
              id: '1',
              start_time: `${currentDay} 09:30`,
              end_time: `${currentDay} 12:30`,
              confirmed: true,
              product: {
                _id: 'a1',
                name: 'D',
              },
              team: 'Vue',
            },
            {
              id: '2',
              start_time: `${currentDay} 14:00`,
              end_time: `${currentDay} 18:00`,
              confirmed: true,
              product: {
                _id: 'a3',
                name: 'B',
              },
              team: 'H5',
            },
          ],
        },
      }),
    );
  }),
  postReservation: rest.post('*/reservation', (_req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        message: '您已完成預約',
      }),
    );
  }),
};

export default mockReservationApi;
