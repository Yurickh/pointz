export const toRoomName = (rawName: string) =>
  rawName.toLowerCase().split(' ').join('-')
