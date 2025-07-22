import TokenService from './token'

export const jsonHeader = () => {
  return {'Authorization':  `Bearer ${TokenService.getLocalAccessToken()}`}
}


export const filewithHeader = () => {
  return {
    'Content-Type': 'multipart/form-data',
    'Authorization':  `Bearer ${TokenService.getLocalAccessToken()}`,
  }
}
