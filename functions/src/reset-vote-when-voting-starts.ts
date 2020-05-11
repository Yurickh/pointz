import * as functions from 'firebase-functions'
import { User } from './types/user'

export const resetVoteWhenVotingStarts = functions.database
  .ref('/rooms/{roomId}/voting')
  .onUpdate((change, _context) =>
    change.after.val() === true
      ? change.after.ref.parent?.transaction((room) => {
          if (room) {
            const users = Object.values<User>(room.users)

            for (const user of users) {
              delete user.vote
            }

            room.votes.remaining = users.length
            room.votes.total = users.length

            room.results = null
          }
          return room
        })
      : null,
  )
