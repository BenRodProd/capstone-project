import Image from "next/image";
import styled from "styled-components";
import { useState } from "react";
import Inventory from "./Inventory";

const StyledPouch = styled(Image)`
  position: absolute;
  top: 28rem;
  left: 0rem;
  opacity: 0.7;
`;

export default function Pouch({
  inventory,
  inventorySlots,
  setUserHealth,
  setUserArmor,
  setInventory,
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
