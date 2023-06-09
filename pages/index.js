import { useEffect, useState } from "react";
import Image from "next/image";
import Question from "@/components/Question";
import useSWRMutation from "swr/mutation";
import { mutate } from "swr";
import Answer from "@/components/Answer";
import AvatarStatus from "@/components/AvatarStatus";
import { enemyLibrary } from "@/library/enemyLibrary";
import EnemyAvatar from "@/components/EnemyAvatar";
import EnemyStatus from "@/components/EnemyStatus";
import LevelBackgroundImage from "@/components/LevelBackgroundImage";
import { levelLibrary } from "@/library/levelLibrary";
import UserAvatar from "@/components/UserAvatar";
import ShowDamage from "@/components/ShowDamage";
import Pouch from "@/components/Pouch";
import AudioHandler from "@/components/AudioHandler";
import styled from "styled-components";
import { fightSound, hurtSound } from "@/components/soundHandler";
import RPGButton from "@/components/Button";
import { storyLibrary } from "@/library/storyLibrary";


const EnemyBox = styled.div`
  display: flex;
  position: absolute;
  width: 100%;

  top: 38vh;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
`;
const BackgroundAndEnemy = styled.div`
  position: relative;
  width: 100%;
  height: 80%;
`;

const LevelBox = styled.div`
  display: flex;
  position: relative;
  top: 0;
z-index:100;
  
  margin-bottom: 1rem;
`;

const ScreenBox = styled.main`
  display: flex;
  position: relative;
  flex-direction: column;

  height: 100%;
  width: 100%;
`;
const AnswerBox = styled.div`
position: relative;
height: 100%;
  align-self: flex-end;
  justify-self: flex-end;

  width: 100%;
  margin-top: auto;
  margin-bottom: 0;
`;
const DeathPopUp = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom:0;
  align-items: center;
  width: 100%;
  height: 112%;
  background-color: black;
  z-index: 103;
  text-align: center;
 
`;
const DeathWrapper = styled.div`
  display: flex;

  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 104;
  background-color: black;
`;
const DeathBorder = styled.div`
position:relative;
z-index:105;
  border: 20px solid transparent;
  border-image: url("/assets/border.png") 30% stretch;
  background-color: rgba(0, 0, 0, 0.8);
`;
const DeathImage = styled(Image)`
  position: absolute;
  object-fit: contain;
  width: 100%;
  height: 100%;
  z-index: 105;
  
`;
const DeathRestartButton = styled.div`
position:relative;
z-index:107;
`

const StoryPopup = styled.div`
display: flex;
flex-direction: column;
left:0;
top:0;
position: absolute;
width: 100%;
height: 112%;
text-align: center;
align-items: center;
justify-content: center;

background-color: rgba(0, 0, 0, 0.95);
border: 20px solid transparent;
  border-image: url("/assets/border.png") 30% stretch;
z-index:150;
padding: 2rem;
font-size: larger;
`
const StoryText = styled.p`
color: yellow;
text-align: center;
`

const GameOverText = styled.h1`
position:relative;
  text-shadow: #fc0 1px 0 10px;
  z-index:106;
