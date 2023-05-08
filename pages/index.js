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
export default function HomePage({ library, userData, itemList, currentBook }) {
  const [currentEnemyIndex, setCurrentEnemyIndex] = useState(0);
  const [currentLevel, setCurrentLevel] = useState(levelLibrary[0]);
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const [currentEnemy, setCurrentEnemy] = useState(
    enemyLibrary[currentEnemyIndex]
  );
  const [userHealth, setUserHealth] = useState(userData[0].books[0].health);
  const [userXP, setUserXP] = useState(userData[0].books[0].xp);
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
    if (enemyHealth > damage) {
      setEnemyHealth((prevEnemyHealth) => prevEnemyHealth - damage);
      setDamageDisplay({ x: "9rem", y: "15rem", color: "red", damage: damage });
      setDamageDone(true);
      setTimeout(() => {
        setDamageDone(false);
      }, 400);
    } else {
      setUserXP((prevXP) => prevXP + currentEnemy.xp);

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
  }${Math.floor(userXP / 500)}.png`;
  const userLevel = Math.floor(userXP / 500);
  if (userHealth > 150) {
    setUserHealth(150);
  }
  if (userArmor > 150) {
    setUserArmor(150);
  }

  return (
    <div>
      <LevelBackgroundImage level={currentLevel} />
      <Question question={currentCard.question} />
      <EnemyAvatar currentEnemy={currentEnemy} />
      <EnemyStatus enemyHealth={enemyHealth} />
      <UserAvatar
        imageSrc={userAvatarImage}
        userXP={userXP}
        level={userLevel}
      />
      <AvatarStatus health={userHealth} armor={userArmor} level={userLevel} />
      <Answer
        answer={currentCard.answer}
        handleNextQuestion={handleNextQuestion}
        handleWrongAnswer={handleWrongAnswer}
        handleRightAnswer={handleRightAnswer}
      />
      <Pouch
        setUserHealth={setUserHealth}
        setUserArmor={setUserArmor}
        inventory={inventory}
        inventorySlots={inventorySlots}
        setInventory={setInventory}
        itemList={itemList}
      />
      {damageDone ? (
        <ShowDamage
          x={damageDisplay.x}
          y={damageDisplay.y}
          color={damageDisplay.color}
          damage={damageDisplay.damage}
        />
      ) : null}
    </div>
  );
}
