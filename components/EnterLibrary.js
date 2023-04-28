import Image from "next/image";
import styled from "styled-components";
import Link from "next/link";

const StyledImage = styled(Image)`
  position: fixed;
  top: 0;
  left: 0;
  object-fit: contain;
  opacity: 0.7;
  &:hover {
    opacity: 1;
  }
`;

export default function LibraryNavigation({ insideLibrary }) {
  return (
    <>
      {insideLibrary ? (
        <Link href="/">
          <StyledImage
            src="/assets/journey.png"
            alt="Library Icon"
            height="80"
            width="80"
          ></StyledImage>
        </Link>
      ) : (
        <Link href="/library">
          <StyledImage
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
