import { createAction } from '@utilities/action-utility'

export function remove(action) {
  return async dispatch => {
    dispatch(createAction(`REMOVE_REQUEST_${action}`))
  }
}
