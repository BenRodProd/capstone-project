import { useState } from "react";
import Question from "@/components/Question";
import Answer from "@/components/Answer";
import AvatarStatus from "@/components/AvatarStatus";

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
];
const userData = {
  health: 90,
  armor: 80,
};

export default function HomePage() {
  const [userHealth, setUserHealth] = useState(userData.health);
  const [userArmor, setUserArmor] = useState(userData.armor);

  const [currentCard, setCurrentCard] = useState(library[0]);

  function handleNextQuestion() {
    let nextCardIndex = Math.floor(Math.random() * library.length);
    while (currentCard.question === library[nextCardIndex].question) {
      nextCardIndex = Math.floor(Math.random() * library.length);
    }
    setCurrentCard(library[nextCardIndex]);
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
      <Question question={currentCard.question} />
      <AvatarStatus health={userHealth} armor={userArmor} />
      <Answer
        answer={currentCard.answer}
        handleNextQuestion={handleNextQuestion}
        handleWrongAnswer={handleWrongAnswer}
      />
    </div>
  );
}
