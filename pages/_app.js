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
import PopupHandler from "@/components/PopupHandler";
import RegistrationForm from "@/components/RegistrationForm";

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
scale:1.2;
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

const DeveloperMessage = styled.div`
position:absolute;
background-color: black;
width:100%;
height: 10%;

bottom: 0;
right:0;
background-color: rgba(0,0,0,0.6);
z-index:2000;
text-align: center;

`



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
  scale:1.2;
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
  const [PopupActive, setPopupActive] = useState(false)
  const [PopupText, setPopupText] = useState("")
  const [registrationActive, setRegistrationActive] = useState(false)
  const [activeUser, setActiveUser] = useState(0)
  const [userName, setUserName] = useState("")
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
    const bookIndex = user[activeUser].books.findIndex((item) => item.bookname === book);

    if (bookIndex === -1) {
      console.error(`Error: Book not found.`);
      return;
    }

    const response = await fetch(`/api/users/${user[activeUser]._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...user[activeUser],
        books: user[activeUser].books.filter((item) => item.bookname !== book),
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
        setActiveUser(user.findIndex(
          (userdata) => userdata.name === userName
        ))
        if(activeUser >=0) {
   
        const firstSetCurrentLibrary = data.filter(
          (element) => element.owner === user[activeUser].name
        );
        setCurrentBook(user[activeUser].currentBook);
        setCurrentLibrary(firstSetCurrentLibrary);
      }
    }
  }

  }, [data, user, activeUser, userName]);

  const insideLibrary = router.route.includes("/library");
  if (isLoading  || !data || !user ) {
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
   
    const formData = new FormData(event.target);
    const name = formData.get("name");
    const password = formData.get("password");
  
    // Check if the entered username is in the database (userData)
    const userExists = user && user.some((userData) => userData.name === name);
    if (!userExists) {
  
      setRegistrationActive(true)
      return ;
    }
  
    // Check if the entered password is correct for the user
    const userWithMatchingPassword = user.find(
      (userData) => userData.name === name && userData.password === password
    );
    if (!userWithMatchingPassword) {

      setPopupActive(true)
      setPopupText("INVALID PASSWORD")
  
      setTimeout(() => {
        setPopupActive(false)
      }, 1500);
      return;
    }
    const UserIndex = user.findIndex(
      (userdata) => userdata.name === name && userdata.password === password
    )
    setActiveUser(UserIndex)
    setTitleActive(true);
    setFirstLoad(false);
   setUserName(name)
  }
  async function handleRegistration(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const newName = formData.get("name");
    const newPassword = formData.get("password");
    
    try {
      // Create a new user object
      const newUser = {
        name: newName,
        books: [],
        sound: [],
        subtitle: "true",
        currentBook: " ",
        password: newPassword,
      };
  
      // Make a POST request to the server to save the new user
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });
  
      if (!response.ok) {
        console.error(`Error: ${response.status}`);
        return;
      }

      await mutate("/api/users")
      
      setTitleActive(true);
      setFirstLoad(false);
      setRegistrationActive(false)
      setUserName(newName)
      
   
    } catch (error) {
      console.error("Error creating user:", error.message);
      // Handle the error appropriately
    }
  }
  function onCancelRegistration() {

setRegistrationActive(false)
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
        userIndex={activeUser}
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
                <StyledInput required name="name" autoFocus type="text" placeholder="Name" />
                <StyledInput required name="password" type="text" placeholder="Password" />
                <RPGButton text="Submit"></RPGButton>
              </StyledForm>
              </ImageContainer>
              <DeveloperMessage>Name for testing: &quot;Testor&quot;, Password: &quot;test&quot;</DeveloperMessage>
            </LoginScreen>
            <AudioHandler level="login" />
          </>
        )}
        <PopupHandler  active={PopupActive} text={PopupText} ></PopupHandler>
        {registrationActive && <RegistrationForm onCancelRegistration={onCancelRegistration} handleRegistration={handleRegistration}/>}
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
          userIndex={activeUser}
        />
        </NavigationWrapper>
         </MediaQuery>
      </SWRConfig>
     
    </>
  );
}
