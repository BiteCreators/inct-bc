import { Socket } from 'socket.io-client'

export const socketEmitAsPromise = (socket: Socket) => {
  return <T>(message: string, data: T) => {
    return new Promise((resolve, reject) => {
      //TODO: test this and figure the correct behavior
      socket.emit(message, data, (res: any) => {
        if (res.error) {
          reject(res)
        } else {
          resolve(res)
        }
      })
    })
  }
}
