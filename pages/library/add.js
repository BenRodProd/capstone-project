import styled from "styled-components";
import { useState } from "react";
import useSWRMutation from "swr/mutation";
import { mutate } from "swr";
import Image from "next/image";
import Link from "next/link";
import AudioHandler from "@/components/AudioHandler";
import RPGButton from "@/components/Button";

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
const StyleWrapper = styled.div``;
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

const ButtonWrapper = styled.div`
  position: relative;
  justify-content: center;
  align-items: center;
  width: 50%;
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

async function sendRequest(url, { arg }) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(arg),
  });
  const { status } = await response.json();
}

export default function AddWisdom({
  library,
  currentBook,
  userData,
  itemList,
}) {
  const [popupActive, setPopupActive] = useState(false);
  const { trigger } = useSWRMutation("/api/library", sendRequest);
  const userBookIndex = userData[0].books.findIndex(
    (element) => element.bookname === currentBook
  );

  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const wisdomData = Object.fromEntries(formData);
    const lowercaseWisdomData = {};
    for (const [key, value] of Object.entries(wisdomData)) {
      lowercaseWisdomData[key.toLowerCase()] = value.toLowerCase();
    }
    trigger({
      ...lowercaseWisdomData,
      right: "0",
      owner: "Testor",
      book: currentBook,
    });

    const gainedItems = Number(userData[0].books[userBookIndex].gainedItems);

    const wisdomsInBook = library.filter(
      (element) => element.book === currentBook
    ).length;
    const itemsInInventory = userData[0].books[userBookIndex].inventory;

    if (wisdomsInBook % 20 === 0 && gainedItems < wisdomsInBook / 20) {
      // Create a filtered list of items that are not "empty" and not part of itemsInInventory

      const itemKeys = Object.keys(itemList).filter(
        (key) =>
          key !== "empty" && !itemsInInventory.includes(key) && key !== "pouch"
      );
      const randomItem = itemKeys[Math.floor(Math.random() * itemKeys.length)];
      saveItemToInventory(randomItem);
    }

    setPopupActive(true);
    setTimeout(() => setPopupActive(false), 1500);
    event.target.reset();
  }
  async function saveItemToInventory(item) {
    const updatedInventory = [
      ...userData[0].books[userBookIndex].inventory,
      item,
    ];
    const updatedUserData = {
      ...userData[0],
      books: [
        ...userData[0].books.slice(0, userBookIndex),
        {
          ...userData[0].books[userBookIndex],
          inventory: updatedInventory,
        },
        ...userData[0].books.slice(userBookIndex + 1),
      ],
    };
    const response = await fetch(`/api/users/${userData[0]._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedUserData),
    });

    if (!response.ok) {
      console.error(`Error: ${response.status}`);
      return;
    }
    mutate("/api/users");
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
        <StyledBook
          src="/assets/openbook.png"
          alt="book"
          width="1080"
          height="1920"
        />
        <StyledForm onSubmit={handleSubmit}>
          <StyledLabel htmlFor="question">Enter Question:</StyledLabel>
          <StyledInput
            required
            name="question"
            type="text"
            autoFocus
            maxLength="25"
          ></StyledInput>
          <StyledLabel htmlFor="answer">Enter Answer:</StyledLabel>
          <StyledInput
            maxLength="22"
            required
            name="answer"
            type="text"
          ></StyledInput>
          <StyledLabel htmlFor="category">Pick a Category:</StyledLabel>
          <StyledSelect name="category">
            <option value="Vehicles">Vehicles</option>
            <option value="Food">Food</option>
            <option value="Basics">Basics</option>
            <option value="Javascript">Javascript</option>
          </StyledSelect>
          <ButtonWrapper>
            <RPGButton textSize="2rem" text="Submit" type="submit"></RPGButton>
          </ButtonWrapper>
        </StyledForm>
      </StyleWrapper>
      {popupActive && <StyledPopup>Wisdom Added</StyledPopup>}
      <Link href="/library/viewBook">
        <StyledBackToBookImage
          src="/assets/bookicon.png"
          alt="Back to Book"
          width="220"
          height="180"
        ></StyledBackToBookImage>
      </Link>
      <AudioHandler level="library" />
    </>
  );
}
