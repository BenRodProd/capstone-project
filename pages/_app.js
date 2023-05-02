import { useEffect, useState } from "react";
import GlobalStyle from "../styles";
import Head from "next/head";
import { useRouter } from "next/router";
import { SWRConfig } from "swr";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import styled from "styled-components";
import { library } from "@/library/library";
import LibraryNavigation from "@/components/EnterLibrary";

const MainStyled = styled.div`
  @media only screen and (min-width: 768px) {
    width: 475px;
    height: 667px;
    margin: 0 auto;
  }
`;
const fetcher = async (...args) => {
  const response = await fetch(...args);
  if (!response.ok) {
    throw new Error(`Request with ${JSON.stringify(args)} failed.`);
  }
  return await response.json();
};

async function sendRequest(url, { arg }) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(arg),
  });

  const { status } = await response.json();
  console.log(status);
}
async function editRequest(url, { arg }) {
  // here we set the request method
  const response = await fetch(url, {
    method: "PUT",
    body: JSON.stringify(arg),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    console.error(`Error: ${response.status}`);
  }
}
export default function App({ Component, pageProps }) {
  const { data, error, isLoading } = useSWR("/api/library", fetcher);
  const { trigger } = useSWRMutation("/api/library", sendRequest);

  const router = useRouter();
  const [currentLibrary, setCurrentLibrary] = useState(library);
  const [currentBook, setCurrentBook] = useState("");
  useEffect(() => {
    setCurrentLibrary(data);
    console.log(data);
  }, [data]);
  function handleNewWisdomSubmit(wisdom) {
    setCurrentLibrary([...currentLibrary, wisdom]);
    trigger(wisdom);
  }
  async function handleEditWisdomSubmit(wisdom) {
    const arrayToKeep = currentLibrary.filter((elem) => elem.id !== wisdom.id);
    setCurrentLibrary([...arrayToKeep, wisdom]);
    await fetch(`/api/library/${wisdom._id}`, {
      method: "DELETE",
    });
    console.log(wisdom);
    trigger(wisdom);
  }

  const insideLibrary = router.route.includes("/library");
  if (isLoading || !currentLibrary) {
    return <div>loading...</div>;
  }
  if (error) {
    return <div>error</div>;
  }

  console.log(data);
  return (
    <>
      <SWRConfig
        value={{
          fetcher: fetcher,
        }}
      >
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
      </SWRConfig>
    </>
  );
}
