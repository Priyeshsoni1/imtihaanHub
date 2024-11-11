import { toast } from "react-hot-toast";
import { v4 } from "uuid";
import { quizData } from "../quizData/quizData"; // Import the default data

export const createQuizSlice = (set, get) => ({
  quiz: quizData, // Initialize with default data
  // authUser: null,

  setQuiz: (quiz) => {
    set(() => ({
      quiz,
    }));
  },

  // Function to add a new quiz to the list
  addQuiz: (newQuiz) => {
    const { quiz } = get();

    const quizToAdd = {
      quizId: v4(),
      ...newQuiz,
    };

    set(() => ({
      quiz: [quizToAdd, ...quiz],
    }));
    console.log("quizToAdd", quizToAdd, "quiz", quiz, "newQuiz", newQuiz);

    toast.success("Quiz added successfully!");
  },
  getQuiz: () => {
    return get().quiz;
  },
});
