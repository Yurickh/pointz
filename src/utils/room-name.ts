export const toRoomId = (rawName: string) =>
  encodeURIComponent(rawName.toLowerCase()).replace(/%../g, '-')

const capitalize = ([firstLetter, ...rest]: string) => {
  if (firstLetter === undefined) return ''

  return `${firstLetter.toUpperCase()}${rest}`
}

export const toRoomName = (roomId: string) =>
  capitalize(roomId.split('-').join(' '))