`;

async function sendRequest(url, { arg }) {
  // here we set the request method
  const response = await fetch(url, {
    method: "PUT",
    body: JSON.stringify(arg),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    //console.error(`Error: ${response.status}`);
  }
}

export default function HomePage({
  library,
  userData,
  itemList,
  currentBook,
  userIndex
}) {
 
  const userBookIndex = userData[userIndex].books.findIndex(
    (element) => element.bookname === currentBook
  );
  const [currentLibrary, setCurrentLibrary] = useState(library.filter(item => item.owner === userData[userIndex].name && item.book === currentBook));
  const [currentEnemyIndex, setCurrentEnemyIndex] = useState(0);
  const [currentLevel, setCurrentLevel] = useState(levelLibrary[0]);
  const [currentStage, setCurrentStage] = useState(1);
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const [currentEnemy, setCurrentEnemy] = useState(
    enemyLibrary[currentEnemyIndex]
  );

  const [userHealth, setUserHealth] = useState(
    userData[userIndex].books[userBookIndex].health
  );
  const [userXP, setUserXP] = useState(
    Number(userData[userIndex].books[userBookIndex].xp)
  );
  const [userArmor, setUserArmor] = useState(
    userData[userIndex].books[userBookIndex].armor
  );
  const [enemyHealth, setEnemyHealth] = useState(currentEnemy.health);
  const [damageDone, setDamageDone] = useState(false);
  const [currentCard, setCurrentCard] = useState(
    currentLibrary[0]
  );
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [damageDisplay, setDamageDisplay] = useState(null);

  const [inventory, setInventory] = useState(
    userData[userIndex].books[userBookIndex].inventory
  );
  const [inventorySlots, setInventorySlots] = useState(
    userData[userIndex].books[userBookIndex].inventorySlots
  );
  const [deadActive, setDeadActive] = useState(false);
  const [storyPopup, setStoryPopup] = useState(false);
  const [id, setId] = useState(currentCard._id)
const [currentStoryText, setCurrentStoryText] = useState(storyLibrary[""]);
const { trigger } = useSWRMutation(`/api/library/${id}`, sendRequest);
  useEffect(() => {
 
    setEnemyHealth(((currentLibrary[currentCardIndex].answer.length*10)+(currentLibrary[currentCardIndex+1].answer.length*10))-10);
   
   
 
  }, [currentEnemy]);

useEffect(() => {
  const levelAndStage = currentLevel.level.toString()+ currentLevel.stage.toString()
  const story = storyLibrary.find((item) => item.hasOwnProperty(levelAndStage))
  
  
  setCurrentStoryText(story[levelAndStage].text)
  setStoryPopup(true)
 
}, [currentLevel])
useEffect (() => {
  setId(currentCard._id)
}, [currentCard])


  function handleNextQuestion() {
    saveRightAnswer()
    let nextCardIndex = currentCardIndex+1;
    if(!currentLibrary[nextCardIndex].answer || !currentLibrary[nextCardIndex+1].answer) {
      // ################ No Card anymore #############
      nextCardIndex = 0
    }
    setCurrentCard(currentLibrary[nextCardIndex]);
    setCurrentCardIndex(nextCardIndex);
    
  }

async function saveRightAnswer() {
  const newRight = Number(currentCard.right)+1
  await trigger({
 
    right: newRight,
  
  });
  await mutate("/api/library");
}

  function handleRightAnswer(damage) {
    fightSound();
    if (enemyHealth > damage) {
      setEnemyHealth((prevEnemyHealth) => prevEnemyHealth - damage);
      setDamageDisplay({ x: "50%", y: "55%", color: "red", damage: damage });
      setDamageDone(true);
      setTimeout(() => {
        setDamageDone(false);
      }, 400);
    } else {
      setUserXP((prevXP) => Number(prevXP) + Number(currentEnemy.xp));

      setCurrentEnemyIndex((prevEnemyIndex) => prevEnemyIndex + 1);
      setCurrentLevelIndex((prevLevelIndex) => prevLevelIndex + 1);

      if (levelLibrary[currentLevelIndex]) {
        setCurrentLevel(levelLibrary[currentLevelIndex]);
      } else {
        setCurrentLevelIndex(0);
        setCurrentLevel(levelLibrary[0]);
      }
      if (enemyLibrary[currentEnemyIndex]) {
        setCurrentEnemy(enemyLibrary[currentEnemyIndex]);
      } else {
        setCurrentEnemy(enemyLibrary[0]);
        setCurrentEnemyIndex(0);
      }
    }
  }

  function handleWrongAnswer(damage) {
    fightSound();
    hurtSound();
    if (userArmor >= damage) {
      setUserArmor((prevUserArmor) => prevUserArmor - damage);
    } else {
      setUserHealth((prevUserHealth) => prevUserHealth - damage);
    }
    setDamageDisplay({ x: "3rem", y: "80%", color: "red", damage: damage });
    setDamageDone(true);
    setTimeout(() => {
      setDamageDone(false);
    }, 400);
    if (userHealth <= 0) {
      setDeadActive(true);
    }
  }
  function handleRestart(event) {
    event.preventDefault();
    setCurrentLevel(levelLibrary[0]);
    setUserHealth(userData[userIndex].books[userBookIndex].health);
    setUserArmor(userData[userIndex].books[userBookIndex].armor);
    setCurrentEnemy(enemyLibrary[0]);
    handleNextQuestion();
    setDeadActive(false);
  }

  const userAvatarImage = `/assets/avatars/${
    userData[userIndex].books[0].avatar
  }${Math.floor(Number(userXP) / 500)}.png`;
  const userLevel = Math.floor(Number(userXP) / 500);

  if (userHealth > 150) {
    setUserHealth(150);
  }
  if (userArmor > 150) {
    setUserArmor(150);
  }

  return (
    <>
      <ScreenBox>
        <BackgroundAndEnemy>
          <LevelBackgroundImage level={currentLevel} />
          <EnemyBox>
            <EnemyAvatar currentEnemy={currentEnemy} />
            <EnemyStatus enemyHealth={enemyHealth} />
          </EnemyBox>

          <Question question={currentCard.question} />
        </BackgroundAndEnemy>

        <LevelBox>
          <Pouch
            setUserHealth={setUserHealth}
            setUserArmor={setUserArmor}
            inventory={inventory}
            inventorySlots={inventorySlots}
            setInventory={setInventory}
            itemList={itemList}
          />
          <UserAvatar
            imageSrc={userAvatarImage}
            userXP={userXP}
            level={userLevel}
          />
          <AvatarStatus
            health={userHealth}
            armor={userArmor}
            level={userLevel}
          />
        </LevelBox>
        <AnswerBox>
          <Answer
            answer={currentCard.answer}
            handleNextQuestion={handleNextQuestion}
            handleWrongAnswer={handleWrongAnswer}
            handleRightAnswer={handleRightAnswer}
          />
        </AnswerBox>

        {damageDone && (
          <ShowDamage
            x={damageDisplay.x}
            y={damageDisplay.y}
            color={damageDisplay.color}
            damage={damageDisplay.damage}
          />
        )}
        {deadActive && (
          <>
            <DeathPopUp>
              <DeathWrapper>
                <DeathImage
                  src="/assets/gameover.png"
                  width="1080"
                  height="1920"
                  alt="gameover"
                />
                <DeathBorder>

                  <GameOverText>GAME OVER</GameOverText>
                  <form onSubmit={handleRestart}>
                    <DeathRestartButton>
                    <RPGButton text="Restart"></RPGButton>
                    </DeathRestartButton>
                  </form>
                </DeathBorder>
              </DeathWrapper>
            </DeathPopUp>
          </>
        )}
        {storyPopup && 
        <>
        <StoryPopup>
          <StoryText>{currentStoryText}</StoryText>
          <button type ="button" onClick = {() => setStoryPopup(false)}>SKIP</button>
        </StoryPopup>
      </>  
      }
      </ScreenBox>
      <AudioHandler level={currentLevel} />
    </>
  );
}
