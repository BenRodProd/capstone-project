import { useRouter } from "next/router";
import styled from "styled-components";
import { useState } from "react";
import useSWRMutation from "swr/mutation";
import { mutate } from "swr";
import Image from "next/image";
import Link from "next/link";
import ShowVerifyBurnWisdomPopup from "@/components/ShowVerifyBurnWisdomPopup";
import RPGButton from "@/components/Button";
import Loading from "@/components/Loading";
import {
  StyledForm,
  StyleWrapper,
  StyledLabel,
  StyledInput,
  StyledSelect,
  ButtonWrapper,
  StyledPopup,
  StyledBook,
  BookWrapper,
  StyledBackToBookImage,
  BackgroundImage, 
} from "@/components/Styles/AddBookStyled.js";



const FormWrapper = styled.div`
  display: flex;
`;

const BurnWisdom = styled(Image)`
  position: absolute;
  bottom: 5%;
  right: 10%;
  z-index: 3;
  filter: saturate(${(props) => props.saturation});
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

export default function EditWisdom({ library, currentBook, handleBurnWisdom, userData, userIndex }) {
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
      owner: userData[userIndex].name,
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
        height="120"
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
