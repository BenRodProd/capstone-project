import Image from "next/image";
import styled from "styled-components";
import { useState } from "react";
import Inventory from "./Inventory";

const StyledPouch = styled(Image)`
  position: relative;

  opacity: 0.7;
`;

export default function Pouch({
  inventory,
  inventorySlots,
  setUserHealth,
  setUserArmor,
  setInventory,
  itemList,
}) {
  const [pouchOpen, setPouchOpen] = useState(false);
  return (
    <>
      <StyledPouch
        className="clickable"
        width="50"
        height="50"
        alt="pouch"
        src="/assets/pouch.png"
        onClick={() => setPouchOpen(!pouchOpen)}
      ></StyledPouch>
      {pouchOpen ? (
        <Inventory
          itemList={itemList}
          setUserHealth={setUserHealth}
          inventorySlots={inventorySlots}
          inventory={inventory}
          setUserArmor={setUserArmor}
          setInventory={setInventory}
        />
      ) : null}
    </>
  );
}
