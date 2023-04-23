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
console.log(library);
export default function HomePage() {
  const [currentCard, setCurrentCard] = useState(library[0]);
  function handleNextQuestion() {
    console.log(library.length);
    const nextCard = Math.floor(Math.random() * library.length);
    setCurrentCard(library[nextCard]);
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
