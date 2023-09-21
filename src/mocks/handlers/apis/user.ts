import { rest, type MockedRequest } from 'msw';
import type { LoginPayload } from '@/types/user';

const mockUserApi = {
  loginUser: rest.post(/(http|https):\/\/.*\/login/, (req: MockedRequest<LoginPayload>, res, ctx) => {
    const { username, password } = req.body;
    const isAuthenticated = username === 'root12' && password === 'root12';

    if (!isAuthenticated) {
      return res(
        ctx.status(403),
        ctx.json({
          errorMessage: 'Not authorized',
        }),
      );
    }

    return res(
      ctx.status(200),
      ctx.json({
        message: 'success',
        data: {
          token: 'snsTg7Gz4R#PDLJr',
          user: {
            name: 'gucci-mock',
            team: 'vue',
          },
        },
      }),
    );
  }),

  logoutUser: rest.post(/(http|https):\/\/.*\/logout/, (_req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        message: 'success',
      }),
    );
  }),
};

export default mockUserApi;
