import styled, { keyframes } from "styled-components";
const float = keyframes`
  0% {
    transform: translateY(0);
    font-size:2rem;
  }
  30% {
    transform: translateY(-20%);
    transform: translateX(-5px);
    opacity: 0.8;
  }
  50% {
    transform: translateY(-40%);
    transform: translateX(5px);
    opacity: 0.5;
  }
  80% {
    transform: translateY(-60%);
    transform: translateX(-5px);
    opacity: 0.3;
  }
  100% {
    transform: translateY(-80%);
    transform: translateX(5px);
    opacity: 0;
    font-size:0.2rem;
  }
`;
const StyledDamage = styled.div`
  position: absolute;
  z-index: 3;
  font-size: 3rem;
  font-weight: bold;
  top: ${(props) => props.y};
  left: ${(props) => props.x};
  color: ${(props) => props.color};

  animation: ${float};
  animation-duration: 0.5s;
  animation-iteration-count: 1;
`;

export default function ShowDamage({ color, x, y, damage }) {
  return (
    <>
      <StyledDamage x={x} y={y} color={color}>
        -{damage}
      </StyledDamage>
    </>
  );
}
