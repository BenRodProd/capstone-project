import styled, { keyframes } from "styled-components";
import { alphabet } from "@/library/alphabet";
import { useState } from "react";

const blurIn = keyframes`
  from {
    filter: blur(3rem);
  }

  to {
    filter: blur(0);
  }
`;

const StyledLetterChoice = styled.span`
  font-family: monospace;
  font-size: 1rem;
  border: 2px solid white;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  width: 1.8rem;
  height: 1.5rem;
  margin: 5px 5px;
  align-items: center;
  text-align: center;
  animation: ${blurIn} 1s linear;
`;

const StyledLetterBox = styled.div`
  display: grid;
  align-items: center;
  justify-content: center;
  grid-auto-flow: column;
  width: 100%;
  place-self: center;

  cursor: default;
`;
export default function ChooseLetter({
  setChosenLetter,
  activeIndex,
  answerArray,
}) {
  const choices = [];

  // Get 8 random letters
  while (choices.length < 8) {
    const randomLetter = alphabet[Math.floor(Math.random() * alphabet.length)];
    if (
      !choices.includes(randomLetter) &
      (randomLetter !== answerArray[activeIndex])
    ) {
      choices.push(randomLetter);
    }
  }

  // Insert the answer letter at a random index
  const answerLetter = answerArray[activeIndex];
  const randomIndex = Math.floor(Math.random() * choices.length);
  choices.splice(randomIndex, 0, answerLetter);

  return (
    <StyledLetterBox>
      {choices.map((element, index) => (
        <StyledLetterChoice
          key={index}
          onClick={() => setChosenLetter(element)}
        >
          {element}
        </StyledLetterChoice>
      ))}
    </StyledLetterBox>
  );
}
