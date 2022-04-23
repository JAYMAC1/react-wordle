import { useState } from 'react'

const useWordle = (solution) => {
  const [turn, setTurn] = useState(0)
  const [currentGuess, setCurrentGuess] = useState('')
  const [guesses, setGuesses] = useState([...Array(6)]) // each guess is an array
  const [history, setHistory] = useState([]) // each guess is a string
  const [isCorrect, setIsCorrect] = useState(false)

  // format a guess into an array of letter objects
  // e.g. [{key: 'a', color: 'yellow'}]
  const formatGuess = () => {
    let solutionArray = [...solution] // convert string into an array of letters
    let formattedGuess = [...currentGuess].map((l) => {
      return { key: l, color: 'grey' }
    })

    // find any matching letter postion and color green
    formattedGuess.forEach((l, i) => {
      if (solutionArray[i] === l.key) {
        formattedGuess[i].color = 'green'
        solutionArray[i] = null
      }
    })

    // find any yellow colors
    formattedGuess.forEach((l, i) => {
      if (solutionArray.includes(l.key) && l.color !== 'green') {
        formattedGuess[i].color = 'yellow'
        solutionArray[solutionArray.indexOf(l.key)] = null
      }
    })

    return formattedGuess
  }

  // add e new guess to the guesses state
  // update the isCorrect state if the guess is correct
  // add one to the turn state
  const addNewGuess = (formattedGuess) => {
    if (currentGuess === solution) {
      setIsCorrect(true)
    }
    setGuesses((prevGuesses) => {
      let newGuesses = [...prevGuesses]
      newGuesses[turn] = formattedGuess
      return newGuesses
    })
    setHistory((prevHistory) => {
      return [...prevHistory, currentGuess]
    })
    setTurn((prevTurn) => {
      return prevTurn + 1
    })
    setCurrentGuess('')
  }

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
      const formatted = formatGuess()
      addNewGuess(formatted)
    }
    if (key === 'Backspace') {
      setCurrentGuess((prevState) => {
        return prevState.slice(0, -1)
      })
      return
    }

    // Using RegEx to check if key press is only a char
    // between a and z (upper and lowercase)
    if (/^[A-Za-z]$/.test(key)) {
      if (currentGuess.length < 5) {
        setCurrentGuess((prevState) => {
          return prevState + key
        })
      }
    }
  }
  return { turn, currentGuess, guesses, isCorrect, handleKeyUp }
}

export default useWordle
