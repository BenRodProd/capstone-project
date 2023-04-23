import styled from "styled-components";
import { useState, useEffect, useRef } from "react";
const InputFieldLayout = styled.div`
  display: flexbox;
  justify-content: center;
`;
const StyledInput = styled.input`
  width: 1rem;
`;
export default function Answer({ answer, handleNextQuestion }) {
  const inputRef = useRef([]);
  const answerArray = answer.split("");
  const [guessedLetters, setGuessedLetters] = useState(
    new Array(answerArray.length).fill("")
  );
  useEffect(() => {
    if (answerArray.join("") === guessedLetters.join("")) {
      handleNextQuestion();
    }
  }, [guessedLetters, answerArray, handleNextQuestion]);
  function handleLetterGuess(event, index) {
    const letter = event.target.value;
    const newGuessedLetters = [...guessedLetters];
    console.log(letter, index);
    newGuessedLetters[index] = letter;
    setGuessedLetters(newGuessedLetters);
    console.log(newGuessedLetters);
    if (letter === answerArray[index]) {
      console.log("right letter!");
      if (index < answerArray.length - 1) {
        inputRef.current[index + 1].focus();
      }
    } else {
    }
  }

  console.log(answerArray);
  return (
    <>
      <h1>ANSWER:</h1>
      <InputFieldLayout>
        {answerArray.map((letter, index) => (
          <StyledInput
            onChange={(event) => handleLetterGuess(event, index)}
            ref={(ref) => (inputRef.current[index] = ref)}
            key={index}
            maxLength="1"
            type="text"
            readonly={guessedLetters[index] !== ""}
          ></StyledInput>
        ))}
      </InputFieldLayout>
    </>
  );
}
