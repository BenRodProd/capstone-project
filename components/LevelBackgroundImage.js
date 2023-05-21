import Image from "next/image";
import styled from "styled-components";

const StyledBackground = styled(Image)`
  z-index: -2;
  top: 4rem;
  left: 0;
  
  width: 100%;
  height: 30%;
  object-fit: contain;
`;

const LevelName = styled.h1`
  text-align: center;
  text-shadow: #fc0 1px 0 15px;
`;

export default function LevelBackgroundImage({ level }) {
  return (
    <>
      <LevelName>{level.name}</LevelName>
      <StyledBackground
        priority
        src={level.img}
        alt="Level Image"
        width="350"
        height="350"
      />
    </>
  );
}
