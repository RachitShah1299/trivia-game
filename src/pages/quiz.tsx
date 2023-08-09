import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuizStore } from "../stores/quizStore";
import QuizQuestion from "../components/QuizQuestion";
import { useQuizScoreStore } from "../stores/scoreStore";
import axios from "axios";

export type Question = {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
};

const Quiz = () => {
  const quizConfig = useQuizStore((state) => state.quizConfig);
  const currentTestScore = useQuizScoreStore((state) => state.currentTestScore);

  const updateCurrentTestScore = useQuizScoreStore(
    (state) => state.updateCurrentTestScore
  );
  const updateOverallTestScore = useQuizScoreStore(
    (state) => state.updateOverallTestScore
  );

  const [isLoading, setIsLoading] = useState(true);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const currentQuestion = questions[currentQuestionIndex];
  const navigate = useNavigate();

  useEffect(() => {
    if (quizConfig) {
      setIsLoading(true);
      const url = `https://opentdb.com/api.php?amount=10&category=${quizConfig?.category}&difficulty=${quizConfig.difficulty}&type=multiple`;

      axios
        .get(url)
        .then((response) => {
          setQuestions(response.data.results);
        })
        .catch((error) => {
          console.error("Error fetching questions:", error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [quizConfig]);

  const handleAnswerSelected = (isCorrect: boolean) => {
    updateCurrentTestScore(isCorrect);
    updateOverallTestScore(isCorrect);
    setSelectedAnswer(currentQuestionIndex);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
    } else {
      console.log("Quiz Finished");
      navigate("/result");
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (questions.length === 0) {
    return (
      <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg">
        <p className="text-center text-lg font-semibold">
          Sorry no data found for the selected category!
        </p>
        <button
          onClick={() => navigate("/")}
          className="w-full mt-4 bg-indigo-700 text-white text-lg uppercase font-semibold px-2 py-3 rounded-lg hover:bg-indigo-600 transition duration-300"
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg">
      <div className="mb-4">
        <p className="text-lg font-semibold capitalize">
          Difficulty: {currentQuestion?.difficulty}
        </p>
        <p className="text-lg font-semibold">
          Category: {currentQuestion?.category}
        </p>
      </div>
      <div className="mb-4">
        <p className="text-lg font-semibold">
          Current Test Score: {currentTestScore[0]}/{currentTestScore[1]}
        </p>
      </div>
      <QuizQuestion
        key={currentQuestion.question}
        question={currentQuestion.question}
        answers={[
          ...currentQuestion.incorrect_answers,
          currentQuestion.correct_answer,
        ]}
        correctAnswer={currentQuestion.correct_answer}
        onAnswerSelected={handleAnswerSelected}
      />
      <button
        onClick={handleNextQuestion}
        disabled={selectedAnswer === null}
        className="w-full mt-4 bg-indigo-700 text-white text-lg uppercase font-semibold py-3 rounded-lg hover:bg-indigo-600 transition duration-300"
      >
        Next
      </button>
    </div>
  );
};

export default Quiz;
