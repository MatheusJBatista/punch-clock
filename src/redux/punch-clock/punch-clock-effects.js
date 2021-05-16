import punchClockApiInstance from '@api/punch-clock-api'

import environment from '@environment/'

const routes = environment.punchClockApi.routes

const updateTime = async (id, payload) => await punchClockApiInstance.patch(routes.punchClock.patch.replace(':id', id), payload)
const getByYearAndMonthTime = async (year, month) =>
  await punchClockApiInstance.get(routes.punchClock.getByYearAndMonth.replace(':year', year).replace(':month', month))

export { updateTime, getByYearAndMonthTime }
