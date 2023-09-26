import { rest } from 'msw';

const mockProductApi = {
  fetchProducts: rest.get('*/products', (_req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        message: 'success',
        data: {
          products: [
            {
              _id: 'a1',
              name: 'D',
              seats: 5,
              image: [],
              description: '這是D會議室',
              projector: true,
              television: true,
              window: true,
              is_confirmed: true,
            },
            {
              _id: 'a2',
              name: 'A',
              seats: 5,
              image: [],
              description: '這是A會議室',
              projector: true,
              television: true,
              window: true,
              is_confirmed: true,
            },
            {
              _id: 'a3',
              name: 'B',
              seats: 5,
              image: [],
              description: '這是B會議室',
              projector: true,
              television: true,
              window: true,
              is_confirmed: true,
            },
            {
              _id: 'a4',
              name: 'C',
              seats: 5,
              image: [],
              description: '這是C會議室',
              projector: true,
              television: true,
              window: true,
              is_confirmed: true,
            },
            {
              _id: 'a5',
              name: 'E',
              seats: 5,
              image: [],
              description: '這是E會議室',
              projector: true,
              television: true,
              window: true,
              is_confirmed: true,
            },
            {
              _id: 'a6',
              name: 'F',
              seats: 5,
              image: [],
              description: '這是F會議室',
              projector: true,
              television: true,
              window: true,
              is_confirmed: true,
            },
          ],
        },
      }),
    );
  }),
};

export default mockProductApi;
