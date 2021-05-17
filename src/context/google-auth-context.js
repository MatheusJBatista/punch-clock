import { createContext } from 'react'
import qs from 'qs'
import RouteEnum from '@constants/RouteEnum'
import environment from '@environment/'
import { getAccessToken, getIdToken, setAccessToken, setIdToken } from '@utilities/storage-utility'

const GoogleAuthContext = createContext()

const clientId = environment.googleAuth.clientId
const redirectUrl = environment.googleAuth.redirectUrl
const authUrl = 'https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount'
const scopes = ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email']
const params = {
  scope: scopes.join(' '),
  ['include_granted_scopes']: true,
  ['response_type']: 'token id_token',
  state: 'state_parameter_passthrough_value',
  ['redirect_uri']: redirectUrl,
  ['client_id']: clientId,
  nonce: 'n-0S6_WzA2Mj',
}

const isAuthenticated = () => {
  const idToken = getIdToken()
  const accessToken = getAccessToken()

  if (!idToken || !accessToken) return false
  return true
}

const authenticate = () => {
  const stringParams = qs.stringify(params)
  window.location.href = `${authUrl}?${stringParams}`
}

const isCallback = () => {
  const hash = location.hash
  const hashParams = qs.parse(location.hash)
  if (!hash) return false
  if (hashParams['access_token'] && hashParams['id_token']) return true
}

const GoogleAuthProvider = props => {
  if (isCallback()) {
    const hashParams = qs.parse(location.hash)
    setIdToken(hashParams['id_token'])
    setAccessToken(hashParams['access_token'])
    window.location.href = RouteEnum.PunchClock
  }

  if (isAuthenticated()) return <GoogleAuthContext.Provider {...props} />
  else authenticate()

  if (location.pathname === RouteEnum.GoogleAuth) {
    window.location.href = RouteEnum.PunchClock
  }

  return null
}

export default GoogleAuthProvider
export { authenticate }
