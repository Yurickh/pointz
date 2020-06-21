import React from 'react'

export const useSafeEffect = (callback: () => void) => {
  const isMounted = React.useRef(true)

  React.useEffect(() => () => {
    isMounted.current = false
  })

  React.useEffect(() => {
    if (isMounted.current) {
      return callback()
    }
  }, [callback])
}
