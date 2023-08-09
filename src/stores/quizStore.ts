import { create } from "zustand";
import { persist } from "zustand/middleware";

import { withStorageEvents } from "./with-storage-events";

export type QuizConfig = {
  category: number;
  difficulty: string;
};

type QuizStoreState = {
  quizConfig: QuizConfig | null;
  setQuizConfig: (config: QuizConfig) => void;
};

export const useQuizStore = create<QuizStoreState>()(
  persist(
    (set) => ({
      quizConfig: null,
      setQuizConfig: (config) => {
        set({ quizConfig: config });
      },
    }),
    {
      name: "config-store",
    }
  )
);

withStorageEvents(useQuizStore);
