import Question from "@/components/Question";
import Answer from "@/components/Answer";
const library = [
  {
    question: "Wie lautet die Übersetzung für Huhn",
    answer: "chicken",
    category: "food",
    benefit: "health",
  },
];
console.log(library);
export default function HomePage() {
  return (
    <div>
      <Question question={library[0].question} />
      <Answer answer={library[0].answer} />
    </div>
  );
}
