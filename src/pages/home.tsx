import React from "react";
import { useNavigate } from "react-router-dom";
import QuizForm from "../components/QuizForm";
import { QuizConfig, useQuizStore } from "../stores/quizStore";

const Home = () => {
  const setQuizConfig = useQuizStore((state) => state.setQuizConfig);
  const navigate = useNavigate();

  const handleQuizStart = (formData: QuizConfig) => {
    console.log("Quiz configuration submitted:", formData);
    setQuizConfig(formData);
    navigate("/quiz");
  };

  return (
    <div className="max-w-md mx-auto px-6 py-6 bg-indigo-700 shadow-lg shadow-indigo-300 rounded-xl">
      <h2 className="text-2xl text-white font-semibold mb-4">
        Welcome to the Quiz App!
      </h2>
      <p className="pb-10 text-white">
        Ready to challenge your knowledge? Fill out the below-given form to
        start the quiz.
      </p>
      <QuizForm onSubmit={handleQuizStart} />
    </div>
  );
};

export default Home;
