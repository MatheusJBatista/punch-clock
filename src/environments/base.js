export default function baseEnv() {
  return {
    route: {
      baseRoute: '/',
    },
    googleAuth: {
      redirectUrl: 'http://localhost:3000/google/callback',
      clientId: '926029366570-bhhpq1obmj9l98f36okbdj8bvtt6j1oq.apps.googleusercontent.com',
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
