import { produce } from 'immer'
import baseReducer from '@utilities/base-reducer'
import * as Actions from './punch-clock-actions'

const initialState = {
  times: [],
  currentMonthExist: true,
}

const punchClockReducer = baseReducer(initialState, {
  [Actions.GET_BY_ID_FINISHED](state, { payload }) {
    return produce(state, draftState => {
      draftState.times = [
        ...draftState.times.map(time => {
          if (time.id === payload.id) return payload
          return time
        }),
      ]
    })
  },
  [Actions.GET_BY_YEAR_AND_MONTH_TIMES_FINISHED](state, { payload }) {
    return produce(state, draftState => {
      draftState.times = payload
    })
  },
  [Actions.VERIFY_EXISTS_FINISHED](state, { payload }) {
    return produce(state, draftState => {
      draftState.currentMonthExist = payload
    })
  },
  [Actions.SET_TIMER](state, { payload: { id, time } }) {
    return produce(state, draftState => {
      draftState.times = [
        ...draftState.times.map(currentTime => {
          if (currentTime.id === id) currentTime.totalHour = time
          return currentTime
        }),
      ]
    })
  },
})

export default punchClockReducer
