import Image from "next/image";
import styled from "styled-components";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

const StyledPopup = styled.div`
  position: absolute;
  text-align: center;
  padding-top: 30%;
  width: 100%;
  font-size: 2rem;
  color: red;
  left: 0;
  top: 15rem;
  background-color: black;
  height: 300px;
  border: 2px solid white;
  z-index: 10;
`;

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
}) {
  const [popupActive, setPopupActive] = useState(false);
  const router = useRouter();

  function handleLeaveLibrary() {
    if (
      !currentBook ||
      currentBook === "" ||
      userData[0].currentBook !== currentBook ||
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
          Please choose an active Book or create one. The chosen Book may not be
          empty.
        </StyledPopup>
      ) : null}
    </>
  );
}
