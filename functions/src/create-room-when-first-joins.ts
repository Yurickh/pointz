import * as functions from 'firebase-functions'

export const createRoomWhenFirstJoins = functions.database
  .ref('/rooms/{roomId}/users')
  .onCreate((snapshot, _context) =>
    snapshot.ref.parent?.transaction((room) => {
      if (room) {
        room.voting = false
        room.results = false
      }
      return room
    }),
  )
