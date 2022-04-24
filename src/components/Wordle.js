import React, { useEffect } from 'react'
import useWordle from '../hooks/useWordle'
import Keypad from './Keypad'
import Grid from './Grid'

const Wordle = ({ solution }) => {
  const { handleKeyUp, currentGuess, guesses, isCorrect, turn } =
    useWordle(solution)

  useEffect(() => {
    window.addEventListener('keyup', handleKeyUp)
    return () => window.removeEventListener('keyup', handleKeyUp)
  }, [handleKeyUp])

  // useEffect(() => {
  //   console.log(guesses, turn, isCorrect)
  // }, [guesses, turn, isCorrect])

  return (
    <>
      <div>Solution: {solution}</div>
      <div>Current guess: {currentGuess}</div>
      <Grid currentGuess={currentGuess} turn={turn} guesses={guesses} />
      <Keypad />
    </>
  )
}

export default Wordle
