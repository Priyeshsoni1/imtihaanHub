import React, { useState, useEffect } from "react";
import { Container, Typography, Button } from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { quizData } from "../quizData/quizData";
import { css, Global } from "@emotion/react";
import { styled } from "@mui/material/styles";
const QuizResult = () => {
  const { quizId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { answers } = location.state;
  const [totalMarks, setTotalMarks] = useState(0);
  const ContainerStyled = styled(Container)(({ theme }) => ({
    height: "100%",
    width: "100vw",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2D3D2BFF",
    padding: 0,
    margin: 0,
    paddingTop: "8rem",
    maxWidth: "none", // Ensure the container is not constrained by its default max-width
  }));
  useEffect(() => {
    const calculateResult = () => {
      let totalMarks = 0;
      quizData[0].questions.forEach((question) => {
        const userAnswer = answers[question.questionId];
        if (question.questionType === "MCQ") {
          const correctOption = question?.options?.find(
            (option) => option.isCorrect
          )?.optionId;
          if (correctOption && userAnswer === correctOption) {
            totalMarks += 1; // Assuming each question carries 10 marks
          }
        } else if (question.questionType === "True/False") {
          const correctAnswer = question?.correctAnswer;
          if (correctAnswer && userAnswer === correctAnswer) {
            totalMarks += 2; // Assuming each question carries 10 marks
          }
        }
      });
      setTotalMarks(totalMarks);
    };

    calculateResult();
  }, [answers]);

  const isPass = totalMarks >= quizData[0].totalMarks * 0.5;

  return (
    <>
      <Global
        styles={css`
          html,
          body,
          #root {
            margin: 0;
            padding: 0;
            height: "100vh";
            width: 100%;
          }
          body {
            display: flex;
            justify-content: center;
            paddingtop: 8rem;
            align-items: center;
            height: "100vh";
            width: 100%;
            background-color: #2d3d2bff;
          }
        `}
      />
      <ContainerStyled>
        <Typography
          variant="h4"
          gutterBottom
          sx={{ color: "white", fontWeight: "bold" }}
        >
          Quiz Result
        </Typography>

        <Typography variant="body1" gutterBottom>
          Obtained Marks: {totalMarks} / {quizData[0].totalMarks}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Result: {isPass ? "Pass" : "Fail"}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() =>
            navigate(`/quiz/${quizId}/review`, { state: { answers } })
          }
        >
          Review
        </Button>
      </ContainerStyled>
    </>
  );
};

export default QuizResult;
