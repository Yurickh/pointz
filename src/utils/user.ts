export const setUsername = (username: string) =>
  window.localStorage.setItem('username', username)

export const getUserName = () => window.localStorage.getItem('username')
