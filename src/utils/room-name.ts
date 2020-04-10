export const toRoomId = (rawName: string) =>
  rawName.toLowerCase().split(' ').join('-')

const capitalize = ([firstLetter, ...rest]: string) => {
  if (firstLetter === undefined) return ''

  return `${firstLetter.toUpperCase()}${rest}`
}

export const toRoomName = (roomId: string) =>
  capitalize(roomId.split('-').join(' '))
