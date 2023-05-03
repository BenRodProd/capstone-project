import { useRouter } from "next/router";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import ShowVerifyBurnWisdomPopup from "@/components/ShowVerifyBurnWisdomPopup";
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

const StyledInput = styled.textarea`
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

const StyledPopup = styled.div`
  position: absolute;
  border: 2px solid white;
  top: 30rem;
  left: 0;
  text-align: center;
  width: 100%;
`;

const BurnWisdom = styled(Image)`
  position: absolute;
  top: 34rem;
  right: 1rem;
  z-index: 3;
  filter: saturate(${(props) => props.saturation});
`;

export default function EditWisdom({
  library,
  handleEditWisdomSubmit,
  currentBook,
  handleBurnWisdom,
}) {
  const router = useRouter();
  const { id } = router.query;
  const inputRef = useRef(null);
  const [burnActive, setBurnActive] = useState(false);
  const [popupActive, setPopupActive] = useState(false);

  let torchColors = 0;

  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const wisdomData = Object.fromEntries(formData);
    const lowercaseWisdomData = {};
    for (const [key, value] of Object.entries(wisdomData)) {
      lowercaseWisdomData[key.toLowerCase()] = value.toLowerCase();
    }
    handleEditWisdomSubmit({
      ...lowercaseWisdomData,
      _id: wisdom._id,
      book: currentBook,
      right: wisdom.right,
      benefit: wisdom.benefit,
      owner: "Testor",
    });
    setPopupActive(true);
    setTimeout(() => {
      setPopupActive(false);
      router.push("/library/viewBook");
    }, 1500);
  }
  if (burnActive) {
    torchColors = 1;
  } else {
    torchColors = 0;
  }
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const wisdom = library.filter((wisdom) => wisdom._id === id)[0];
  if (!id) {
    return <div>loading...</div>;
  }
  if (!wisdom) {
    return <div>loading...</div>;
  }
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
          defaultValue={wisdom.question}
          ref={inputRef}
          required
          name="question"
          type="text"
        ></StyledInput>
        <StyledLabel htmlFor="answer">Enter Answer:</StyledLabel>
        <StyledInput
          defaultValue={wisdom.answer}
          required
          name="answer"
          type="text"
        ></StyledInput>
        <StyledLabel htmlFor="category">Pick a Category:</StyledLabel>
        <StyledSelect defaultValue={wisdom.category} name="category">
          <option value="Vehicles">Vehicles</option>
          <option value="Food">Food</option>
          <option value="Basics">Basics</option>
          <option value="Javascript">Javascript</option>
        </StyledSelect>
        <StyledLabel htmlFor="benefit">Benefit:</StyledLabel>
        <p id="benefit">{wisdom.benefit}</p>
        <StyledButton type="submit">SUBMIT</StyledButton>
      </StyledForm>
      {popupActive && <StyledPopup>Wisdom Edited</StyledPopup>}
      <BurnWisdom
        width="80"
        height="100"
        alt="delete book"
        src="/assets/torch.png"
        onClick={() => setBurnActive(!burnActive)}
        saturation={torchColors}
      ></BurnWisdom>
      {burnActive ? (
        <ShowVerifyBurnWisdomPopup
          handleBurnWisdom={handleBurnWisdom}
          wisdomId={wisdom._id}
          setBurnActive={setBurnActive}
        />
      ) : null}
      <Link href="/library/viewBook">
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
