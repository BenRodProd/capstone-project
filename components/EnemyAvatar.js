import Image from "next/image";
import styled from "styled-components";

const StyledAvatar = styled(Image)`
  position: absolute;
  object-fit: contain;
  top: 10rem;
  left: 5rem;
`;

export default function EnemyAvatar({ currentEnemy }) {
  return (
    <>
      <StyledAvatar
        src={currentEnemy.img}
        alt={currentEnemy.name}
        width="200"
        height="200"
      />
      <p>{currentEnemy.name}</p>
    </>
  );
}
