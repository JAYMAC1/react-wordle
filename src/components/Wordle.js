import React, { useEffect } from 'react'
import useWordle from '../hooks/useWordle'

const Wordle = ({ solution }) => {
  const { handleKeyUp, currentGuess } = useWordle(solution)

  useEffect(() => {
    window.addEventListener('keyup', handleKeyUp)
    return () => window.removeEventListener('keyup', handleKeyUp)
  }, [handleKeyUp])
  return <div>Current guess: {currentGuess}</div>
}

export default Wordle
