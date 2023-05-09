import { useEffect, useState } from "react";
import GlobalStyle from "../styles";
import Head from "next/head";
import { useRouter } from "next/router";
import { SWRConfig, mutate } from "swr";
import useSWR from "swr";
import styled, { keyframes } from "styled-components";
import FetchUser from "@/components/FetchUsers";
import LibraryNavigation from "@/components/EnterLibrary";
import { itemList } from "@/library/itemList";
import Image from "next/image";
import AudioHandler from "@/components/AudioHandler";

const zoom = keyframes`
0% {
scale:1;
transform: translate(0,0);
opacity: 1;
}
20% {
  opacity: 1;
}
40% {
  opacity:0.0;
}
100% {
  scale:10;
  transform: translate(-30rem, -70rem);
  opacity: 0.0;
}
`;

const StyledForm = styled.form`
  position: absolute;
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 10%;
  z-index: 999;
  top: 55%;
`;

const TitleScreen = styled(Image)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  animation: ${zoom} 40s ease-in 1;
`;
const LoginScreen = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  background-color: black;
  object-fit: cover;
`;
const StyledInput = styled.input`
  font-size: 2rem;
`;
const StyledButton = styled.button`
  font-size: 2rem;
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
  const [firstLoad, setFirstLoad] = useState(true);
  const [titleActive, setTitleActive] = useState(false);
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
    if (firstLoad) {
      router.push("/library");
    }
  }, []);
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
  function titleHandler() {
    setTimeout(() => {
      setTitleActive(false);
    }, 16800);
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

        <Component
          userData={user}
          {...pageProps}
          library={currentLibrary}
          currentBook={currentBook}
          setCurrentBook={setCurrentBook}
          handleBurnBook={handleBurnBook}
          handleBurnWisdom={handleBurnWisdom}
          itemList={itemList}
          loginActive={firstLoad}
        />
        {firstLoad && (
          <>
            <LoginScreen>
              <Image
                priority
                src="/assets/MINDBLADE.png"
                alt="Login Screen"
                fill={true}
              />
            </LoginScreen>
            <StyledForm>
              <StyledInput autoFocus type="text" placeholder="Name" />
              <StyledButton
                type="submit"
                onClick={() => (setTitleActive(true), setFirstLoad(false))}
              >
                Submit
              </StyledButton>
            </StyledForm>
            <AudioHandler level="login" />
          </>
        )}
        {titleActive && (
          <>
            {titleHandler()}
            <TitleScreen
              priority
              src="/assets/MINDBLADE.png"
              alt="Title Screen"
              width="1080"
              height="1920"
            ></TitleScreen>

            <AudioHandler level="intro" />
          </>
        )}
        <LibraryNavigation
          userData={user}
          currentBook={currentBook}
          insideLibrary={insideLibrary}
          library={currentLibrary}
        />
      </SWRConfig>
    </>
  );
}
