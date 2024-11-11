import { toast } from "react-hot-toast";
import { v4 } from "uuid";
import { questionBankData } from "../questionBankData/questionBankData"; // Import the default data

export const createQuestionBankSlice = (set, get) => ({
  questionBank: questionBankData, // Initialize with default data
  // authUser: null,

  setQuestionBank: (questionBank) => {
    set(() => ({
      questionBank,
    }));
  },

  // Function to add a new quiz to the list
  addQuestionBank: (newQuiz) => {
    const { questionBank } = get();

    const quizToAdd = {
      quizId: v4(),
      ...newQuiz,
    };

    set(() => ({
      questionBank: [quizToAdd, ...questionBank],
    }));
    console.log(
      "quizToAdd",
      quizToAdd,
      "questionBank",
      questionBank,
      "newQuiz",
      newQuiz
    );

    toast.success("Quiz added successfully!");
  },
  getQuestionBank: () => {
    return get().questionBank;
  },
});
