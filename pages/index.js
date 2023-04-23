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
  return (
    <div>
      <Question question={library[0].question} />
      <Answer answer={library[2].answer} />
    </div>
  );
}
