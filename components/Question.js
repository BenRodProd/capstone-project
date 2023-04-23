import styled from "styled-components";
const StyledQuestion = styled.div`
  display: flexbox;
  border-radius: 5%;
  justify-content: center;
  height: 400px;
  width: 100%;
  background-color: yellow;
  padding: 2rem;
`;
export default function Question({ question }) {
  return (
    <>
      <h1>Question</h1>
      <StyledQuestion>{question}</StyledQuestion>
    </>
  );
}
