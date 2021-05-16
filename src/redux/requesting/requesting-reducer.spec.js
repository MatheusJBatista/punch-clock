import RequestingReducer, { initialState as requestingReducerInitialState } from './requesting-reducer'

describe('RequestingReducer', () => {
  const requestActionType = 'SomeAction.REQUEST_SOMETHING'
  const requestActionTypeFinished = 'SomeAction.REQUEST_SOMETHING_FINISHED'

  it('returns default state with invalid action type', () => {
    const action = { type: '' }

    expect(RequestingReducer(undefined, action)).toEqual(requestingReducerInitialState)
  })

  describe('handle REQUEST_* action types', () => {
    it('should add the request action type as a key on the state and assign the value as true', () => {
      const action = { type: requestActionType }

      const actualResult = RequestingReducer(requestingReducerInitialState, action)
      const expectedResult = {
        ...actualResult,
        [requestActionType]: true,
      }

      expect(actualResult).toEqual(expectedResult)
    })
  })

  describe('handle REQUEST_*_FINISHED action types', () => {
    it('should update the request action type key on the state and assign the value to false', () => {
      const action = { type: requestActionTypeFinished }

      const actualResult = RequestingReducer(requestingReducerInitialState, action)
      const expectedResult = {
        ...actualResult,
        [requestActionType]: false,
      }

      expect(actualResult).toEqual(expectedResult)
    })
  })
})
