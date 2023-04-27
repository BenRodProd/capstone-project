import { useState } from "react";
import GlobalStyle from "../styles";
import Head from "next/head";
import { library } from "@/library/library";
import LibraryNavigation from "@/components/EnterLibrary";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }) {
  const [currentLibrary, setCurrentLibrary] = useState(library);
  function handleNewWisdomSubmit(wisdom) {
    setCurrentLibrary([...currentLibrary, wisdom]);
  }

  const router = useRouter();

  const insideLibrary = router.route.includes("/library");

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

      <LibraryNavigation insideLibrary={insideLibrary} />
    </>
  );
}
