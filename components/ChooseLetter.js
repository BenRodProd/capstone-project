import styled from "styled-components";
import { alphabet } from "@/library/alphabet";
const StyledLetterChoice = styled.span`
  font-family: monospace;
  font-size: 1rem;
  border: 2px solid white;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  margin: 5px 5px;
  align-items: center;
  text-align: center;
`;
const StyledLetterBox = styled.div`
  display: grid;
  position: absolute;
  justify-content: center;
  grid-auto-flow: column;
  width: 100%;
  bottom: -2rem;
  left: 0;
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
