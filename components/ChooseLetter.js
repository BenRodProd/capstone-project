import styled from "styled-components";
import { alphabet } from "@/library/alphabet";

const StyledLetterChoice = styled.span`
  font-family: monospace;
  font-size: 1rem;
  border: 10px solid transparent;
  border-image: url("/assets/border.png") 30% stretch;
  padding-left: 0.2rem;
  padding-right: 0.2rem;
  padding-bottom: 0.2rem;
  width: 2rem;
  height: 2rem;
  margin: 5px 5px;
  align-items: center;
  justify-content: center;
  text-align: center;
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

  while (choices.length < 8) {
    const randomLetter = alphabet[Math.floor(Math.random() * alphabet.length)];
    if (
      !choices.includes(randomLetter) &
      (randomLetter !== answerArray[activeIndex])
    ) {
      choices.push(randomLetter);
    }
  }

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
