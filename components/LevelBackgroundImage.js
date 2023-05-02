import Image from "next/image";
import styled from "styled-components";

const StyledBackground = styled(Image)`
  position: absolute;
  z-index: -2;
  top: 4rem;
  left: 0;
  width: 100vw;
  height: auto;
  object-fit: cover;
`;
export default function LevelBackgroundImage({ level }) {
  return (
    <>
      <h1>{level.name}</h1>
      <StyledBackground
        priority
        src={level.img}
        alt="Level Image"
        width="400"
        height="400"
      />
    </>
  );
}
