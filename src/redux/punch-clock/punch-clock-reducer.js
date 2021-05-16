import { produce } from 'immer'
import baseReducer from '@utilities/base-reducer'
import * as Actions from './punch-clock-actions'

const initialState = {
  times: [],
}

const punchClockReducer = baseReducer(initialState, {
  [Actions.GET_BY_YEAR_AND_MONTH_TIMES_FINISHED](state, { payload }) {
    return produce(state, draftState => {
      draftState.times = payload
    })
  },
})

export default punchClockReducer
