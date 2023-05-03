import styled from "styled-components";
import { HealthProgress, ArmorProgress } from "./StyledProgress";
import { useState, useEffect } from "react";
const StyledStatusBox = styled.div`
  display: flex;
  position: absolute;
  margin-top: 26rem;
  right: 2px;
  flex-direction: column;
  align-items: center;
  border: 2px solid grey;
  background-color: rgba(77, 72, 74, 0.4);
  padding: 0.5rem;
  width: fit-content;
  margin-right: 0.2;
`;
const StyledLegend = styled.legend`
  position: absolute;
  top: 30rem;
  right: 4rem;

  color: cyan;
  z-index: 5;
  font-size: ${(props) => props.size};

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
      <StyledLegend size={levelSize} htmlFor="statusBox">
        LEVEL: {level}
      </StyledLegend>
      <StyledStatusBox id="statusBox">
        <label htmlFor="health">Health:</label>
        <HealthProgress id="health" max="100" value={health}></HealthProgress>
        <label htmlFor="armor">Armor:</label>
        <ArmorProgress id="armor" max="100" value={armor}></ArmorProgress>
      </StyledStatusBox>
    </>
  );
}
