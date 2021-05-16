import axios from 'axios'

import environment from '@environment/'

const punchClockApiInstance = axios.create({
  baseURL: environment.punchClockApi.baseURL,
})

punchClockApiInstance.interceptors.response.use(response => {
  return response.data
}, console.error)

export default punchClockApiInstance
