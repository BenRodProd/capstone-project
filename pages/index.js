import { useEffect, useState } from "react";
import Question from "@/components/Question";
import Answer from "@/components/Answer";
import AvatarStatus from "@/components/AvatarStatus";
import { enemyLibrary } from "@/library/enemyLibrary";
import EnemyAvatar from "@/components/EnemyAvatar";
import EnemyStatus from "@/components/EnemyStatus";
import LevelBackgroundImage from "@/components/LevelBackgroundImage";
import { levelLibrary } from "@/library/levelLibrary";

// ############## Dummy Data #######################
const library = [
  {
    question: "Huhn",
    answer: "chicken",
  },
  {
    question: "Gurke",
    answer: "cucumber",
  },
  {
    question: "Auto",
    answer: "car",
  },
  {
    question: "Fahrrad",
    answer: "bicycle",
  },
  {
    question: "Eine Flasche Wasser",
    answer: "a bottle of water",
  },
  {
    question:
      "Javascript array method that returns a new array iterator object that contains the key/value pairs for each index in the array.",
    answer: "entries",
  },
  {
    question:
      "Javascript array method that applies a function against an accumulator and each value of the array (from right-to-left) to reduce it to a single value.",
    answer: "reduceright",
  },
  {
    question:
      "changes the contents of an array by removing or replacing existing elements and/or adding new elements in place.",
    answer: "splice",
  },
];
const userData = {
  health: 90,
  armor: 80,
};

export default function HomePage() {
  const [currentEnemyIndex, setcurrentEnemyIndex] = useState(0);
  const [currentLevel, setCurrentLevel] = useState(levelLibrary[0]);
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const [currentEnemy, setcurrentEnemy] = useState(
    enemyLibrary[currentEnemyIndex]
  );
  const [userHealth, setUserHealth] = useState(userData.health);
  const [userArmor, setUserArmor] = useState(userData.armor);
  const [enemyHealth, setEnemyHealth] = useState(currentEnemy.health);
  const [currentCard, setCurrentCard] = useState(library[0]);

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
    } else {
      setcurrentEnemyIndex((prevEnemyIndex) => prevEnemyIndex + 1);
      setCurrentLevelIndex((prevLevelIndex) => prevLevelIndex + 1);
      if (levelLibrary[currentLevelIndex]) {
        setCurrentLevel(levelLibrary[currentLevelIndex]);
      } else {
        setCurrentLevelIndex(0);
        setCurrentLevel(levelLibrary[0]);
      }
      if (enemyLibrary[currentEnemyIndex]) {
        setcurrentEnemy(enemyLibrary[currentEnemyIndex]);
      } else {
        setcurrentEnemy(enemyLibrary[0]);
        setcurrentEnemyIndex(0);
      }
    }
  }

  function handleWrongAnswer(damage) {
    if (userArmor >= damage) {
      setUserArmor((prevUserArmor) => prevUserArmor - damage);
    } else {
      setUserHealth((prevUserHealth) => prevUserHealth - damage);
    }
  }
  return (
    <div>
      <LevelBackgroundImage level={currentLevel} />
      <Question question={currentCard.question} />
      <EnemyAvatar currentEnemy={currentEnemy} />
      <EnemyStatus enemyHealth={enemyHealth} />
      <AvatarStatus health={userHealth} armor={userArmor} />
      <Answer
        answer={currentCard.answer}
        handleNextQuestion={handleNextQuestion}
        handleWrongAnswer={handleWrongAnswer}
        handleRightAnswer={handleRightAnswer}
      />
    </div>
  );
}
