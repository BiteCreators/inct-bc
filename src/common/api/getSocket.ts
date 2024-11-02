import { Socket, io } from 'socket.io-client'

const queryParams = {
  query: {
    accessToken: document.cookie.split('accessToken=')[1],
  },
}

let socket: Socket

export const getSocket = () => {
  if (!socket) {
    socket = io('https://inctagram.work', queryParams)
  }

  return socket
}
