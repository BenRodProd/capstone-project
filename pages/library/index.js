import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import InsertBook from "@/components/InsertBook";

const BookShelfImage = styled(Image)`
  position: flex;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
`;

const AddNewBookButton = styled.button`
  position: fixed;
  bottom: 1rem;
  left: 8rem;
  width: 7rem;
`;

const AddNewBookTitleInput = styled.input`
  position: fixed;
  bottom: 0;
  left: 6.7rem;
`;

export default function ViewLibrary({ library, setCurrentBook }) {
  const [inputPopupActive, setInputPopupActive] = useState(false);

  const router = useRouter();
  function handleNewBookSubmit(event) {
    event.preventDefault();

    setCurrentBook(event.target.title.value);
    router.push("/library/viewBook");
  }
  const books = library
    .map((wisdom) => wisdom.book)
    .filter((value, index, self) => self.indexOf(value) === index);

  return (
    <>
      <BookShelfImage
        src="/assets/bookshelf2.png"
        height="1920"
        width="1080"
        alt="bookshelf"
      ></BookShelfImage>
      {books.map((book, index) => (
        <InsertBook
          key={book}
          setCurrentBook={setCurrentBook}
          bookName={book}
          index={index}
        ></InsertBook>
      ))}
      {books.length <= 6 ? (
        <AddNewBookButton
          onClick={() => setInputPopupActive(true)}
          type="button"
        >
          Add new Book
        </AddNewBookButton>
      ) : null}
      {inputPopupActive && (
        <form onSubmit={handleNewBookSubmit}>
          <label htmlFor="title">Enter Title</label>
          <AddNewBookTitleInput required name="title"></AddNewBookTitleInput>
          <AddNewBookButton type="submit">Submit</AddNewBookButton>
        </form>
      )}
    </>
  );
}
