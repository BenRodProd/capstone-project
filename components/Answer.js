import styled from "styled-components";
import { useState, useEffect, useRef } from "react";

const InputFieldLayout = styled.div`
  display: flexbox;
  justify-content: center;
`;
const StyledInput = styled.input`
  caret-color: transparent;
  text-align: center;
  font-size: 1rem;
  width: 2rem;
  height: 2rem;
  color: white;
  background-color: ${(props) =>
    props.isRight ? "green" : props.isWrong ? "red" : "transparent"};

  animation: ${(props) => (props.isWrong ? "shake 0.5s" : "none")};
  transform-origin: center;

  @keyframes shake {
    0% {
      transform: translateX(0);
    }
    25% {
      transform: translateX(-10px);
    }
    50% {
      transform: translateX(10px);
    }
    75% {
      transform: translateX(-10px);
    }
    100% {
      transform: translateX(0);
    }
  }
`;

export default function Answer({ answer, handleNextQuestion }) {
  const [wrongIndex, setWrongIndex] = useState(-1);

  const inputRef = useRef([]);
  const [answerArray, setAnswerArray] = useState(answer.split(""));
  const [guessedWordArray, setguessedWordArray] = useState(
    answerArray.map(() => "")
  );
  // ############## Split Answer in Array when new Answer received ##################
  useEffect(() => {
    setAnswerArray(answer.split(""));
  }, [answer]);
  // ############# Focus first LetterInput when loaded #############
  useEffect(() => {
    inputRef.current[0].focus();
  }, []);
  // ############## Right word ###########################
  useEffect(() => {
    if (answerArray.join("") === guessedWordArray.join("")) {
      setTimeout(() => {
        handleNextQuestion();
        setguessedWordArray(answerArray.map(() => ""));
        inputRef.current[0].focus();
      }, 800);
    }
  }, [guessedWordArray, answerArray, handleNextQuestion]);

  function handleLetterGuess(event, index) {
    const letter = event.target.value;
    const newguessedWordArray = [...guessedWordArray];

    newguessedWordArray[index] = letter;

    setguessedWordArray(newguessedWordArray);
    // ############ right letter ################
    if (letter === answerArray[index]) {
      if (index < answerArray.length - 1) {
        inputRef.current[index + 1].focus();
      }
    } else {
      // ############# wrong letter ###############
      setWrongIndex(index);
      setTimeout(() => {
        setWrongIndex(-1);
      }, 800);

      newguessedWordArray[index] = "";
      setguessedWordArray(newguessedWordArray);
    }
  }

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
            isRight={guessedWordArray[index] === answerArray[index]}
            value={guessedWordArray[index] || ""}
            isWrong={index === wrongIndex}
          ></StyledInput>
        ))}
      </InputFieldLayout>
    </>
  );
}
