import { Socket } from 'socket.io-client'

/**
 * @param {Socket} socket - socket io instance
 * @param {string} message - message to emit
 * @param {T} data - data
 * @returns promise that resolves after a message has been emited
 */
export const socketEmitAsPromise = <T>(socket: Socket, message: string, data: T) => {
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
