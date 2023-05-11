import { useEffect, useState } from "react";
import Question from "@/components/Question";
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
`;

const LevelBox = styled.div`
  display: flex;
  top: 0;
`;

const ScreenBox = styled.main`
  display: flex;
  position: relative;
  flex-direction: column;

  height: 100vh;
  width: 100vw;
`;
const AnswerBox = styled.div`
  align-self: flex-end;
  justify-self: flex-end;

  width: 100%;
  margin-top: auto;
`;
export default function HomePage({ library, userData, itemList, currentBook }) {
  const [currentEnemyIndex, setCurrentEnemyIndex] = useState(0);
  const [currentLevel, setCurrentLevel] = useState(levelLibrary[0]);
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const [currentEnemy, setCurrentEnemy] = useState(
    enemyLibrary[currentEnemyIndex]
  );
  const [userHealth, setUserHealth] = useState(userData[0].books[0].health);
  const [userXP, setUserXP] = useState(Number(userData[0].books[0].xp));
  const [userArmor, setUserArmor] = useState(userData[0].books[0].armor);
  const [enemyHealth, setEnemyHealth] = useState(currentEnemy.health);
  const [damageDone, setDamageDone] = useState(false);
  const [currentCard, setCurrentCard] = useState(
    library[Math.floor(Math.random() * library.length)]
  );
  const [damageDisplay, setDamageDisplay] = useState(null);

  const [inventory, setInventory] = useState(
    userData[0].books[
      userData[0].books.findIndex((element) => element.bookname === currentBook)
    ].inventory
  );
  const [inventorySlots, setInventorySlots] = useState(
    userData[0].books[0].inventorySlots
  );

  useEffect(() => {
    setEnemyHealth(currentEnemy.health);
  }, [currentEnemy]);

  function handleNextQuestion() {
    let nextCardIndex = Math.floor(Math.random() * library.length);
    while (currentCard.question === library[nextCardIndex].question) {
      nextCardIndex = Math.floor(Math.random() * library.length);
    }
    setCurrentCard(library[nextCardIndex]);
  }

  function handleRightAnswer(damage) {
    fightSound();
    if (enemyHealth > damage) {
      setEnemyHealth((prevEnemyHealth) => prevEnemyHealth - damage);
      setDamageDisplay({ x: "9rem", y: "15rem", color: "red", damage: damage });
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
    setDamageDisplay({ x: "3rem", y: "29rem", color: "red", damage: damage });
    setDamageDone(true);
    setTimeout(() => {
      setDamageDone(false);
    }, 400);
  }

  const userAvatarImage = `/assets/avatars/${
    userData[0].books[0].avatar
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
      </ScreenBox>
      <AudioHandler level={currentLevel} />
    </>
  );
}
