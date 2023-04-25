import styled from "styled-components";

import { HealthProgress } from "./StyledProgress";

const StyledEnemyStats = styled.div`
  position: absolute;
  left: 7rem;
  top: 27.5rem;
`;
export default function EnemyStatus({ enemyHealth }) {
  return (
    <StyledEnemyStats>
      <HealthProgress value={enemyHealth} max={200} />
    </StyledEnemyStats>
  );
}
