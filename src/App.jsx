import { Routes, Route } from "react-router-dom";
import "./App.css";
import AppHeader from "./components/AppHeader/AppHeader";
import LandingPage from "./features/landingPage/pages/LandingPage";
import LoginForm from "./features/auth/login/pages/LoginForm";
import RegisterForm from "./features/auth/register/pages/RegisterForm";

import Students from "./features/student/pages/Students";
import Instructors from "./features/instructor/pages/Instructors";
import QuizzesMenu from "./features/quiz/pages/QuizzesMenu";
import QuizInstructions from "./features/quiz/pages/QuizInstructions";
import QuizPage from "./features/quiz/pages/QuizPage";
import QuizResult from "./features/quiz/pages/QuizResult";
import ReviewPage from "./features/quiz/pages/QuizReview";
import QuestionBankPage from "./features/questionBank/pages/QuestionBankPage";
import QuestionBankMenu from "./features/questionBank/pages/QuestionBankMenu";
import AddQuestionBank from "./features/questionBank/pages/AddQuestionBank";
import AddQuiz from "./features/quiz/pages/AddQuiz";

// import Contact from "./features/contact/pages/Contact";

function App() {
  return (
    <div>
      <AppHeader />
      <Routes>
        {/* <Route path="/" element={<LandingPage />} /> */}
        <Route path="/questionbank" element={<QuestionBankMenu />} />
        <Route
          path="/questionbank/:questionBankId"
          element={<QuestionBankPage />}
        />
        <Route path="/quiz" element={<QuizzesMenu />} />
        <Route
          path="/quiz/:quizId/instructions"
          element={<QuizInstructions />}
        />
        <Route path="/quiz/:quizId/start" element={<QuizPage />} />
        <Route path="/quiz/:quizId/result" element={<QuizResult />} />
        <Route path="/quiz/:quizId/review" element={<ReviewPage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/instructors" element={<Instructors />} />
        <Route path="/students" element={<Students />} />
        <Route path="/questionbank" element={<QuestionBankPage />} />
        <Route path="/addQuestionBank" element={<AddQuestionBank />} />
        <Route path="/addQuiz" element={<AddQuiz />} />

        {/* <Route path="/quiz" element={<Quiz />} /> */}
        {/* <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} /> */}
      </Routes>
    </div>
  );
}

export default App;
