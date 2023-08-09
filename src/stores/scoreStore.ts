import { create } from "zustand";

type QuizStore = {
  currentTestScore: [number, number];
  overallTestScore: [number, number];
  updateCurrentTestScore: (isCorrect: boolean) => void;
  updateOverallTestScore: (isCorrect: boolean) => void;
  resetScores: () => void;
};

const useQuizScoreStore = create<QuizStore>((set) => ({
  currentTestScore: [0, 0],
  overallTestScore: [0, 0],

  updateCurrentTestScore: (isCorrect) => {
    set((state) => {
      const [correctAnswers, questionsAnswered] = state.currentTestScore;
      const newCorrectAnswers = isCorrect ? correctAnswers + 1 : correctAnswers;
      return {
        currentTestScore: [newCorrectAnswers, questionsAnswered + 1],
      };
    });
  },

  updateOverallTestScore: (isCorrect) => {
    set((state) => {
      const [correctAnswers, questionsAnswered] = state.overallTestScore;
      const newCorrectAnswers = isCorrect ? correctAnswers + 1 : correctAnswers;
      return {
        overallTestScore: [newCorrectAnswers, questionsAnswered + 1],
      };
    });
  },

  resetScores: () => {
    set({
      currentTestScore: [0, 0],
      overallTestScore: [0, 0],
    });
  },
}));

export { useQuizScoreStore };
