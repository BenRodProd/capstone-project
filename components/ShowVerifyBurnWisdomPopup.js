import styled from "styled-components";
import { useRouter } from "next/router";
const VerifyBox = styled.div`
  position: absolute;
  z-index: 4;
  top: 20rem;
  left: 0;
  width: 100%;
  height: 30%;
  background-color: grey;
  color: red;
  font-size: 2rem;
  border: 2px solid red;
`;

export default function ShowVerifyBurnWisdomPopup({
  wisdomId,
  setBurnActive,
  handleBurnWisdom,
}) {
  const router = useRouter();
  function handleClickNo() {
    setBurnActive(false);
  }
  function handleClickYes() {
    handleBurnWisdom(wisdomId);
    setTimeout(() => {
      setBurnActive(false);
    }, 500);
    router.push("/library/viewBook");
  }
  return (
    <>
      <VerifyBox>
        <p>DO YOU REALLY WANT TO BURN THIS WISDOM?</p>
        <button onClick={handleClickYes} type="button">
          YES
        </button>
        <button onClick={handleClickNo} type="button">
          NO
        </button>
      </VerifyBox>
    </>
  );
}
