import Image from "next/image";
import { useState, useEffect } from "react";
import styled from "styled-components";

const StyledEnemy = styled(Image)`
  justify-self: flex-end;

  object-fit: contain;
  bottom: 0;
`;

export default function EnemyAvatar({ currentEnemy }) {
  useEffect(() => {
    setAnimation("true");
    setTimeout(() => {
      setAnimation("false");
    }, 2000);
  }, [currentEnemy]);

  return (
    <>
      <StyledEnemy
        src={currentEnemy.img}
        alt={currentEnemy.name}
        width="250"
        height="150"
      />
    </>
  );
}
