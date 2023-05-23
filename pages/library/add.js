import { useState, useRef, useEffect } from "react";
import useSWRMutation from "swr/mutation";
import { mutate } from "swr";
import Link from "next/link";
import AudioHandler from "@/components/AudioHandler";
import RPGButton from "@/components/Button";
import { HealthProgress } from "@/components/StyledProgress";
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
  HealthProgressWrapper,
  BackgroundImage,
  InventoryWrapper,
  Box,
  ItemImage,
  ItemPopup,
  ItemPopupHeader,
  DoublePopup
} from "@/components/Styles/AddBookStyled.js";



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
  userIndex
}) {
  const inputRef = useRef();
  const [popupActive, setPopupActive] = useState(false);
  const [ItemPopupActive, setItemPopupActive] = useState(false);
  const [doublePopup, setDoublePopup] = useState(false);
  const [currentInventory, setCurrentInventory] = useState(
    userData[userIndex].books[
      userData[userIndex].books.findIndex((element) => element.bookname === currentBook)
    ].inventory
  );
  const [healthPopup, setHealthPopup] = useState(false);
  const [newItem, setNewItem] = useState();

  const { trigger } = useSWRMutation("/api/library", sendRequest);
  const userBookIndex = userData[userIndex].books.findIndex(
    (element) => element.bookname === currentBook
  );
  function checkIfWisdomExists(wisdomData) {
    const exists = library.some(item => {
      return item.answer.toLowerCase() === wisdomData.answer.toLowerCase() &&
             item.question.toLowerCase() === wisdomData.question.toLowerCase();
    });
  
    return exists;
  }
  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const wisdomData = Object.fromEntries(formData);
    const lowercaseWisdomData = {};
    for (const [key, value] of Object.entries(wisdomData)) {
      lowercaseWisdomData[key.toLowerCase()] = value.toLowerCase();
    }
    const wisdomExists = await checkIfWisdomExists(lowercaseWisdomData);


if (wisdomExists) {

  setDoublePopup(true)
  setTimeout(() => {
    setDoublePopup(false)
  }, 1000);
} else {
    trigger({
      ...lowercaseWisdomData,
      right: "0",
      owner: userData[userIndex].name,
      book: currentBook,
    });

    const gainedItems = Number(userData[userIndex].books[userBookIndex].gainedItems);
    giveMoreHealth();
    const wisdomsInBook = library.filter(
      (element) => element.book === currentBook
    ).length;
    const itemsInInventory = userData[userIndex].books[userBookIndex].inventory;

    if (wisdomsInBook % 20 === 0 && gainedItems < wisdomsInBook / 20) {
      // Create a filtered list of items that are not "empty" and not part of itemsInInventory

      const itemKeys = Object.keys(itemList).filter(
        (key) =>
          key !== "empty" && !itemsInInventory.includes(key) && key !== "pouch"
      );
      let randomItem = itemKeys[Math.floor(Math.random() * itemKeys.length)];
      if (!randomItem & currentInventory.includes("empty")) {
        saveItemToInventory("health");
        setHealthPopup(true);
        setTimeout(() => {
          setHealthPopup(false);
        }, 1000);
        return;
      } else if (!randomItem & !currentInventory.includes("empty")) {
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

    setPopupActive(true);
    setTimeout(() => setPopupActive(false), 1500);
    event.target.reset();
    inputRef.current.focus();
  }}
  async function saveItemToInventory(item) {
    if (item === "pouch") {
      const insertInInventory = "empty";
      const moreSlots =
        Number(userData[userIndex].books[userBookIndex].inventorySlots) + 1;
      const updatedUserData = {
        ...userData[userIndex],
        books: [
          ...userData[userIndex].books.slice(0, userBookIndex),
          {
            ...userData[userIndex].books[userBookIndex],
            inventory: [
              ...userData[userIndex].books[userBookIndex].inventory,
              insertInInventory,
            ],
            inventorySlots: moreSlots,
          },
          ...userData[userIndex].books.slice(userBookIndex + 1),
        ],
      };
      const response = await fetch(`/api/users/${userData[userIndex]._id}`, {
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

      return;
    } else if (item === "health") {
      const newHealth = Number(userData[userIndex].books[userBookIndex].health) + 20;
      const updatedUserData = {
        ...userData[userIndex],
        books: [
          ...userData[userIndex].books.slice(0, userBookIndex),
          {
            ...userData[userIndex].books[userBookIndex],

            health: newHealth,
          },
          ...userData[userIndex].books.slice(userBookIndex + 1),
        ],
      };
      const response = await fetch(`/api/users/${userData[userIndex]._id}`, {
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

      return;
    } else {
      const updatedInventory = [
        ...userData[userIndex].books[userBookIndex].inventory,
        item,
      ];
      const updatedUserData = {
        ...userData[userIndex],
        books: [
          ...userData[userIndex].books.slice(0, userBookIndex),
          {
            ...userData[userIndex].books[userBookIndex],
            inventory: updatedInventory,
          },
          ...userData[userIndex].books.slice(userBookIndex + 1),
        ],
      };
      const response = await fetch(`/api/users/${userData[userIndex]._id}`, {
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
      mutate("/api/users");
    }
  }
  async function save(data, id) {
    const response = await fetch(`/api/users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      console.error(`Error: ${response.status}`);
      return;
    }
  }
  function getDataForHealth(points) {
    const newHealth = Number(userData[userIndex].books[userBookIndex].health) + points;
    return {
      ...userData[userIndex],
      books: [
        ...userData[userIndex].books.slice(0, userBookIndex),
        {
          ...userData[userIndex].books[userBookIndex],

          health: newHealth,
        },
        ...userData[userIndex].books.slice(userBookIndex + 1),
      ],
    };
  }
  const userHealth = userData[userIndex].books[userBookIndex].health;
  async function giveMoreHealth() {
    const data = getDataForHealth(1);
    await save(data, userData[userIndex]._id);
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
      {doublePopup && <DoublePopup>Wisdom already exists</DoublePopup>}
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
