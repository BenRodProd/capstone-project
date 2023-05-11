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
  text-shadow: #fc0 0 0 10px;
  color: cyan;
  z-index: 15;
  font-size: ${(props) => props.size};
  float: right;
  transform-origin: 0 0;
`;
const StyledLabel = styled.label`
  text-shadow: #fc0 1px 0 10px;
`;
const StyledFieldSet = styled.fieldset`
  border: none;
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
      <StyledFieldSet>
        <StyledLegend size={levelSize} htmlFor="statusBox">
          LEVEL: {level}
        </StyledLegend>
        <StyledStatusBox id="statusBox">
          <StyledLabel htmlFor="health">Health:</StyledLabel>
          <HealthProgress id="health" max="150" value={health}></HealthProgress>
          <StyledLabel htmlFor="armor">Armor:</StyledLabel>
          <ArmorProgress id="armor" max="150" value={armor}></ArmorProgress>
        </StyledStatusBox>
      </StyledFieldSet>
    </>
  );
}
