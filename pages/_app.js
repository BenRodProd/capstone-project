import { useState } from "react";
import GlobalStyle from "../styles";
import Head from "next/head";
import { library } from "@/library/library";
import EnterLibrary from "@/components/EnterLibrary";

export default function App({ Component, pageProps }) {
  const [currentLibrary, setCurrentLibrary] = useState(library);
  const [insideLibrary, setInsideLibrary] = useState(false);
  function handleNewWisdomSubmit(wisdom) {
    setCurrentLibrary([...currentLibrary, wisdom]);
  }

  function toggleInsideLibrary() {
    setInsideLibrary(!insideLibrary);
    ("toggle");
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

      <EnterLibrary
        insideLibrary={insideLibrary}
        toggleInsideLibrary={toggleInsideLibrary}
      />
    </>
  );
}
