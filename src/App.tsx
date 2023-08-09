import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Quiz from "./pages/quiz";
import Result from "./pages/result";

function App() {
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </div>
  );
}

export default App;
