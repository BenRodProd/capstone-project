import Image from "next/image";
import styled from "styled-components";

const Box = styled.div`
  position: absolute;
  font-size: 0.6rem;
  align-items: center;
  top: 28rem;
  left: ${(props) => props.lefty}rem;
  width: 3rem;
  height: 3rem;
  border: 2px solid white;
  background-color: black;
  z-index: 5;
  opacity: 0.9;
`;

const ItemImage = styled(Image)`
  position: relative;
  width: 100%;
  height: 100%;

  padding: 0;
`;

export default function Inventory({
  inventorySlots,
  inventory,
  setUserHealth,
  setUserArmor,
  setInventory,
  itemList,
}) {
  function useItem(event) {
    const item = event.target.alt;
    if (item === "healthsmall") {
      setUserHealth((prevUserHealth) => prevUserHealth + 20);
      setInventory(
        currentInventory.filter((element) => element !== "healthsmall")
      );
    }
    if (item === "helmet") {
      setUserArmor((prevUserArmor) => prevUserArmor + 20);
      setInventory(currentInventory.filter((element) => element !== "helmet"));
    }
    if (item === "shield") {
      setUserArmor((prevUserArmor) => prevUserArmor + 40);
      setInventory(currentInventory.filter((element) => element !== "shield"));
    }
    if (item === "glove") {
      setUserArmor((prevUserArmor) => prevUserArmor + 30);
      setInventory(currentInventory.filter((element) => element !== "shield"));
    }
  }

  const defaultItem = "empty";
  const currentInventory = new Array(Number(inventorySlots)).fill(defaultItem);

  for (let i = 0; i < inventory.length; i++) {
    currentInventory[i] = inventory[i];
  }

  return (
    <>
      {currentInventory.map((item, index) => (
        <Box onClick={useItem} lefty={4 + index * 4} key={index}>
          <ItemImage src={itemList[item]} alt={item} height="80" width="80" />
        </Box>
      ))}
    </>
  );
}
