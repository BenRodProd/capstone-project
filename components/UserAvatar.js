import styled from "styled-components";
import Image from "next/image";

const StyledAvatarImage = styled(Image)`
  position: absolute;
  left: 2rem;
  top: 30rem;
`;

export default function UserAvatar({ imageSrc }) {
  return (
    <StyledAvatarImage
      src={imageSrc}
      alt="User Avatar"
      width="80"
      height="80"
    />
  );
}
