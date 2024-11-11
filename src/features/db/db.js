import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createAuthSlice } from "../auth/store/createAuthSlice";
import { createQuestionBankSlice } from "../questionBank/store/createQuestionBankSlice";
import { createQuizSlice } from "../quiz/store/createQuizSlice";
// import { createPetsSlice } from "./createPetsSlice";

export const useAppDb = create(
  persist(
    (...args) => ({
      //   ...createPetsSlice(...args),
      ...createAuthSlice(...args),
      ...createQuestionBankSlice(...args),
      ...createQuizSlice(...args),
    }),
    {
      name: "imhtihaan_hub_db",
    }
  )
);

export const useAppState = () => useAppDb((state) => state);
