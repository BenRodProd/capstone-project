import styled from "styled-components";

const StyledQuestion = styled.div`
  top: 8rem;
  left: 2rem;

  display: flex;
  position: absolute;
  border: 4px solid #2651a6;
  margin: 0 auto;
  -webkit-border-radius: 20px;
  -moz-border-radius: 20px;
  border-radius: 20px;
  justify-content: center;
  height: fit-content;
  width: fit-content;
  background-color: rgba(225, 235, 0, 0.9);
  padding: 0.5rem;
  color: black;
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 2rem;
  &:after {
    object-fit: cover;
  }
`;

export default function Question({ question }) {
  return (
    <>
      <StyledQuestion>{question}</StyledQuestion>
    </>
  );
}
