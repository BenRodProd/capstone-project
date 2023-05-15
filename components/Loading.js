import styled, { keyframes } from "styled-components";
import Image from "next/image";

const rotate = keyframes`
from {
    transform:rotateZ(0)
}
to {
    transform:rotateZ(360deg)
}
`;

const StyledLoadingImage = styled(Image)`
  position: absolute;
  top: 30%;
  left: 30%;
  width: 50%;
  height: 50%;
  justify-content: center;
  align-self: center;
  animation: ${rotate} 2s infinite;
  object-fit: cover;
`;

const StyledDiv = styled.div`
  display: flex;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: black;
`;

export default function Loading() {
  return (
    <StyledDiv>
      <StyledLoadingImage
        alt="loading"
        height="200"
        width="200"
        src="/assets/gearwheel.png"
      ></StyledLoadingImage>
    </StyledDiv>
  );
}
