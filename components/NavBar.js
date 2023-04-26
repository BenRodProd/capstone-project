import styled from "styled-components";
import Link from "next/link";

const StyledNav = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  background-color: white;
`;

export default function Navbar() {
  return (
    <StyledNav>
      <Link href="/">Journey</Link>
      <Link href="Library">+</Link>
    </StyledNav>
  );
}
