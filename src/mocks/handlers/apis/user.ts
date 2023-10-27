import { rest, type MockedRequest } from 'msw';
import type { LoginPayload, GoogleAuthPayload, UserInfoPayload } from '@/types/user';

const MOCK_USER_INFO = {
  ACCOUNT: 'root12@skylinetw.com',
  NAME: 'root12',
  PWD: 'root12',
  TEAM: 'Vue',
  TEAM_ID: 'a123',
  TOKEN: 'snsTg7Gz4R#PDLJr',
};

const MOCK_TEAM_LIST = [
  { _id: 'a123', name: 'Vue' },
  { _id: 'b456', name: 'PHP' },
  { _id: 'c789', name: 'JAVA' },
];

const mockUserApi = {
  loginUser: rest.post('*/login', async (req: MockedRequest<LoginPayload>, res, ctx) => {
    const { account, password } = await req.json();
    const isCorrectMockAccount = account === MOCK_USER_INFO.ACCOUNT || account === MOCK_USER_INFO.NAME;
    const isAuthenticated = isCorrectMockAccount && password === MOCK_USER_INFO.PWD;

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
          token: MOCK_USER_INFO.TOKEN,
          user: {
            account: MOCK_USER_INFO.ACCOUNT,
            name: MOCK_USER_INFO.NAME,
            team: MOCK_USER_INFO.TEAM,
          },
        },
      }),
    );
  }),

  logoutUser: rest.post('*/logout', (_req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        message: 'success',
      }),
    );
  }),

  postGoogleAuth: rest.post('*/googleAuth', async (req: MockedRequest<GoogleAuthPayload>, res, ctx) => {
    // 去google 驗證token...
    // google回傳資料...
    // 利用google回傳的資料比對db...
    // 有此人 給予token...
    // 無此人 建立帳號後 給予token...
    const { credential } = await req.json();
    console.log('postGoogleAuth mock credential', req, credential);
    return res(
      ctx.status(200),
      ctx.json({
        message: 'success',
        data: {
          token: MOCK_USER_INFO.TOKEN,
          user: {
            account: MOCK_USER_INFO.ACCOUNT,
            name: MOCK_USER_INFO.NAME,
            team: MOCK_USER_INFO.TEAM,
          },
        },
      }),
    );
  }),

  registerUser: rest.post('*/register', async (req: MockedRequest<LoginPayload>, res, ctx) => {
    const { account, password } = await req.json();
    return res(
      ctx.status(200),
      ctx.json({
        message: 'success',
        data: {
          token: account + password,
          user: {
            account: `${account}@skylinetw.com`,
            name: account,
            team: 'PHP',
          },
        },
      }),
    );
  }),

  getTeamOptions: rest.get('*/teams', (_, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        message: 'success',
        data: MOCK_TEAM_LIST,
      }),
    );
  }),

  setUserInfo: rest.post('*/userSetting', async (req: MockedRequest<UserInfoPayload>, res, ctx) => {
    const fakeUser = structuredClone(MOCK_USER_INFO);

    if (!(localStorage.getItem('booking_fe_token') === fakeUser.TOKEN)) {
      return res(ctx.status(400), ctx.json({ message: '查無此user' }));
    }

    const { team_id: reqTeamId, name: reqUserName } = await req.json();

    const teamItem = MOCK_TEAM_LIST.find(({ _id: teamId }) => teamId === reqTeamId);

    if (!teamItem) {
      return res(ctx.status(400), ctx.json({ message: '查無此team' }));
    }

    ({ _id: fakeUser.TEAM_ID, name: fakeUser.TEAM } = teamItem);
    console.log('Update team_id of user.');

    fakeUser.NAME = reqUserName;
    console.log('Update name of user.');

    return res(
      ctx.status(200),
      ctx.json({
        message: 'success',
        data: {
          user: {
            account: fakeUser.ACCOUNT,
            name: fakeUser.NAME,
            team: fakeUser.TEAM,
          },
        },
      }),
    );
  }),
};

export default mockUserApi;
