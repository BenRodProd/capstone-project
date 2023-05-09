import styled from "styled-components";
import { HealthProgress, ArmorProgress } from "./StyledProgress";
import { useState, useEffect } from "react";
const StyledStatusBox = styled.div`
  display: flex;
  position: relative;

  flex-direction: column;
  align-self: flex-end;
  align-items: center;
  border: 2px solid grey;
  background-color: rgba(77, 72, 74, 0.4);
  padding: 0.5rem;
  width: fit-content;
`;
const StyledLegend = styled.legend`
  color: cyan;
  z-index: 15;
  font-size: ${(props) => props.size};
  float: right;
  transform-origin: 0 0;
`;
export default function AvatarStatus({ health, armor, level }) {
  const [levelSize, setLevelSize] = useState("1rem");
  useEffect(() => {
    setLevelSize("1.5rem");
    setTimeout(() => {
      setLevelSize("1rem");
    }, 1500);
  }, [level]);
  return (
    <>
      <fieldset>
        <StyledLegend size={levelSize} htmlFor="statusBox">
          LEVEL: {level}
        </StyledLegend>
        <StyledStatusBox id="statusBox">
          <label htmlFor="health">Health:</label>
          <HealthProgress id="health" max="150" value={health}></HealthProgress>
          <label htmlFor="armor">Armor:</label>
          <ArmorProgress id="armor" max="150" value={armor}></ArmorProgress>
        </StyledStatusBox>
      </fieldset>
    </>
  );
}
