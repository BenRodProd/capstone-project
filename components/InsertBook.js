import { useRouter } from "next/router";
import styled from "styled-components";

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
const BookTitle = styled.p`
  padding-top: 2rem;
  padding-left: 2rem;
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
export default function InsertBook({ bookName, index, setCurrentBook }) {
  const router = useRouter();
  function handleOnBookClick(book) {
    setCurrentBook(book);
    router.push("/library/viewBook");
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
    </>
  );
}
