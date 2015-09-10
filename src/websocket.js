import io from 'socket.io-client'

let socketServer = 
  process.env.NODE_ENV === 'production'
    ? 'http://stark-lake-9446.herokuapp.com'
    : `${location.protocol}//${location.hostname}:8090`

export const socket = io(`${socketServer}`)
