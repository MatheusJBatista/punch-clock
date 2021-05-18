import * as ActionUtilities from '@utilities/action-utility'
import * as Effects from './punch-clock-effects'

const GET_BY_YEAR_AND_MONTH_TIMES = 'MatheusBatista.PunchClock-REQUEST_GET_BY_YEAR_AND_MONTH_TIMES'
const GET_BY_YEAR_AND_MONTH_TIMES_FINISHED = 'MatheusBatista.PunchClock-REQUEST_GET_BY_YEAR_AND_MONTH_TIMES_FINISHED'

const GET_BY_ID = 'MatheusBatista.PunchClock-REQUEST_GET_BY_ID'
const GET_BY_ID_FINISHED = 'MatheusBatista.PunchClock-REQUEST_GET_BY_ID_FINISHED'

const PATCH_TIME = 'MatheusBatista.PunchClock-REQUEST_PATCH_TIME'
const PATCH_TIME_FINISHED = 'MatheusBatista.PunchClock-REQUEST_PATCH_TIME_FINISHED'

const VERIFY_EXISTS = 'MatheusBatista.PunchClock-REQUEST_VERIFY_EXISTS'
const VERIFY_EXISTS_FINISHED = 'MatheusBatista.PunchClock-REQUEST_VERIFY_EXISTS_FINISHED'

const START_NEW_MONTH = 'MatheusBatista.PunchClock-REQUEST_START_NEW_MONTH'
const START_NEW_MONTH_FINISHED = 'MatheusBatista.PunchClock-REQUEST_START_NEW_MONTH_FINISHED'

const SET_TIMER = 'MatheusBatista.PunchClock-REQUEST_SET_TIMER'

const getByYearAndMonthTimes = (year, month) => {
  return async dispatch => {
    return await ActionUtilities.createThunkEffect(dispatch, GET_BY_YEAR_AND_MONTH_TIMES, Effects.getByYearAndMonthTime, year, month)
  }
}

const patchTime = (id, data) => {
  return async dispatch => {
    return await ActionUtilities.createThunkEffect(dispatch, PATCH_TIME, Effects.updateTime, id, data)
  }
}

const verifyExists = (year, month) => {
  return async dispatch => {
    return await ActionUtilities.createThunkEffect(dispatch, VERIFY_EXISTS, Effects.verifyExists, year, month)
  }
}

const startNewMonth = (year, month) => {
  return async dispatch => {
    return await ActionUtilities.createThunkEffect(dispatch, START_NEW_MONTH, Effects.startNewMonth, year, month)
  }
}

const setTimer = (id, time) => {
  return ActionUtilities.createAction(SET_TIMER, { id, time })
}

const getById = id => {
  return async dispatch => {
    return await ActionUtilities.createThunkEffect(dispatch, GET_BY_ID, Effects.getById, id)
  }
}

export {
  patchTime,
  getByYearAndMonthTimes,
  verifyExists,
  startNewMonth,
  setTimer,
  getById,
  GET_BY_YEAR_AND_MONTH_TIMES,
  GET_BY_YEAR_AND_MONTH_TIMES_FINISHED,
  PATCH_TIME,
  PATCH_TIME_FINISHED,
  VERIFY_EXISTS,
  VERIFY_EXISTS_FINISHED,
  START_NEW_MONTH,
  START_NEW_MONTH_FINISHED,
  SET_TIMER,
  GET_BY_ID,
  GET_BY_ID_FINISHED,
}
