import Image from "next/image";
import styled from "styled-components";
import Link from "next/link";

const StyledImage = styled(Image)`
  position: absolute;
  top: 37rem;
  left: 0;
  object-fit: contain;
  opacity: 0.7;
  &:hover {
    opacity: 1;
  }
`;

export default function EnterLibrary() {
  return (
    <>
      <Link href="/">
        <StyledImage
          src="/assets/bookicon.png"
          alt="Library Icon"
          height="80"
          width="80"
        ></StyledImage>
      </Link>
    </>
  );
}
