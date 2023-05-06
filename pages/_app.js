import { useEffect, useState } from "react";
import GlobalStyle from "../styles";
import Head from "next/head";
import { useRouter } from "next/router";
import { SWRConfig, mutate } from "swr";
import useSWR from "swr";
import styled from "styled-components";
import FetchUser from "@/components/FetchUsers";
import LibraryNavigation from "@/components/EnterLibrary";
import { itemList } from "@/library/itemList";

const MainStyled = styled.div`
  @media only screen and (min-width: 600px) {
    position: relative;
    scale: 1.5;
    width: 180%;
    max-width: 375px;

    overflow-y: auto;
    overflow-x: hidden;
  }
`;

const fetcher = async (...args) => {
  const response = await fetch(...args);
  if (!response.ok) {
    throw new Error(`Request with ${JSON.stringify(args)} failed.`);
  }
  return await response.json();
};

export default function App({ Component, pageProps }) {
  const user = FetchUser();
  const { data, error, isLoading } = useSWR("/api/library", fetcher);

  const router = useRouter();
  const [currentLibrary, setCurrentLibrary] = useState(data);
  const [currentBook, setCurrentBook] = useState("");

  async function handleBurnBook(book) {
    const wisdomsToDelete = currentLibrary.filter((element) => {
      return element.book === book;
    });

    await Promise.all(
      wisdomsToDelete.map((element) => {
        fetch(`/api/library/${element._id}`, {
          method: "DELETE",
        });
      })
    );
    mutate("/api/library");
    const bookIndex = user[0].books.findIndex((item) => item.bookname === book);

    if (bookIndex === -1) {
      console.error(`Error: Book not found.`);
      return;
    }

    const response = await fetch(`/api/users/${user[0]._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...user[0],
        books: user[0].books.filter((item) => item.bookname !== book),
        currentBook: "",
      }),
    });

    if (!response.ok) {
      console.error(`Error: ${response.status}`);
      return;
    }

    mutate(`/api/users/`);
    setCurrentBook("");
  }

  async function handleBurnWisdom(wisdomId) {
    await fetch(`/api/library/${wisdomId}`, {
      method: "DELETE",
    });
    mutate("/api/library");
  }
  useEffect(() => {
    if (Array.isArray(data)) {
      if (Array.isArray(user)) {
        const userData = user.filter((element) => element.name === "Testor");
        const firstSetCurrentLibrary = data.filter(
          (element) => element.owner === userData[0].name
        );
        setCurrentBook(userData[0].currentBook);
        setCurrentLibrary(firstSetCurrentLibrary);
      }
    }
  }, [data, user]);
  const insideLibrary = router.route.includes("/library");
  if (isLoading || !currentLibrary || !user) {
    return <div>loading...</div>;
  }
  if (error) {
    return <div>error</div>;
  }

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
            userData={user}
            {...pageProps}
            library={currentLibrary}
            currentBook={currentBook}
            setCurrentBook={setCurrentBook}
            handleBurnBook={handleBurnBook}
            handleBurnWisdom={handleBurnWisdom}
            itemList={itemList}
          />
          <LibraryNavigation
            userData={user}
            currentBook={currentBook}
            insideLibrary={insideLibrary}
          />
        </MainStyled>
      </SWRConfig>
    </>
  );
}
