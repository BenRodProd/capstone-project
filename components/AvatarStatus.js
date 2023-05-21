import styled from "styled-components";
import { HealthProgress, ArmorProgress } from "./StyledProgress";
import { useState, useEffect } from "react";
const StyledStatusBox = styled.div`
  display: flex;
  position: relative;

  flex-direction: column;
  align-self: flex-end;
  align-items: center;
  border: 20px solid transparent;
  border-image: url("/assets/border.png") 30% stretch;
  background-color: transparent;
  padding: 0.5rem;
  width: fit-content;
`;
const StyledLegend = styled.span`
  position: absolute;
  top: -25%;
  right: 5%;
  text-shadow: #fc0 0 0 10px;
  color: cyan;
  z-index: 15;
  font-size: ${(props) => props.size};
  float: right;
  transform-origin: 0 0;
`;
const StyledLevel = styled.span`
  font-size: 2em;
`;

const StyledLabel = styled.label`
  text-shadow: #fc0 1px 0 10px;
`;
const StyledFieldSet = styled.fieldset`
  border: none;
`;
const StyleWrapper = styled.div`
  scale: 0.8;
  position:absolute;
  right:0;
`;
export default function AvatarStatus({ health, armor, level }) {
  const [levelSize, setLevelSize] = useState("1.5rem");
  useEffect(() => {
    setLevelSize("2rem");
    setTimeout(() => {
      setLevelSize("1.5rem");
    }, 1500);
  }, [level]);
  return (
    <>
      <StyleWrapper>
        <StyledFieldSet>
          <StyledLegend size={levelSize}>
            LEVEL:<StyledLevel>{level}</StyledLevel>
          </StyledLegend>
          <StyledStatusBox id="statusBox">
            <StyledLabel htmlFor="health">Health:</StyledLabel>
            <HealthProgress
              id="health"
              max="150"
              value={health}
            ></HealthProgress>
            <StyledLabel htmlFor="armor">Armor:</StyledLabel>
            <ArmorProgress id="armor" max="150" value={armor}></ArmorProgress>
          </StyledStatusBox>
        </StyledFieldSet>
      </StyleWrapper>
    </>
  );
}
