export default function baseEnv() {
  return {
    route: {
      baseRoute: '/',
    },
    punchClockApi: {
      baseURL: 'http://localhost:3001',
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
