export default function baseEnv() {
  return {
    route: {
      baseRoute: '/',
    },
    googleAuth: {
      redirectUrl: 'localhost:3000/callback',
      clientId: '',
    },
    punchClockApi: {
      baseURL: 'localhost:3001',
      routes: {
        user: {
          get: '/user',
        },
        punchClock: {
          getByYearAndMonth: '/punch-clock/year/:year/month/:month',
          patch: '/punch-clock/:id/punch-in',
        },
      },
    },
  }
}
