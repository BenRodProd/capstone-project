import Image from "next/image";
import styled from "styled-components";
import Link from "next/link";

const StyledImage = styled(Image)`
  position: absolute;
  top: 0rem;
  left: 0;
  object-fit: contain;
  opacity: 0.7;
  &:hover {
    opacity: 1;
  }
`;

export default function EnterLibrary({ insideLibrary, toggleInsideLibrary }) {
  return (
    <>
      {insideLibrary ? (
        <Link href="/">
          <StyledImage
            onClick={toggleInsideLibrary}
            src="/assets/journey.png"
            alt="Library Icon"
            height="80"
            width="80"
          ></StyledImage>
        </Link>
      ) : (
        <Link href="/Library/">
          <StyledImage
            onClick={toggleInsideLibrary}
            src="/assets/bookicon.png"
            alt="Library Icon"
            height="80"
            width="80"
          ></StyledImage>
        </Link>
      )}
    </>
  );
}
