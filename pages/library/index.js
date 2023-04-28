import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";

const BookPageStyle = styled.ul`
  position: relative;
  font-family: Georgia, "Times New Roman", Times, serif;
  color: black;
  list-style: none;

  padding-left: 0;
  margin-top: 5rem;
  margin-bottom: 5rem;
  margin-left: 3rem;
  margin-right: 3rem;

  li {
    position: relative;
    margin-top: 1rem;
    margin-bottom: 2rem;
  }

  ::first-letter {
    font-size: 3rem;
    font-weight: bold;
  }
`;
const BookPageContainer = styled.div`
  height: calc(100vh - 8rem);
  margin-top: 3rem;
  overflow: scroll;
`;
const FeatherLink = styled(Link)`
  position: fixed;
`;
const StyledWisdom = styled.div`
  position: relative;

  li {
    margin-top: 2rem;
    margin-bottom: 2rem;
  }
`;
const BookPageImage = styled.div`
  position: relative;
  z-index: -2;
  height: 100%;

  &::before {
    content: "";
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-image: url("/assets/bookpage.png");

    background-size: cover;
    opacity: 0.7;
    z-index: -1;
  }
`;
export default function ViewBook({ library }) {
  const categories = library
    .map((wisdom) => wisdom.category)
    .filter((value, index, self) => self.indexOf(value) === index);
  console.log(categories);
  console.log(library);
  return (
    <>
      <BookPageContainer>
        <BookPageImage>
          {categories.map((cat, index) => {
            return (
              <BookPageStyle key={uuidv4()}>
                <li>
                  <h1>
                    Chapter {index + 1}: {cat}
                  </h1>
                </li>

                {library
                  .filter((wisdom) => wisdom.category === cat)
                  .map((wisdom) => (
                    <StyledWisdom key={wisdom.id}>
                      <li>
                        <h2>Question:</h2>
                        <p>{wisdom.question}</p>
                      </li>
                      <li>
                        <h2>Answer:</h2>
                        <p>{wisdom.answer}</p>
                      </li>
                      <p>_____________________________</p>
                    </StyledWisdom>
                  ))}
              </BookPageStyle>
            );
          })}
        </BookPageImage>
      </BookPageContainer>
      <FeatherLink href="library/add" passHref legacyBehavior>
        <Image
          src="/assets/feather.png"
          alt="feather"
          width="200"
          height="70"
        ></Image>
      </FeatherLink>
    </>
  );
}
