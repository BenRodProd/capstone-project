import styled from "styled-components";
import Image from "next/image";
import { useRouter } from "next/router";
const VerifyBox = styled.div`
  position: absolute;
  z-index: 20;
  top: 20rem;
  left: 0;
  width: 100%;
  height: 40%;
  background-color: black;
  color: red;
  font-size: 2rem;
  border: 20px solid transparent;
  border-image: url("/assets/border.png") 30% stretch;
`;

const StyledButtons = styled.button`
  background-color: transparent;
  border: none;
`;

const ButtonWrapper = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  height: 100%;
  left: 80%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

const VerifyWrapper = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  background-color: transparent;
`;
const StyledText = styled.h3`
  text-align: center;
`;

export default function ShowVerifyPopup({
  setPopUp,
  setBurnActive,
  handleBurnBook,
  bookName,
}) {
  const router = useRouter();
  function handleClickNo() {
    setPopUp(false);
    setBurnActive(false);
  }
  function handleClickYes() {
    setPopUp(false);
    handleBurnBook(bookName);
    setTimeout(() => setBurnActive(false), 500);
  }
  return (
    <VerifyBox>
      <VerifyWrapper>
        <StyledText>DO YOU REALLY WANT TO BURN THIS WISDOM?</StyledText>
        <ButtonWrapper>
          <StyledButtons onClick={handleClickYes} type="button">
            <Image src="/assets/yes.png" width="60" height="60" alt="yes" />
          </StyledButtons>
          <StyledButtons onClick={handleClickNo} type="button">
            <Image src="/assets/no.png" width="60" height="60" alt="no" />
          </StyledButtons>
        </ButtonWrapper>
      </VerifyWrapper>
    </VerifyBox>
  );
}
