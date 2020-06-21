import * as functions from 'firebase-functions'

export const cleanRoomWhenLastOneLeaves = functions.database
  .ref('/rooms/{roomId}/users')
  .onDelete((snapshot, _context) => snapshot.ref.parent?.set(null))
