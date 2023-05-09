import styled from "styled-components";
import { useState, useEffect, useRef } from "react";
import ChooseLetter from "./ChooseLetter";

const InputFieldLayout = styled.div`
  display: flex;
  flex-wrap: wrap;
  position: relative;
  align-items: center;
  justify-content: center;
  align-self: flex-end;
  width: 100%;
`;

const StyledInput = styled.input`
  caret-color: transparent;
  text-align: center;
  font-size: 1rem;
  width: 2rem;
  height: 2rem;
  color: white;
  border-color: ${(props) => (props.isActive ? "orange" : "white")};
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

export default function Answer({
  answer,
  handleNextQuestion,
  handleWrongAnswer,
  handleRightAnswer,
}) {
  const [wrongIndex, setWrongIndex] = useState(-1);

  const inputRef = useRef([]);
  const [chosenLetter, setChosenLetter] = useState("");
  const answerArray = answer.split("");

  const [guessedWordArray, setGuessedWordArray] = useState(
    answerArray.map(() => "")
  );
  const [activeIndex, setActiveIndex] = useState(0);
  const vibrate = () => {
    window.navigator.vibrate([500]);
  };
  // ############## Split Answer in Array when new Answer received ##################

  // ############# Focus first LetterInput when loaded #############
  useEffect(() => {
    inputRef.current[0].focus();
  }, []);
  // ############## Right word ###########################
  useEffect(() => {
    if (answerArray.join("") === guessedWordArray.join("")) {
      setTimeout(() => {
        handleNextQuestion();
        setGuessedWordArray(answerArray.map(() => ""));
        inputRef.current[0].focus();
        setChosenLetter("");
        setActiveIndex(0);
      }, 800);
    }
  }, [guessedWordArray, answerArray, handleNextQuestion]);

  useEffect(() => {
    inputRef.current[activeIndex].value = chosenLetter;

    inputRef.current[activeIndex].dispatchEvent(
      new Event("input", { bubbles: true })
    );

    setChosenLetter("");
  }, [chosenLetter, activeIndex]);

  function handleLetterGuess(event, index) {
    if (event.target.value === "") {
      return;
    }
    const letter = event.target.value;
    const newGuessedWordArray = [...guessedWordArray];

    newGuessedWordArray[index] = letter;

    setGuessedWordArray(newGuessedWordArray);

    // ############ right letter ################
    if (letter === answerArray[index].toLowerCase()) {
      handleRightAnswer(5);
      if (index < answerArray.length - 1) {
        inputRef.current[index + 1].focus();
        setActiveIndex((prev) => prev + 1);
        setChosenLetter("");
      }
    } else {
      // ############# wrong letter ###############
      handleWrongAnswer(5);
      setWrongIndex(index);
      vibrate();
      setTimeout(() => {
        setWrongIndex(-1);
      }, 800);

      newGuessedWordArray[index] = "";
      setGuessedWordArray(newGuessedWordArray);
    }
  }

  return (
    <InputFieldLayout>
      {answerArray.map((letter, index) => (
        <StyledInput
          onInput={(event) => handleLetterGuess(event, index)}
          ref={(ref) => (inputRef.current[index] = ref)}
          key={index}
          maxLength="1"
          type="text"
          isRight={guessedWordArray[index] === answerArray[index]}
          value={guessedWordArray[index] || ""}
          isWrong={index === wrongIndex}
          readOnly
          isActive={index === activeIndex}
        ></StyledInput>
      ))}
      <ChooseLetter
        setChosenLetter={setChosenLetter}
        activeIndex={activeIndex}
        answerArray={answerArray}
      />
    </InputFieldLayout>
  );
}
