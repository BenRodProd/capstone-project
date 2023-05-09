import Image from "next/image";
import styled from "styled-components";

const StyledAvatar = styled(Image)``;

export default function EnemyAvatar({ currentEnemy }) {
  return (
    <>
      <StyledAvatar
        src={currentEnemy.img}
        alt={currentEnemy.name}
        width="200"
        height="200"
      />
    </>
  );
}
