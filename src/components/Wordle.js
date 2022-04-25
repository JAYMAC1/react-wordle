import React, { useEffect, useState } from 'react'
import useWordle from '../hooks/useWordle'
import Keypad from './Keypad'
import Grid from './Grid'
import Modal from './Modal'

const Wordle = ({ solution }) => {
  const { handleKeyUp, currentGuess, guesses, isCorrect, usedKeys, turn } =
    useWordle(solution)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    window.addEventListener('keyup', handleKeyUp)

    if (isCorrect) {
      setTimeout(() => {
        setShowModal(true)
      }, 2000)
      window.removeEventListener('keyup', handleKeyUp)
    }

    if (turn > 5) {
      setTimeout(() => {
        setShowModal(true)
      }, 2000)
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
      {showModal && (
        <Modal isCorrect={isCorrect} turn={turn} solution={solution} />
      )}
    </>
  )
}

export default Wordle
