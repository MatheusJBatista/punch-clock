export const initialState = {}

export default function requestingReducer(state = initialState, action) {
  const isRequestType = action.type.includes('REQUEST_')
  const isRemoveType = action.type.startsWith('REMOVE_REQUEST_')

  if (isRemoveType) {
    const requestName = action.type.replace('REMOVE_REQUEST_', '')
    delete state[requestName]

    return state
  }

  if (isRequestType) {
    const requestName = action.type.replace('_FINISHED', '')
    const isFinishedRequestType = action.type.includes('_FINISHED')

    const requestNameFinished = requestName + '_FINISHED'

    return {
      ...state,
      [requestName]: isFinishedRequestType === false,
      [requestNameFinished]: isFinishedRequestType,
    }
  }

  return state
}
