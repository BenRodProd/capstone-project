import useSWR from "swr";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import InsertBook from "@/components/InsertBook";
import AudioHandler from "@/components/AudioHandler";
import RPGButton from "@/components/Button";

const BookShelfImage = styled(Image)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
`;
const ButtonWrapper = styled.div`
  position: absolute;
  z-index: 5;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
`;
const LibraryStyle = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  margin-bottom: auto;
  text-align: center;
`;

const AddNewBookTitleInput = styled.input`
  width: 100%;
`;

const BooksWrapper = styled.div`
display:flex;
position:absolute;
top: calc(vh-25);
`

const BurnBook = styled(Image)`
  position: absolute;
  bottom: 28%;
  right: 15%;
  width: 20%;
  height: 20%;

  z-index: 3;
  filter: saturate(${(props) => props.saturation});
`;
export default function ViewLibrary({
  setCurrentBook,
  handleBurnBook,
  loginActive,
}) {
  if (!loginActive) {
    requestFullscreen()
  }
  function requestFullscreen() {
    const element = document.documentElement;
  
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen();
    } else {
      console.log("Fullscreen API is not supported");
    }
  }
  const [inputPopupActive, setInputPopupActive] = useState(false);
  const [burnActive, setBurnActive] = useState(false);
  const { data: userData, mutate } = useSWR("/api/users");

  let torchColors = 0;
  const router = useRouter();
  function handleNewBookSubmit(event) {
    event.preventDefault();
    const bookTitle = event.target.title.value;

    addBook(bookTitle);
    setCurrentBook(bookTitle);
    router.push("/library/viewBook");
  }
  const books = userData[0].books.map((element) => element.bookname);

  if (burnActive) {
    torchColors = 1;
  } else {
    torchColors = 0;
  }
  async function addBook(bookTitle) {
    const newBook = {
      bookname: bookTitle,
      avatar: "knight",
      xp: 0,
      level: 1,
      stage: 1,
      armor: 0,
      health: 20,
      inventory: [],
      inventorySlots: 2,
      gainedItems: 0,
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

    if (!response.ok) {
      console.error(`Error: ${response.status}`);
    }
    mutate();
  }
  function onBurnBook(event) {
    handleBurnBook(event);
    setCurrentBook("");
    mutate();
  }
  if (!Array.isArray(userData)) {
    return <div>loading</div>;
  }

  return (
    <>
      <LibraryStyle>
        {!loginActive && (
          <>
            <BookShelfImage
              src="/assets/bookshelf2.png"
              height="1920"
              width="1080"
              alt="bookshelf"
            ></BookShelfImage>
            <BooksWrapper>          
               {books.map((book, index) => (
              <InsertBook
                userData={userData}
                burnActive={burnActive}
                setBurnActive={setBurnActive}
                key={index}
                setCurrentBook={setCurrentBook}
                bookName={book}
                index={index}
                handleBurnBook={onBurnBook}
              ></InsertBook>
            ))}
            </BooksWrapper>
 
            {inputPopupActive && (
              <ButtonWrapper>
                <StyledForm onSubmit={handleNewBookSubmit}>
                  <label htmlFor="title">Enter Title</label>
                  <AddNewBookTitleInput
                    autoFocus
                    maxLength="20"
                    required
                    name="title"
                  ></AddNewBookTitleInput>
                  <RPGButton
                    textSize="2rem"
                    text="Submit"
                    type="submit"
                  ></RPGButton>
                </StyledForm>
              </ButtonWrapper>
            )}
            {books.length < 6 && (
              <>
                {!inputPopupActive && (
                  <ButtonWrapper onClick={() => setInputPopupActive(true)}>
                    <RPGButton
                      textSize="1.3rem"
                      text="Add new Book"
                    ></RPGButton>
                  </ButtonWrapper>
                )}
              </>
            )}
            <BurnBook
              width="130"
              height="1000"
              alt="delete book"
              src="/assets/torch.png"
              onClick={() => setBurnActive(!burnActive)}
              saturation={torchColors}
            ></BurnBook>
          </>
        )}
      </LibraryStyle>
      <AudioHandler level="library" />
    </>
  );
}
