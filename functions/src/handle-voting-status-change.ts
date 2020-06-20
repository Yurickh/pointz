import * as functions from 'firebase-functions'
import { User } from './types/user'

export const handleVotingStatusChange = functions.database
  .ref('/rooms/{roomId}/voting')
  .onUpdate((change, _context) =>
    change.after.ref.parent?.transaction((room) => {
      if (room) {
        if (change.after.val() === true) {
          // if we started a new voting, clean up previous vote results
          room.results = false
        } else {
          room.results = {}

          // if we ended the previous voting, populate results
          for (const user of Object.values<User>(room.users)) {
            if (user.vote) {
              room.results[user.name] = user.vote
              delete user.vote
            }
          }
        }
      }
      return room
    }),
  )
