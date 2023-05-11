import styled from "styled-components";
import Image from "next/image";

import React from "react";

const StyledAvatarImage = styled(Image)`
  position: relative;
`;

const StyledXPProgress = styled.progress`
  position: relative;

  width: 5rem;
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
      -webkit-linear-gradient(top, rgba(255, 255, 255, 0.2), rgba(0, 0, 0, 0.25)),
      -webkit-linear-gradient(left, #616161, #90a4ae);

    border-radius: 2px;
    background-size: 35px 20px, 100% 100%, 100% 100%;
  }
`;

const StyledBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-right: 2rem;
`;

const StyledDescription = styled.span`
  position: relative;
  text-shadow: #fc0 1px 0 10px;
  z-index: 2;
  color: lightgrey;
  font-size: 0.7rem;
`;

export default function UserAvatar({ imageSrc, userXP, level }) {
  return (
    <>
      <StyledBox>
        <StyledAvatarImage
          src={imageSrc}
          alt="User Avatar"
          width="80"
          height="80"
        />

        <StyledDescription>
          {userXP} / {(level + 1) * 500} XP
        </StyledDescription>
        <StyledXPProgress value={userXP} max="500" />
      </StyledBox>
    </>
  );
}
