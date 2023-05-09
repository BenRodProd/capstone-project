import styled from "styled-components";

import { HealthProgress } from "./StyledProgress";

const StyledEnemyStats = styled.div``;
export default function EnemyStatus({ enemyHealth }) {
  return (
    <StyledEnemyStats>
      <HealthProgress value={enemyHealth} max={200} />
    </StyledEnemyStats>
  );
}
