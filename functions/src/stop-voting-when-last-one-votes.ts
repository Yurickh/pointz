import * as functions from 'firebase-functions'
import { Room } from './types/room'

export const stopVotingWhenLastOneVotes = functions.database
  .ref('/rooms/{roomId}/users/{userId}/vote')
  .onCreate((snapshot, _context) => {
    return snapshot.ref.parent?.parent?.parent?.transaction((room: Room) => {
      if (room) {
        if (Object.values(room.users).every((user) => user.vote)) {
          room.voting = false
        }
      }
      return room
    })
  })
