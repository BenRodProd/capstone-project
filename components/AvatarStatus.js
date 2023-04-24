import styled from "styled-components";

const StyledStatusBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 3px solid grey;
  background-color: lightgrey;
  padding: 0.5rem;
`;
const HealthProgress = styled.progress`
  -webkit-appearance: none;
  appearance: none;
  ::-webkit-progress-value {
    background-image: -webkit-linear-gradient(
        -45deg,
        transparent 33%,
        rgba(0, 0, 0, 0.1) 33%,
        rgba(0, 0, 0, 0.1) 66%,
        transparent 66%
      ),
      -webkit-linear-gradient(top, rgba(255, 255, 255, 0.25), rgba(0, 0, 0, 0.25)),
      -webkit-linear-gradient(left, #240000, #ff9999);

    border-radius: 2px;
    background-size: 35px 20px, 100% 100%, 100% 100%;
  }
`;
const ArmorProgress = styled.progress`
  -webkit-appearance: none;
  appearance: none;
  ::-webkit-progress-value {
    background-image: -webkit-linear-gradient(
        -45deg,
        transparent 33%,
        rgba(0, 0, 0, 0.1) 33%,
        rgba(0, 0, 0, 0.1) 66%,
        transparent 66%
      ),
      -webkit-linear-gradient(top, rgba(105, 137, 255, 0.25), rgba(0, 0, 0, 0.25)),
      -webkit-linear-gradient(left, #000a30, #6989ff);

    border-radius: 2px;
    background-size: 35px 20px, 100% 100%, 100% 100%;
  }
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
