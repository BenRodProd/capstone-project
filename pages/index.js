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

// ############## Dummy Data #######################
const library = [
  {
    question: "translate to english: Huhn",
    answer: "chicken",
  },
  {
    question: "translate to english: Gurke",
    answer: "cucumber",
  },
  {
    question: "translate to english: Auto",
    answer: "car",
  },
  {
    question: "translate to english: Fahrrad",
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
      "Javascript array method that changes the contents of an array by removing or replacing existing elements and/or adding new elements in place.",
    answer: "splice",
  },
  {
    question: "What is a group of flamingos called?",
    answer: "flamboyance",
  },
  {
    question: "What is the nests of flamingos made of?",
    answer: "mud",
  },
  {
    question: "How large (in cm) can the largest flamingos in the world grow?",
    answer: "187",
  },
  {
    question: "how many eggs do flamingos lay in a year?",
    answer: "one",
  },
];
const userData = {
  health: 90,
  armor: 80,
  avatar: {
    knight: 1,
    dragon: 0,
    wizard: 0,
    thieve: 0,
  },
  chosenAvatar: "knight",
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
  const [currentUserAvatarImage, setcurrentUserAvatarImage] = useState(
    "/assets/avatars/" + userData.chosenAvatar + userData.avatar.knight + ".png"
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
      <UserAvatar imageSrc={currentUserAvatarImage} />
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
