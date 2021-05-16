export default function baseEnv() {
  return {
    route: {
      baseRoute: '/',
    },
    punchClockApi: {
      baseURL: process.env.REACT_APP_PUNCH_CLOCK_API_BASE_URL,
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
