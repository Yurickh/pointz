import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import { createEmptyRoom } from './create-empty-room'

export const joinRoom = functions.https.onRequest(async (request, response) => {
  const { uid, roomId, name } = request.query

  if (typeof roomId !== 'string') {
    throw new Error('Malformed request: roomId must be a string')
  }

  if (typeof uid !== 'string') {
    throw new Error('Malformed request: uid must be a string')
  }

  await admin
    .database()
    .ref('/rooms')
    .transaction((rooms) => {
      if (rooms) {
        if (!(roomId in rooms)) {
          rooms[roomId] = createEmptyRoom()
        }

        rooms[roomId].users[uid] = { name, state: 'voting' }

        rooms[roomId].votes.total++
        rooms[roomId].votes.remaining++
      }

      return rooms
    })

  response.send()
})
