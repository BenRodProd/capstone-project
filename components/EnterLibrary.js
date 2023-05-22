import Image from "next/image";
import styled from "styled-components";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

const StyledPopup = styled.div`
  position: relative;
  text-align: center;
  
  width: 100%;
  font-size: 2rem;
  color: red;
  left: 0;
  align-items: center;
  justify-content: center;
  transform: translateY(50%);
  background-color: black;
  height: 300px;
  border: 2px solid white;
  z-index: 10;
`;

const StyledText = styled.h3`
text-align: center;
align-items:center;
`

const StyledImage = styled(Image)`
  position: absolute;
  top: 0;
  left: 0;
  object-fit: contain;
  opacity: 0.7;
  &:hover {
    opacity: 1;
  }
`;

export default function LibraryNavigation({
  insideLibrary,
  currentBook,
  userData,
  library,
  loginActive,
  userIndex
}) {
  const [popupActive, setPopupActive] = useState(false);
  const router = useRouter();
  console.log(userData, currentBook, library,userData[userIndex], userIndex)
  function handleLeaveLibrary() {
    if (
      !currentBook ||
      currentBook === "" ||
      !userData[userIndex] ||
      userData[userIndex].currentBook !== currentBook ||
      !library
    ) {
      setPopupActive(true);
      setTimeout(() => setPopupActive(false), 3000);
    } else if (!library.some((question) => question.book === currentBook)) {
      setPopupActive(true);
      setTimeout(() => setPopupActive(false), 3000);
      router.push("/library");
    } else {
      router.push("/");
    }
  }

  return (
    <>
      {!loginActive && (
        <>
          {insideLibrary ? (
            <StyledImage
              className="clickable"
              src="/assets/journey.png"
              alt="Library Icon"
              height="80"
              width="80"
              onClick={handleLeaveLibrary}
            />
          ) : (
            <Link href="/library">
              <StyledImage
                className="clickable"
                src="/assets/bookicon.png"
                alt="Library Icon"
                height="80"
                width="80"
              />
            </Link>
          )}
          {popupActive ? (
            <StyledPopup>
              <StyledText>
              Please choose an active Book or create one. The chosen Book may
              not be empty.
              </StyledText>
            </StyledPopup>
          ) : null}
        </>
      )}
    </>
  );
}
