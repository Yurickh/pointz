const serverSideWindow = {
  localStorage: {
    getItem: () => null,
    setItem: () => null,
  },
}

const { localStorage } =
  typeof window === 'undefined' ? serverSideWindow : window

export const setUsername = (username: string) =>
  localStorage.setItem('username', username)

export const getUserName = () => localStorage.getItem('username')
