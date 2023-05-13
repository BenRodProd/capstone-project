import styled from "styled-components";
import { useEffect } from "react";
const StyledQuestion = styled.div`
  position: relative;
  align-self: center;
  justify-self: center;
  transform: translate(-50% -50%);
  border: 20px solid transparent;
  border-image: url("/assets/border.png") 30% stretch;
  margin: 0 auto;

  justify-content: center;
  height: fit-content;
  width: fit-content;
  background-color: rgba(0, 0, 0, 0.7);

  padding: 0.5rem;
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 2rem;
  &:after {
    object-fit: cover;
  }
`;
const StyledText = styled.span`
  text-shadow: #fc0 1px 0 10px;
`;
const Wrapper = styled.div`
  display: flex;
  position: absolute;
  top: 0;
  width: 100vw;
  height: 100%;
`;
export default function Question({ question }) {
  console.log("Question Render Trigger");

  return (
    <>
      <Wrapper>
        <StyledQuestion>
          <StyledText>{question}</StyledText>
        </StyledQuestion>
      </Wrapper>
    </>
  );
}
