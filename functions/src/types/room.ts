import { User } from './user'

export type Room = {
  voting: boolean
  users: Record<string, User>
}
