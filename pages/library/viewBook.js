import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";
import AudioHandler from "@/components/AudioHandler";
import Loading from "@/components/Loading";

const BookPageStyle = styled.ul`
  position: relative;
  font-family: Georgia, "Times New Roman", Times, serif;
  color: black;
  list-style: none;
  text-align: center;
  padding-left: 0;
  margin-top: 1rem;
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

const BookPosition = styled.div`
display: flex;
position: absolute;
width: 100%;
height:100%;
top:0;
left: 0;
right: 0;
bottom: 0;

`

const WholeBookBack = styled.div`
position:absolute;

width:100%;
height:100%;

background-image: url("/assets/bookpage.png");
background-repeat: no-repeat;
background-size: cover;
opacity: 0.8;


`

const StyledBottom = styled.div`
  display: flex;
  position: absolute;
  flex-direction: column;
  justify-content: center;
  align-items: center;
 
  background-color: rgba(0,0,0,0.7);
 width: 100%;

  bottom: 0;
`;
const BookTitle = styled.h1`
  position: relative;
  margin-top: 3rem;
  margin-bottom: 5rem;
  font-family: "Franklin Gothic Medium";
  color: black;
  font-size: 3.5rem;
  text-align: center;
  z-index: 1;
`;

const BookPageContainer = styled.div`
  height: calc(100% - 3rem);
  margin-top: 3rem;
  overflow: scroll;
  overflow-x: hidden;
`;

const FeatherLink = styled(Link)`
position:relative;

  bottom: 0;
  justify-self: center;

  z-index:225;
`;

const StyledWisdom = styled.li`
  position: relative;

  li {
    margin-top: 2rem;
    margin-bottom: 2rem;
  }
`;

const StyledLink = styled(Link)`
  position: relative;
  margin-bottom:0;
  cursor: pointer;
  z-index: 5;
  text-decoration: none;
  color: black;
`;

const BookPageImage = styled.div`
  position: relative;
  


  &::before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;

    background-image: url("/assets/bookpage.png");
   
    background-position: center;
    overflow:hidden;
    background-size: contain;
    opacity: 0.7;
    z-index:-1;
  }
`;

export default function ViewBook({ library, currentBook }) {
  console.log("viewbook", library, currentBook)
  if(!library) {
    return <Loading />
  }
  const categories = library
    .filter((entry) => entry.book === currentBook)
    .map((wisdom) => wisdom.category)
    .filter((value, index, self) => self.indexOf(value) === index);

  return (
    <>
    <BookPosition>
    <WholeBookBack>
      <BookPageContainer>
        <BookPageImage>
          <BookTitle>
            <div className="seperator">_________</div>
            {currentBook}
            <div className="seperator">_________</div>
          </BookTitle>

          {categories.map((cat, index) => {
            return (
              <BookPageStyle key={cat}>
                <li>
                  <h1>
                    Chapter {index + 1}: {cat}
                  </h1>
                  <div className="seperator">
                    ______________________________
                  </div>
                </li>

                {library
                  .filter((entry) => entry.book === currentBook)
                  .filter((wisdom) => wisdom.category === cat)
                  .map((wisdom) => (
                    <StyledWisdom key={wisdom._id}>
                      <StyledLink href={`/library/${wisdom._id}`}>
                        <div>
                          <h2>Question:</h2>
                          <p>{wisdom.question}</p>

                          <h2>Answer:</h2>
                          <p>{wisdom.answer}</p>
                        </div>
                      </StyledLink>

                      <div className="seperator">
                        _____________________________
                      </div>
                    </StyledWisdom>
                  ))}
              </BookPageStyle>
            );
          })}
        </BookPageImage>
      </BookPageContainer>
      <StyledBottom>
        <FeatherLink href="/library/add">
          <Image
            src="/assets/feather.png"
            alt="feather"
            width="150"
            height="40"
          ></Image>
        </FeatherLink>
        <p>
          You have{" "}
          {library.filter((entry) => entry.book === currentBook).length} wisdoms
          in your book
        </p>
      </StyledBottom>
      </WholeBookBack>
      </BookPosition>
      <AudioHandler level="library" />
    </>
  );
}
