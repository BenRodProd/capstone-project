import styled from "styled-components";
const InputFieldLayout = styled.div`
  display: flexbox;
  justify-content: center;
`;
const StyledInput = styled.input`
  width: 1rem;
`;
export default function Answer({ answer }) {
  const answerArray = answer.split("");
  console.log(answerArray);
  return (
    <>
      <h1>ANSWER:</h1>
      <InputFieldLayout>
        {answerArray.map((letter) => (
          <StyledInput key={letter} maxLength="1" type="text"></StyledInput>
        ))}
      </InputFieldLayout>
    </>
  );
}
