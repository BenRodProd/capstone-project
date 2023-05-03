import Image from "next/image";
import { useState, useEffect } from "react";
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

const BurnBook = styled(Image)`
  position: absolute;
  top: 34rem;
  right: 1rem;
  z-index: 3;
  filter: saturate(${(props) => props.saturation});
`;
export default function ViewLibrary({
  library,
  setCurrentBook,
  handleBurnBook,
}) {
  const [inputPopupActive, setInputPopupActive] = useState(false);
  const [burnActive, setBurnActive] = useState(false);
  useEffect(() => {}, [library]);
  let torchColors = 0;
  const router = useRouter();
  function handleNewBookSubmit(event) {
    event.preventDefault();

    setCurrentBook(event.target.title.value);
    router.push("/library/viewBook");
  }
  const books = library
    .map((wisdom) => wisdom.book)
    .filter((value, index, self) => self.indexOf(value) === index);

  if (burnActive) {
    torchColors = 1;
  } else {
    torchColors = 0;
  }
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
          burnActive={burnActive}
          setBurnActive={setBurnActive}
          key={book}
          setCurrentBook={setCurrentBook}
          bookName={book}
          index={index}
          handleBurnBook={handleBurnBook}
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
      <BurnBook
        width="80"
        height="100"
        alt="delete book"
        src="/assets/torch.png"
        onClick={() => setBurnActive(!burnActive)}
        saturation={torchColors}
      ></BurnBook>

      {inputPopupActive && (
        <form onSubmit={handleNewBookSubmit}>
          <label htmlFor="title">Enter Title</label>
          <AddNewBookTitleInput
            maxLength="20"
            required
            name="title"
          ></AddNewBookTitleInput>
          <AddNewBookButton type="submit">Submit</AddNewBookButton>
        </form>
      )}
    </>
  );
}
