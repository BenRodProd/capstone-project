import { HealthProgress } from "./StyledProgress";

export default function EnemyStatus({ enemyHealth }) {
  return ( 
  <>
  <HealthProgress value={enemyHealth} max={200} />
  <p>{enemyHealth}</p>
  </>
  )
}
