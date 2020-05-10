import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

export const leaveRoom = functions.https.onRequest(
  async (request, response) => {
    const { uid, roomId } = request.query

    if (typeof roomId !== 'string') {
      throw new Error('Malformed request: roomId must be a string')
    }

    if (typeof uid !== 'string') {
      throw new Error('Malformed request: uid must be a string')
    }

    await admin
      .database()
      .ref(`/rooms/${roomId}`)
      .transaction((room) => {
        if (room) {
          room.votes.total--
          if (!room.users[uid].vote) {
            room.votes.remaining--
          }

          delete room.users[uid]
        }
        return room
      })

    response.send()
  },
)
