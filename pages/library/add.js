import styled from "styled-components";
import { useEffect, useState } from "react";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { v4 as uuidv4 } from "uuid";

const StyledForm = styled.form`
  display: grid;
  gap: 0.2rem;
  flex-direction: column;
  grid-template-columns: 50% 50%;
  margin-top: 16rem;
  color: black;
  justify-content: center;
  align-items: center;
  font-family: Georgia, "Times New Roman", Times, serif;
`;

const StyledLabel = styled.label`
  text-align: right;
`;

const StyledInput = styled.input`
  background-color: transparent;
`;

const StyledButton = styled.button`
  display: flex;
  position: absolute;
  margin-top: 2rem;
  top: 23rem;
  text-align: center;
  justify-self: center;
  justify-self: center;
  font-family: Georgia, "Times New Roman", Times, serif;
  font-weight: bold;
`;

const StyledSelect = styled.select`
  background-color: transparent;
`;

const StyledPopup = styled.div`
  position: absolute;
  border: 2px solid white;
  top: 30rem;
  left: 0;
  text-align: center;
  width: 100%;
`;

const StyledBook = styled(Image)`
  position: absolute;
  top: 0;
  left: 0;
  object-fit: contain;
  width: 100%;
  height: 100%;
  z-index: -2;
`;

const StyledBackToBookImage = styled(Image)`
  position: relative;
  margin-top: 10rem;
`;

const BackgroundImage = styled(Image)`
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0.7;
  z-index: -3;
  object-fit: cover;
`;

export default function AddWisdom({ handleNewWisdomSubmit }) {
  const inputRef = useRef(null);
  const [popupActive, setPopupActive] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const wisdomData = Object.fromEntries(formData);
    handleNewWisdomSubmit({ ...wisdomData, answeredRight: 0, id: uuidv4() });
    setPopupActive(true);
    setTimeout(() => setPopupActive(false), 1500);
    event.target.reset();
    inputRef.current.focus();
  }
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  return (
    <>
      <BackgroundImage
        src="/assets/desktop.png"
        alt="desktop"
        width="400"
        height="740"
      ></BackgroundImage>
      <StyledBook
        src="/assets/openbook.png"
        alt="book"
        width="1080"
        height="1920"
      />
      <StyledForm onSubmit={handleSubmit}>
        <StyledLabel htmlFor="question">Enter Question:</StyledLabel>
        <StyledInput
          ref={inputRef}
          required
          name="question"
          type="text"
        ></StyledInput>
        <StyledLabel htmlFor="answer">Enter Answer:</StyledLabel>
        <StyledInput required name="answer" type="text"></StyledInput>
        <StyledLabel htmlFor="category">Pick a Category:</StyledLabel>
        <StyledSelect name="category">
          <option value="Vehicles">Vehicles</option>
          <option value="Food">Food</option>
          <option value="Basics">Basics</option>
          <option value="Javascript">Javascript</option>
        </StyledSelect>
        <StyledLabel htmlFor="benefit">Pick a Benefit</StyledLabel>
        <StyledSelect name="benefit">
          <option value="health">Health</option>
          <option value="armor">Armor</option>
          <option value="stamina">Stamina</option>
        </StyledSelect>
        <StyledButton type="submit">SUBMIT</StyledButton>
      </StyledForm>
      {popupActive && <StyledPopup>Wisdom Added</StyledPopup>}
      <Link href="/library">
        <StyledBackToBookImage
          src="/assets/bookicon.png"
          alt="Back to Book"
          width="220"
          height="180"
        ></StyledBackToBookImage>
      </Link>
    </>
  );
}