import styled from "styled-components";
import { HealthProgress, ArmorProgress } from "./StyledProgress";

const StyledStatusBox = styled.div`
  display: flex;
  position: relative;
  margin-top: 26rem;

  flex-direction: column;
  align-items: center;
  border: 3px solid grey;
  background-color: lightgrey;
  padding: 0.5rem;
  width: fit-content;
  margin-left: auto;
`;
const StyledLegend = styled.legend`
  position: absolute;
  top: 29rem;
  left: 15rem;
  color: white;
  z-index: 5;
  filter: drop-shadow(0px 0px 0.75rem black);
`;
export default function AvatarStatus({ health, armor, level }) {
  return (
    <>
      <StyledLegend htmlFor="statusBox">LEVEL: {level}</StyledLegend>
      <StyledStatusBox id="statusBox">
        <label htmlFor="health">Health:</label>
        <HealthProgress id="health" max="100" value={health}></HealthProgress>
        <label htmlFor="armor">Armor:</label>
        <ArmorProgress id="armor" max="100" value={armor}></ArmorProgress>
      </StyledStatusBox>
    </>
  );
}
