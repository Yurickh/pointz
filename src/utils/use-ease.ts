import React from 'react'

function easeIn(
  time: number,
  startValue: number,
  change: number,
  duration: number,
) {
  const half = time / (duration / 2)
  if (half < 1) {
    return (change / 2) * half * half + startValue
  }

  const less = half - 1
  return (-change / 2) * (less * (less - 2) - 1) + startValue
}

export const useEase = (value: number, duration = 150) => {
  const previousValue = React.useRef(value)
  const [slowNumber, setSlowNumber] = React.useState(value)

  React.useEffect(() => {
    let time = 0
    let stop = false

    const tick = () => {
      const newValue = easeIn(
        time,
        previousValue.current,
        value - previousValue.current,
        duration,
      )

      setSlowNumber(newValue)
      previousValue.current = newValue
      time += 1

      if (!stop && time < duration) {
        requestAnimationFrame(tick)
      }
    }

    tick()

    return () => {
      stop = true
    }
  }, [duration, value])

  return slowNumber
}
