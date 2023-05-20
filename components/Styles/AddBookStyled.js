import styled from "styled-components";
import Image from "next/image";

export const StyledForm = styled.form`
  display: grid;
  gap: 0.2rem;
  flex-direction: column;
  grid-template-columns: 50% 50%;

  color: black;
  justify-content: center;
  align-items: center;
  font-family: Georgia, "Times New Roman", Times, serif;
`;
export const StyleWrapper = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
`;
export const StyledLabel = styled.label`
  text-align: right;
`;

export const StyledInput = styled.input`
  background-color: transparent;
  border: none;
  border-bottom: 2px solid;
`;

export const StyledSelect = styled.select`
  background-color: transparent;
`;

export const ButtonWrapper = styled.div`
  position: absolute;
  justify-self: center;
  align-self: center;
  bottom: 30%;

  scale: 0.7;
`;

export const StyledPopup = styled.div`
  position: absolute;
  border: 2px solid white;
  top: 30rem;
  left: 0;
  text-align: center;
  width: 100%;
`;

export const StyledBook = styled(Image)`
  position: absolute;
  top: 0;
  left: 0;
  object-fit: contain;
  width: 100%;
  height: 100%;
  z-index: -2;
`;

export const BookWrapper = styled.div`
  display: flex;
  width: 100%;
  position: relative;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
export const StyledBackToBookImage = styled(Image)`
  position: absolute;
  bottom: 0;
  width: 40%;
  height: 20%;
  left: 50%;
  transform: translateX(-50%);
`;
export const HealthProgressWrapper = styled.div`
  display: flex;
  position: absolute;
  top: 65%;
  flex-direction: column;
  width: 100%;

  justify-content: center;
  align-items: center;
`;
export const BackgroundImage = styled(Image)`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  opacity: 0.7;
  z-index: -3;
  object-fit: cover;
`;
export const InventoryWrapper = styled.div`
  position: absolute;
  top: 70%;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: row;
`;
export const Box = styled.div`
  font-size: 0.6rem;
  align-items: center;

  left: ${(props) => props.lefty}rem;
  width: 3rem;
  height: 3rem;
  border: 10px solid transparent;
  border-image: url("/assets/border.png") 30% stretch;
  background-color: black;
  z-index: 5;
  opacity: 0.9;
`;

export const ItemImage = styled(Image)`
  position: relative;
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: 0;
`;

export const ItemPopup = styled.div`
  display: flex;
  position: absolute;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  height: 25%;
  background-color: black;
  border: 20px solid transparent;
  border-image: url("/assets/border.png") 30% stretch;
  z-index: 0;
`;
export const ItemPopupHeader = styled.span`
  justify-self: flex-start;
`;
