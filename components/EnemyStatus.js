import styled from "styled-components";
import { useEffect } from "react";
import { HealthProgress } from "./StyledProgress";

const StyledEnemyStats = styled.div`
  position: absolute;
  left: 7rem;
  top: 22rem;
`;
export default function EnemyStatus({ enemyHealth }) {
  return (
    <>
      <StyledEnemyStats>
        <HealthProgress value={enemyHealth} max="100" />
      </StyledEnemyStats>
    </>
  );
}
