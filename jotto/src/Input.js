import React, { useState } from 'react'
import PropTypes from "prop-types"
import { useSelector } from 'react-redux'


const Input = ({ secretWord }) => {
    const [currentGuess, setCurrentGuess] = useState("")
    const success = useSelector(state => state.success)

    if (success) {
        return <div data-test="component-input" />
    }

    return (
        <div data-test="component-input">
            <form>
                <input data-test="input-box" type="text" placeholder="Enter guess" value={currentGuess} onChange={(event) => setCurrentGuess(event.target.value)} />
                <button data-test="submit-button" onClick={(event) => {
                    event.preventDefault()
                    //TODO: update guessedWords
                    //TODO: check against secretWord and update success if needed
                    setCurrentGuess("")
                }}>Submit</button>
            </form>
        </div>
    )
}

Input.propTypes = {
    secretWord: PropTypes.string.isRequired
}

export default Input