export default function baseEnv() {
  return {
    route: {
      baseRoute: '/',
    },
    googleAuth: {
      redirectUrl: 'http://localhost:3000/google/callback',
      clientId: '',
    },
    punchClockApi: {
      baseURL: 'http://localhost:3001',
      routes: {
        user: {
          get: '/user',
        },
        punchClock: {
          getById: '/punch-clock/:id',
          getByYearAndMonth: '/punch-clock/year/:year/month/:month',
          patch: '/punch-clock/:id/punch-in',
          verifyExists: '/punch-clock/verify-exists/year/:year/month/:month',
          startNewMonth: '/punch-clock/create-month',
        },
      },
    },
  }
}
