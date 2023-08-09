import React, { useState } from "react";
import { cn } from "../utils";

type QuizQuestionProps = {
  question: string;
  answers: string[];
  correctAnswer: string;
  onAnswerSelected: (isCorrect: boolean) => void;
};

const QuizQuestion = ({
  question,
  answers,
  correctAnswer,
  onAnswerSelected,
}: QuizQuestionProps) => {
  const [checkAnswer, setCheckAnswer] = useState<string | null>();
  const [allDisabled, setAllDisabled] = useState(false);

  const handleAnswerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedAnswer = event.target.value;
    setCheckAnswer(selectedAnswer);
    setAllDisabled(true);
    onAnswerSelected(selectedAnswer === correctAnswer);
  };

  return (
    <div className="p-4 border rounded-lg shadow-md bg-white mb-4">
      <h3 className="text-lg font-semibold mb-2">{question}</h3>
      <ul className="space-y-2">
        {answers.map((answer, index) => (
          <li key={index} className="cursor-pointer p-2 rounded-md">
            <label
              className={cn("block w-full p-2 rounded-md", {
                "bg-red-600 text-white":
                  checkAnswer &&
                  checkAnswer === answer &&
                  checkAnswer !== correctAnswer,
                "bg-green-500 text-white":
                  (checkAnswer &&
                    checkAnswer === answer &&
                    checkAnswer === correctAnswer) ||
                  (checkAnswer &&
                    checkAnswer !== answer &&
                    answer === correctAnswer),
                "bg-gray-200 text-black":
                  !checkAnswer ||
                  (checkAnswer !== answer &&
                    checkAnswer !== correctAnswer &&
                    answer !== correctAnswer),
              })}
            >
              <input
                type="radio"
                value={answer}
                checked={checkAnswer === answer}
                onChange={handleAnswerChange}
                disabled={allDisabled}
                className="mr-2"
              />
              {answer}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuizQuestion;
