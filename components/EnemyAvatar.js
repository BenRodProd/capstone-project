import Image from "next/image";
import styled from "styled-components";

const StyledEnemy = styled(Image)`
  position: relative;
  justify-self: flex-end;
  
  object-fit: contain;
  bottom: 0;
`;

export default function EnemyAvatar({ currentEnemy }) {
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
