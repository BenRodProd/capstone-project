import { useState } from "react";
import GlobalStyle from "../styles";
import Head from "next/head";
import { useRouter } from "next/router";
import styled from "styled-components";
import { library } from "@/library/library";
import LibraryNavigation from "@/components/EnterLibrary";

const MainStyled = styled.div`
  @media only screen and (min-width: 768px) {
    .container {
      max-width: 375px;
      max-height: 667px;
      margin: 0 auto;
    }
  }
`;

export default function App({ Component, pageProps }) {
  const [currentLibrary, setCurrentLibrary] = useState(library);
  const [currentBook, setCurrentBook] = useState("");
  function handleNewWisdomSubmit(wisdom) {
    setCurrentLibrary([...currentLibrary, wisdom]);
  }
  function handleEditWisdomSubmit(wisdom) {
    const arrayToKeep = currentLibrary.filter((elem) => elem.id !== wisdom.id);
    setCurrentLibrary([...arrayToKeep, wisdom]);
  }
  const router = useRouter();

  const insideLibrary = router.route.includes("/library");

  return (
    <>
      <Head>
        <title>Journey of Wisdom</title>
      </Head>
      <GlobalStyle />
      <MainStyled>
        <Component
          {...pageProps}
          library={currentLibrary}
          handleNewWisdomSubmit={handleNewWisdomSubmit}
          handleEditWisdomSubmit={handleEditWisdomSubmit}
          currentBook={currentBook}
          setCurrentBook={setCurrentBook}
        />

        <LibraryNavigation insideLibrary={insideLibrary} />
      </MainStyled>
    </>
  );
}
