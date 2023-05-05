import { useRouter } from "next/router";
import { useState } from "react";
import styled from "styled-components";
import ShowVerifyPopup from "./ShowVerifyPopup";
const BookSpine = styled.div`
  &.Book0 {
    background-image: url("/assets/book1.png");
    position: absolute;
    top: 3rem;
    left: 1rem;
    height: 300px;
    width: 200px;
    transform: scale(0.3);
    object-fit: cover;

    font-size: vw;
  }
  &.Book1 {
    background-image: url("/assets/book1.png");
    position: absolute;
    top: 3rem;
    left: 5rem;
    height: 300px;
    width: 200px;
    transform: scale(0.3);
    object-fit: cover;
    filter: saturate(0.5);
  }
  &.Book2 {
    background-image: url("/assets/book1.png");
    position: absolute;
    top: 3rem;
    left: 9rem;
    height: 300px;
    width: 200px;
    transform: scale(0.3);
    object-fit: cover;
    filter: saturate(0.2);
  }
  &.Book3 {
    background-image: url("/assets/book1.png");
    position: absolute;
    top: 8rem;
    left: 1rem;
    height: 300px;
    width: 200px;
    transform: scale(0.2);
    object-fit: cover;
    filter: saturate(0);
  }
  &.Book4 {
    background-image: url("/assets/book1.png");
    position: absolute;
    top: 8rem;
    left: 4.5rem;
    height: 300px;
    width: 200px;
    transform: scale(0.2);
    object-fit: cover;
    filter: saturate(0);
  }
  &.Book5 {
    background-image: url("/assets/book1.png");
    position: absolute;
    top: 8rem;
    left: 8rem;
    height: 300px;
    width: 200px;
    transform: scale(0.2);
    object-fit: cover;
    filter: saturate(0);
  }
`;
const BookTitle = styled.h1`
  padding-top: 2rem;
  padding-left: 6rem;
  display: flex;
  word-wrap: break-word;
  font-family: Georgia, "Times New Roman", Times, serif;
  color: white;
  font-weight: bold;

  transform: rotate(90deg);
  justify-self: center;
  place-content: center;
  font-size: 2.5rem;
`;
export default function InsertBook({
  burnActive,
  setBurnActive,
  bookName,
  index,
  setCurrentBook,
  handleBurnBook,
  userData,
}) {
  async function saveCurrentBook(book) {
    const response = await fetch(`/api/users/${userData[0]._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...userData[0],
        currentBook: book,
      }),
    });

    if (!response.ok) {
      console.error(`Error: ${response.status}`);
    }
  }
  const [popUp, setPopUp] = useState(false);
  const router = useRouter();
  function handleOnBookClick(book) {
    if (!burnActive) {
      setCurrentBook(book);
      saveCurrentBook(book);
      router.push("/library/viewBook");
    } else {
      setPopUp(true);
    }
  }
  return (
    <>
      <BookSpine
        key={bookName}
        onClick={() => handleOnBookClick(bookName)}
        className={`Book${index}`}
      >
        <BookTitle>{bookName}</BookTitle>
      </BookSpine>
      {popUp ? (
        <ShowVerifyPopup
          handleBurnBook={handleBurnBook}
          setPopUp={setPopUp}
          bookName={bookName}
          setBurnActive={setBurnActive}
        />
      ) : null}
    </>
  );
}
