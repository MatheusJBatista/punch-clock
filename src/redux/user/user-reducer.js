import { produce } from 'immer'
import baseReducer from '@utilities/base-reducer'
import * as Actions from './user-actions'

const initialState = {}

const punchClockReducer = baseReducer(initialState, {})

export default punchClockReducer
