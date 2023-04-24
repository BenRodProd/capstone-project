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

export default function AvatarStatus({ health, armor }) {
  return (
    <>
      <StyledStatusBox>
        <label htmlFor="health">Health:</label>
        <HealthProgress id="health" max="100" value={health}></HealthProgress>
        <label htmlFor="armor">Armor:</label>
        <ArmorProgress id="armor" max="100" value={armor}></ArmorProgress>
      </StyledStatusBox>
    </>
  );
}
