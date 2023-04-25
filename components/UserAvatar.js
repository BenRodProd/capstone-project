import styled from "styled-components";
import Image from "next/image";

const StyledAvatarImage = styled(Image)`
  position: absolute;
  left: 2rem;
  top: 30rem;
`;
const StyledXPProgress = styled.progress`
  position: absolute;
  left: 2rem;
  top: 35rem;
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
      -webkit-linear-gradient(top, rgba(255, 255, 255, 0.25), rgba(0, 0, 0, 0.25)),
      -webkit-linear-gradient(left, #616161, #90a4ae);

    border-radius: 2px;
    background-size: 35px 20px, 100% 100%, 100% 100%;
  }
`;

const StyledDescription = styled.span`
  position: absolute;
  left: 2.8rem;
  top: 35.2rem;
  z-index: 2;
  color: lightgrey;
  font-size: 0.5rem;
`;

export default function UserAvatar({ imageSrc, userXP, level }) {
  return (
    <>
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
    </>
  );
}
