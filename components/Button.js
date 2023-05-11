import Image from "next/image";
import styled from "styled-components";
const StyledButton = styled.button`
  position: relative;
  font-size: 2rem;
  background-color: transparent;
  border: none;
`;
const StyledButtonImage = styled(Image)`
  position: relative;
  z-index: -1;
`;

const StyledButtonText = styled.span`
  position: absolute;
  font-family: Georgia, "Times New Roman", Times, serif;
  font-weight: bold;

  font-size: ${(props) => props.textSize};

  top: 50%;
  left: 50%;
  transform: translate(-50%, -70%);
  padding: 0;
`;

const StyledButtonWrapper = styled.div`
  display: flex;

  position: relative;
  align-self: center;
  justify-content: center;
  align-items: center;
`;

export default function RPGButton({ text, textSize }) {
  console.log(textSize);
  return (
    <>
      <StyledButtonWrapper>
        <StyledButton>
          <StyledButtonImage
            src="/assets/button.png"
            width="300"
            height="100"
            alt="submit"
          />
          <StyledButtonText textSize={textSize}>{text}</StyledButtonText>
        </StyledButton>
      </StyledButtonWrapper>
    </>
  );
}
