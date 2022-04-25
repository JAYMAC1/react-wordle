import React, { useEffect } from 'react'
import useWordle from '../hooks/useWordle'
import Keypad from './Keypad'
import Grid from './Grid'

const Wordle = ({ solution }) => {
  const { handleKeyUp, currentGuess, guesses, isCorrect, usedKeys, turn } =
    useWordle(solution)

  useEffect(() => {
    window.addEventListener('keyup', handleKeyUp)

    if (isCorrect) {
      console.log('Congrats you win!')
      window.removeEventListener('keyup', handleKeyUp)
    }

    if (turn > 5) {
      console.log("Unlucky you're out of guesses!")
      window.removeEventListener('keyup', handleKeyUp)
    }

    return () => window.removeEventListener('keyup', handleKeyUp)
  }, [handleKeyUp, isCorrect, turn])

  // useEffect(() => {
  //   console.log(guesses, turn, isCorrect)
  // }, [guesses, turn, isCorrect])

  return (
    <>
      <div>Solution: {solution}</div>
      <div>Current guess: {currentGuess}</div>
      <Grid currentGuess={currentGuess} turn={turn} guesses={guesses} />
      <Keypad usedKeys={usedKeys} />
    </>
  )
}

export default Wordle
