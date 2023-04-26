import { useState } from "react";
import Link from "next/link";
import styled from "styled-components";
import GlobalStyle from "../styles";
import Head from "next/head";
import { library } from "@/library/library";

const StyledLink = styled(Link)`
  position: absolute;
  bottom: 0;
  left: 0;
  background-color: white;
  color: black;
  text-decoration: none;
  width: 100%;
`;

export default function App({ Component, pageProps }) {
  const [currentLibrary, setCurrentLibrary] = useState(library);
  function handleNewWisdomSubmit(wisdom) {
    setCurrentLibrary([...currentLibrary, wisdom]);
  }

  return (
    <>
      <Head>
        <title>Journey of Wisdom</title>
      </Head>
      <GlobalStyle />
      <Component
        {...pageProps}
        library={currentLibrary}
        handleNewWisdomSubmit={handleNewWisdomSubmit}
      />
      <StyledLink href="/Library/">Add New Wisdom</StyledLink>
    </>
  );
}
