import { produce } from 'immer'
import baseReducer from '@utilities/base-reducer'
import * as Actions from './punch-clock-actions'

const initialState = {
  times: [],
  currentMonthExist: true,
}

const punchClockReducer = baseReducer(initialState, {
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
})

export default punchClockReducer
