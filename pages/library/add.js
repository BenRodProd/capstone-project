import styled from "styled-components";
import { useState, useRef, useEffect } from "react";
import useSWRMutation from "swr/mutation";
import { mutate } from "swr";
import Image from "next/image";
import Link from "next/link";
import AudioHandler from "@/components/AudioHandler";
import RPGButton from "@/components/Button";
import { HealthProgress } from "@/components/StyledProgress";

const StyledForm = styled.form`
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

const StyledInput = styled.input`
  background-color: transparent;
  border: none;
  border-bottom: 2px solid;
`;

const StyledSelect = styled.select`
  background-color: transparent;
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
const HealthProgressWrapper = styled.div`
  display: flex;
  position: absolute;
  top: 65%;
  flex-direction: column;
  width: 100%;

  justify-content: center;
  align-items: center;
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
const InventoryWrapper = styled.div`
  position: absolute;
  top: 70%;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: row;
`;
const Box = styled.div`
  font-size: 0.6rem;
  align-items: center;

  left: ${(props) => props.lefty}rem;
  width: 3rem;
  height: 3rem;
  border: 10px solid transparent;
  border-image: url("/assets/border.png") 30% stretch;
  background-color: black;
  z-index: 5;
  opacity: 0.9;
`;

const ItemImage = styled(Image)`
  position: relative;
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: 0;
`;

const ItemPopup = styled.div`
  display: flex;
  position: absolute;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  height: 25%;
  background-color: black;
  border: 20px solid transparent;
  border-image: url("/assets/border.png") 30% stretch;
  z-index: 0;
`;
const ItemPopupHeader = styled.span`
  justify-self: flex-start;
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
  const inputRef = useRef();
  const [popupActive, setPopupActive] = useState(false);
  const [ItemPopupActive, setItemPopupActive] = useState(false);
  const [currentInventory, setCurrentInventory] = useState(
    userData[0].books[
      userData[0].books.findIndex((element) => element.bookname === currentBook)
    ].inventory
  );
  const [healthPopup, setHealthPopup] = useState(false);
  const [newItem, setNewItem] = useState();

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

    if (wisdomsInBook % 5 === 0 && gainedItems < wisdomsInBook / 5) {
      // Create a filtered list of items that are not "empty" and not part of itemsInInventory

      const itemKeys = Object.keys(itemList).filter(
        (key) =>
          key !== "empty" && !itemsInInventory.includes(key) && key !== "pouch"
      );
      let randomItem = itemKeys[Math.floor(Math.random() * itemKeys.length)];
      if (!randomItem & currentInventory.includes("empty")) {
        console.log("HEALTH!!!!");
        saveItemToInventory("health");
        setHealthPopup(true);
        setTimeout(() => {
          setHealthPopup(false);
        }, 1000);
        return;
      } else if (!randomItem & !currentInventory.includes("empty")) {
        console.log("there should be a pouch");
        setNewItem("pouch");
        saveItemToInventory("pouch");
        setItemPopupActive(true);
        setTimeout(() => {
          setItemPopupActive(false);
        }, 1000);
        return;
      } else {
        saveItemToInventory(randomItem);
        setNewItem(randomItem);

        setItemPopupActive(true);
        setTimeout(() => {
          setItemPopupActive(false);
        }, 1000);
      }
    }
    console.log(userData[0].books[1].inventorySlots);
    setPopupActive(true);
    setTimeout(() => setPopupActive(false), 1500);
    event.target.reset();
    inputRef.current.focus();
  }
  async function saveItemToInventory(item) {
    if (item === "pouch") {
      const insertInInventory = "empty";
      const moreSlots =
        Number(userData[0].books[userBookIndex].inventorySlots) + 1;
      const updatedUserData = {
        ...userData[0],
        books: [
          ...userData[0].books.slice(0, userBookIndex),
          {
            ...userData[0].books[userBookIndex],
            inventory: [
              ...userData[0].books[userBookIndex].inventory,
              insertInInventory,
            ],
            inventorySlots: moreSlots,
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
      setCurrentInventory((prev) => [...prev, "empty"]);
      mutate("/api/users");
      console.log(userData);
      return;
    } else if (item === "health") {
      const newHealth = Number(userData[0].books[userBookIndex].health) + 20;
      const updatedUserData = {
        ...userData[0],
        books: [
          ...userData[0].books.slice(0, userBookIndex),
          {
            ...userData[0].books[userBookIndex],

            health: newHealth,
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
      console.log(userData);
      return;
    } else {
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
      setCurrentInventory((prev) => [...prev, item]);
      mutate("/api/users/");
    }
  }
  const userHealth = userData[0].books[userBookIndex].health;
  console.log(
    "newItem:",
    newItem,
    "currentInventory:",
    currentInventory,
    "InventorySlots:",
    userData[0].books[userBookIndex].inventorySlots,
    "Userdata",
    userData,
    "UserHealth:",
    userHealth
  );
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
          <StyledForm onSubmit={handleSubmit}>
            <StyledLabel htmlFor="question">Enter Question:</StyledLabel>
            <StyledInput
              ref={inputRef}
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
              <option value="Food">Buildings</option>
              <option value="Food">Adverbs</option>
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
        </BookWrapper>

        <InventoryWrapper>
          {currentInventory.map((item, index) => (
            <Box lefty={4 + index * 4} key={index}>
              <ItemImage
                src={itemList[item]}
                alt={item}
                height="80"
                width="80"
              />
            </Box>
          ))}
        </InventoryWrapper>
        <HealthProgressWrapper>
          <HealthProgress id="health" max="150" value={userHealth} />
        </HealthProgressWrapper>
      </StyleWrapper>
      {popupActive && <StyledPopup>Wisdom Added</StyledPopup>}
      {ItemPopupActive && (
        <ItemPopup>
          <ItemPopupHeader>You gave gained:</ItemPopupHeader>
          <ItemImage
            src={itemList[newItem]}
            alt={newItem}
            height="100"
            width="100"
          />
        </ItemPopup>
      )}
      {healthPopup && (
        <ItemPopup>
          <ItemPopupHeader>You gave gained:</ItemPopupHeader>
          <ItemPopupHeader>20 Health Points!</ItemPopupHeader>
        </ItemPopup>
      )}

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
