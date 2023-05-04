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
  z-index: 4;
  opacity: 0.8;
`;

export default function Inventory({
  inventorySlots,
  inventory,
  setUserHealth,
  setUserArmor,
  setInventory,
}) {
  function useItem(event) {
    const item = event.target.innerText;
    if (item === "health") {
      setUserHealth((prevUserHealth) => prevUserHealth + 20);
      setInventory(currentInventory.filter((element) => element !== "health"));
      console.log(currentInventory);
    }
    if (item === "helmet") {
      setUserArmor((prevUserArmor) => prevUserArmor + 20);
      setInventory(currentInventory.filter((element) => element !== "helmet"));
      console.log(currentInventory);
    }
  }

  const defaultItem = " "; // Change this to whatever default value you want
  const currentInventory = new Array(Number(inventorySlots)).fill(defaultItem);

  // Use a for loop to insert the items from inventory into the currentInventory array
  for (let i = 0; i < inventory.length; i++) {
    currentInventory[i] = inventory[i];
  }

  return (
    <>
      {currentInventory.map((item, index) => (
        <Box onClick={useItem} lefty={4 + index * 4} key={index}>
          {item}
        </Box>
      ))}
    </>
  );
}
