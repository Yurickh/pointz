import * as functions from 'firebase-functions'
import { User } from './types/user'

export const showResultsWhenNooneRemains = functions.database
  .ref('/rooms/{roomId}/votes/remaining')
  .onUpdate((change, _context) => {
    if (change.after.val() <= 0) {
      return change.after.ref.parent?.parent?.transaction((room) => {
        if (room) {
          room.results = {}
          for (const user of Object.values<User>(room.users)) {
            room.results[user.name] = user.vote
          }
        }
        return room
      })
    } else {
      return null
    }
  })
