import { useRef } from "react";
const Answers = ({ answers, selectedAnswer, answerState, onSelect }) => {
  //manage value independently from the component lifecycle it belongs because when i click an answer the state changes and the shuffledAnswers being
  //rearranged because of component mounting again.And i do not want that.
  const shuffledAnswers = useRef();

  //I moved below whole logic after the if check because shuffledAnswers array check will fail after we have exhausted all the questions and therefore it eill crash.

  if (!shuffledAnswers.current) {
    //create new array and apply shuffle sort method in it because the initial array is built in a way that first answer is always correct
    //and i want that for later to check the answer.
    shuffledAnswers.current = [...answers];
    //in sort method, Math.random() method generates numbers from 0 to 1. So when i reduce by 0.5 i have 50% chance the result be negaative and positive.
    // so if result is negative sorts two entries(now that i don't pass arguments,more than two) from top to bottom and when is negative the opposite.
    shuffledAnswers.current.sort(() => Math.random() - 0.5);
  }
  return (
    <ul id="answers">
      {shuffledAnswers.current.map((answer) => {
        const isSelected = selectedAnswer === answer;
        let cssClass = "";
        if (answerState === "answered" && isSelected) {
          cssClass = "selected";
        }
        if (
          (answerState === "correct" || answerState === "wrong") &&
          isSelected
        ) {
          cssClass = answerState;
        }
        return (
          <li key={answer} className="answer">
            <button
              onClick={() => onSelect(answer)}
              className={cssClass}
              disabled={answerState !== ""}
            >
              {answer}
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default Answers;
