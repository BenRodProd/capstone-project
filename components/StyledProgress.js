import styled from "styled-components";

export const HealthProgress = styled.progress`
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
export const ArmorProgress = styled.progress`
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
