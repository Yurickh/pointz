import * as functions from 'firebase-functions'
import { User } from './types/user'

export const updateVoteWhenTicketChanges = functions.database
  .ref('/rooms/{roomId}/activeTicket')
  .onUpdate((change, _context) =>
    change.after.ref.parent?.transaction((room) => {
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
    }),
  )
