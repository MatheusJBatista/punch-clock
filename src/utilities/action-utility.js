import HttpErrorResponseModel from '../models/http-error-response-model'
import { toast } from 'react-toastify'

export async function createThunkEffect(dispatch, actionType, effect, ...args) {
  dispatch(createAction(actionType))

  const model = await effect(...args)
  if (model?.hasInterceptorError) {
    toast(model.message)
  }

  dispatch(createAction(`${actionType}_FINISHED`, model, model?.hasInterceptorError))

  return model
}

export async function createThunkEffectWithMeta(dispatch, actionType, effect, meta, ...args) {
  dispatch(createAction(actionType))

  const model = await effect(...args)
  const isError = model instanceof HttpErrorResponseModel

  dispatch(createAction(`${actionType}_FINISHED`, model, isError, meta))

  return model
}

export function createAction(type, payload = undefined, error = false, meta = null) {
  return { type, payload, error, meta }
}
