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
import RPGButton from "@/components/Button";
import Loading from "@/components/Loading";

const MediaQuery = styled.div`

max-width: 600px;
max-height:1200px;
min-height: 100vh;
 position:relative;


@media (min-width:600px){
  padding:0;
  margin:auto;
  overflow:hidden;
  border: 20px solid transparent;
  border-image: url("/assets/border.png") 30% stretch;
  min-height: 90vh;
}


`
const NavigationWrapper = styled.div`

position:absolute;
top:10px;

`
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
  transform: translate(-120%, -100%);
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

const ImageContainer = styled.div`
  position: absolute;
  padding:0;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const LoginImage = styled(Image)`
  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;
  z-index: 25;
  object-fit: contain;
  opacity: 0.8;
  object-position: center;
`;

const TitleScreen = styled(Image)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 115;
  object-fit: contain;
 
  animation: ${zoom} 40s ease-in 1;
`;
const LoginScreen = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  object-fit: cover;
`;
const StyledInput = styled.input`
  font-size: 2rem;
  background-color: rgba(255, 255, 255, 0.5);
  color: black;
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

    mutate(`/api/users`);
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
    return <Loading />;
  }
  if (error) {
    return <div>error</div>;
  }
  function titleHandler() {
    setTimeout(() => {
      setTitleActive(false);
    }, 16800);
  }
  function handleOnClickSubmit(event) {
    event.preventDefault();
    setTitleActive(true);
    setFirstLoad(false);
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
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          ></meta>
        </Head>
        <GlobalStyle />
        <MediaQuery>
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
              <ImageContainer>
              <LoginImage
                src="/assets/MINDBLADE.png"
                alt="Login Screen"
                fill={true}
              />

              <StyledForm onSubmit={handleOnClickSubmit}>
                <StyledInput autoFocus type="text" placeholder="Name" />
                <RPGButton text="Submit"></RPGButton>
              </StyledForm>
              </ImageContainer>
            </LoginScreen>
            <AudioHandler level="login" />
          </>
        )}
        {titleActive && (
          <>
            {titleHandler()}
            <TitleScreen
              onClick={() => setTitleActive(false)}
              src="/assets/MINDBLADE.png"
              alt="Title Screen"
              width="1080"
              height="1920"
            ></TitleScreen>

            <AudioHandler level="intro" />
          </>
        )}
        <NavigationWrapper>
        <LibraryNavigation
          loginActive={firstLoad}
          userData={user}
          currentBook={currentBook}
          insideLibrary={insideLibrary}
          library={currentLibrary}
        />
        </NavigationWrapper>
         </MediaQuery>
      </SWRConfig>
     
    </>
  );
}
