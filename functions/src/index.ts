import * as admin from 'firebase-admin'
export { cleanRoomWhenLastOneLeaves } from './close-room-when-last-one-leaves'
export { handleVotingStatusChange } from './handle-voting-status-change'

admin.initializeApp()
