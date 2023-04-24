import { useState } from "react";
import Question from "@/components/Question";
import Answer from "@/components/Answer";
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

export default function HomePage() {
  const [currentCard, setCurrentCard] = useState(library[0]);
  function handleNextQuestion() {
    let nextCardIndex = Math.floor(Math.random() * library.length);
    while (currentCard.question === library[nextCardIndex].question) {
      nextCardIndex = Math.floor(Math.random() * library.length);
    }
    setCurrentCard(library[nextCardIndex]);
  }
  return (
    <div>
      <Question question={currentCard.question} />
      <Answer
        answer={currentCard.answer}
        handleNextQuestion={handleNextQuestion}
      />
    </div>
  );
}
