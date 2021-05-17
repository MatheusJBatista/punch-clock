import axios from 'axios'

import environment from '@environment/'
import { getIdToken } from '@utilities/storage-utility'
import { authenticate } from 'context/google-auth-context'

const punchClockApiInstance = axios.create({
  baseURL: environment.punchClockApi.baseURL,
})

punchClockApiInstance.interceptors.request.use(request => {
  request.headers.Authorization = `Bearer ${getIdToken()}`
  return request
})

punchClockApiInstance.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    if (error?.response?.status === 401) return authenticate()
    if (error?.response?.status === 400)
      return {
        hasInterceptorError: true,
        message: error.response.data.message,
      }
    return {
      hasInterceptorError: true,
      message: 'Ocorreu um erro interno, favor tentar novamente mais tarde',
    }
  }
)

export default punchClockApiInstance
