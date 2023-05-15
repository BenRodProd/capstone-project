import { useRouter } from "next/router";
import styled from "styled-components";
import { useState, useEffect } from "react";
import useSWRMutation from "swr/mutation";
import { mutate } from "swr";
import Image from "next/image";
import Link from "next/link";
import ShowVerifyBurnWisdomPopup from "@/components/ShowVerifyBurnWisdomPopup";
import RPGButton from "@/components/Button";
import Loading from "@/components/Loading";

const StyledForm = styled.form`
  margin-top: -2rem;
  display: grid;
  gap: 0.2rem;
  flex-direction: column;
  grid-template-columns: 50% 50%;

  color: black;
  justify-content: center;
  align-items: center;
  font-family: Georgia, "Times New Roman", Times, serif;
`;
const StyleWrapper = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
`;
const StyledLabel = styled.label`
  text-align: right;
`;
const FormWrapper = styled.div`
  display: flex;
`;
const StyledInput = styled.input`
  background-color: transparent;
  border: none;
  border-bottom: 2px solid;
  height: 2rem;
`;

const StyledSelect = styled.select`
  background-color: transparent;
  font-size: 1rem;
`;

const ButtonWrapper = styled.div`
  position: absolute;
  justify-self: center;
  align-self: center;
  bottom: 30%;

  scale: 0.7;
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

const BookWrapper = styled.div`
  display: flex;
  width: 100%;
  position: relative;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const StyledBackToBookImage = styled(Image)`
  position: absolute;
  bottom: 0;
  width: 40%;
  height: 20%;
  left: 50%;
  transform: translateX(-50%);
`;

const BackgroundImage = styled(Image)`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  opacity: 0.7;
  z-index: -3;
  object-fit: cover;
`;

const BurnWisdom = styled(Image)`
  position: absolute;
  top: 34rem;
  right: 1rem;
  z-index: 3;
  filter: saturate(${(props) => props.saturation});
`;
const StyledOption = styled.option`
  font-size: 1rem;
`;
async function sendRequest(url, { arg }) {
  // here we set the request method
  const response = await fetch(url, {
    method: "PUT",
    body: JSON.stringify(arg),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    console.error(`Error: ${response.status}`);
  }
}

export default function EditWisdom({ library, currentBook, handleBurnWisdom }) {
  const router = useRouter();
  const { id } = router.query;

  const [burnActive, setBurnActive] = useState(false);
  const [popupActive, setPopupActive] = useState(false);
  const { trigger } = useSWRMutation(`/api/library/${id}`, sendRequest);
  let torchColors = 0;

  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const wisdomData = Object.fromEntries(formData);
    const lowercaseWisdomData = {};
    for (const [key, value] of Object.entries(wisdomData)) {
      lowercaseWisdomData[key.toLowerCase()] = value.toLowerCase();
    }
    await trigger({
      ...lowercaseWisdomData,
      _id: wisdom._id,
      book: currentBook,
      right: wisdom.right,
      owner: "Testor",
    });
    mutate("/api/library");
    setPopupActive(true);
    setTimeout(() => {
      setPopupActive(false);
      router.push("/library/viewBook");
    }, 1000);
  }
  if (burnActive) {
    torchColors = 1;
  } else {
    torchColors = 0;
  }

  const wisdom = library.filter((wisdom) => wisdom._id === id)[0];
  if (!id) {
    return <Loading />;
  }
  if (!wisdom) {
    return <Loading />;
  }
  return (
    <>
      <StyleWrapper>
        <BackgroundImage
          src="/assets/desktop.png"
          alt="desktop"
          width="400"
          height="740"
        ></BackgroundImage>
        <BookWrapper>
          <StyledBook
            src="/assets/openbook.png"
            alt="book"
            width="1080"
            height="1920"
          />
          <FormWrapper>
            <StyledForm onSubmit={handleSubmit}>
              <StyledLabel htmlFor="question">Enter Question:</StyledLabel>
              <StyledInput
                autoFocus
                defaultValue={wisdom.question}
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

              <ButtonWrapper>
                <RPGButton
                  textSize="2rem"
                  text="Submit"
                  type="submit"
                ></RPGButton>
              </ButtonWrapper>
            </StyledForm>
          </FormWrapper>
        </BookWrapper>
      </StyleWrapper>
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
