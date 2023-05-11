import Image from "next/image";
import { useState, useEffect } from "react";
import styled, { keyframes, css } from "styled-components";
const fadeIn = keyframes`
from {
  opacity: 0;
}
to {
  opacity:1;
}
`;
const StyledEnemy = styled(Image)`
  justify-self: flex-end;

  object-fit: contain;
  bottom: 0;
  ${({ animation }) =>
    animation &&
    css`
      animation: ${fadeIn} 3s ease-in 1;
    `}
`;

export default function EnemyAvatar({ currentEnemy }) {
  const [animation, setAnimation] = useState(false);
  useEffect(() => {
    setAnimation(true);
    setTimeout(() => {
      setAnimation(false);
    }, 3000);
  }, [currentEnemy]);

  return (
    <>
      <StyledEnemy
        animation={animation}
        src={currentEnemy.img}
        alt={currentEnemy.name}
        width="250"
        height="150"
      />
    </>
  );
}
