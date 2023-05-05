import useSWR from "swr";
import { useSWRConfig } from "swr";
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
  currentBook,
  userData,
}) {
  const [inputPopupActive, setInputPopupActive] = useState(false);
  const [burnActive, setBurnActive] = useState(false);
  const { mutate } = useSWRConfig();
  let bookTitle = "";
  let torchColors = 0;
  const router = useRouter();
  function handleNewBookSubmit(event) {
    event.preventDefault();
    bookTitle = event.target.title.value;
    setCurrentBook(bookTitle);

    addBook();

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
  const addBook = async () => {
    const newBook = {
      bookname: bookTitle,
      avatar: "",
      xp: "0",
      level: "1",
      stage: "1",
      armor: "0",
      health: "20",
      inventory: [],
      inventorySlots: "2",
      gainedItems: "0",
    };
    const updatedUserData = {
      ...userData[0],
      books: [...userData[0].books, newBook],
      currentBook: bookTitle,
    };
    const response = await fetch(`/api/users/${userData[0]._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedUserData),
    });
    console.log(userData[0].currentBook);
    if (!response.ok) {
      console.error(`Error: ${response.status}`);
    }
  };

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
          userData={userData}
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
            autoFocus
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
