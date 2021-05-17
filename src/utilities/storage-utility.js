const getAccessToken = () => localStorage.getItem('access_token')
const setAccessToken = accessToken => localStorage.setItem('access_token', accessToken)

const getIdToken = () => localStorage.getItem('id_token')
const setIdToken = idToken => localStorage.setItem('id_token', idToken)

export { getAccessToken, setAccessToken, getIdToken, setIdToken }
