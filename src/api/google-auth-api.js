import axios from 'axios'

const googleAuthApi = axios.create({
  baseURL: 'https://oauth2.googleapis.com',
})

const revoke = accessToken => googleAuthApi.post(`revoke?token=${accessToken}`)

export default googleAuthApi
export { revoke }
