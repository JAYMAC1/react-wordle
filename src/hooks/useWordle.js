import { useState } from 'react'

const useWordle = (solution) => {
  const [turn, setTurn] = useState(0)
  const [currentGuess, setCurrentGuess] = useState('')
  const [guesses, setGuesses] = useState([]) // each guess is an array
  const [history, setHistory] = useState(['hello']) // each guess is a string
  const [isCorrect, setIsCorrect] = useState(false)

  // format a guess into an array of letter objects
  // e.g. [{key: 'a', color: 'yellow'}]
  const formatGuess = () => {
    console.log(`formatting the guess ${currentGuess}`)
  }

  // add e new guess to the guesses state
  // update the isCorrect state if the guess is correct
  // add one to the turn state
  const addNewGuess = () => {}

  // handle keyup event & track current guess
  // if the user presses enter, add the new guess
  const handleKeyUp = ({ key }) => {
    if (key === 'Enter') {
      // only add guess if turn is less then 5
      if (turn > 5) {
        console.log('use all your guesses')
        return
      }
      // do not allow duplicate words
      if (history.includes(currentGuess)) {
        console.log('you have already tried this word')
        return
      }
      //  check word is 5 chars long
      if (currentGuess.length !== 5) {
        console.log('this word must be 5 chars long')
        return
      }
      formatGuess()
    }
    if (key === 'Backspace') {
      setCurrentGuess((prevState) => {
        return prevState.slice(0, -1)
      })
      return
    }

    if (/^[A-Za-z]$/.test(key)) {
      if (currentGuess.length < 5) {
        setCurrentGuess((prevState) => {
          return prevState + key
        })
        console.log(key)
      }
    }
  }

  return { turn, currentGuess, guesses, isCorrect, handleKeyUp }
}

export default useWordle
