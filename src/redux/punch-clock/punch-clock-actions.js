import * as ActionUtilities from '@utilities/action-utility'
import * as Effects from './punch-clock-effects'

const GET_BY_YEAR_AND_MONTH_TIMES = 'MatheusBatista.PunchClock-GET_BY_YEAR_AND_MONTH_TIMES'
const GET_BY_YEAR_AND_MONTH_TIMES_FINISHED = 'MatheusBatista.PunchClock-GET_BY_YEAR_AND_MONTH_TIMES_FINISHED'

const PATCH_TIME = 'MatheusBatista.PunchClock-PATCH_TIME'
const PATCH_TIME_FINISHED = 'MatheusBatista.PunchClock-PATCH_TIME_FINISHED'

const getByYearAndMonthTimes = (year, month) => {
  return async dispatch => {
    await ActionUtilities.createThunkEffect(dispatch, GET_BY_YEAR_AND_MONTH_TIMES, Effects.getByYearAndMonthTime, year, month)
  }
}

const patchTime = (id, data) => {
  return async dispatch => {
    await ActionUtilities.createThunkEffect(dispatch, PATCH_TIME, Effects.updateTime, id, data)
  }
}

export { patchTime, getByYearAndMonthTimes, GET_BY_YEAR_AND_MONTH_TIMES, GET_BY_YEAR_AND_MONTH_TIMES_FINISHED, PATCH_TIME, PATCH_TIME_FINISHED }
