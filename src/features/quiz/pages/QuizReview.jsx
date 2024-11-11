import React from "react";
import {
  Container,
  Typography,
  Box,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@mui/material";
import { useLocation, useParams } from "react-router-dom";
import { quizData } from "../quizData/quizData";
import { styled } from "@mui/material/styles";
import { css, Global } from "@emotion/react";

const ContainerStyled = styled(Container)(({ theme }) => ({
  height: "100%",
  width: "100vw",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#2d3d2bff",
  paddingTop: "6rem",
  margin: 0,
  maxWidth: "none", // Ensure the container is not constrained by its default max-width
}));

const CustomRadio = styled(Radio)(({ theme, markRed = false }) => ({
  color: markRed ? "red" : "white",

  "&.Mui-checked": {
    color: markRed ? "red" : "white",
  },
}));

const ReviewPage = () => {
  const { quizId } = useParams();
  const location = useLocation();
  const { answers } = location.state;

  const QuestionArray = quizData[0]?.questions;

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
          variant="h5"
          gutterBottom
          sx={{ color: "white", fontWeight: "bold" }}
        >
          {quizData[0].title} - Review
        </Typography>
        {QuestionArray.map((question, index) => (
          <Box
            sx={{
              backgroundColor: "#4A4D49FF",
              borderRadius: ".5rem",
              width: "90%",
              display: "flex",
              padding: "2rem",
              justifyContent: "flex-start",
              transition: "background-color 0.3s",
              "&:hover": {
                backgroundColor: "#3C5E38FF",
              },
              mb: 2,
            }}
            key={question.questionId}
          >
            <FormControl component="fieldset">
              <FormLabel
                sx={{
                  color: "white",
                  "&.Mui-focused": {
                    color: "white",
                  },
                  alignItems: "start",
                  display: "flex",
                  justifyContent: "flex-start",
                }}
              >
                {`${index + 1}. ${question.questionText}`}
              </FormLabel>
              {question.questionType === "MCQ" && (
                <RadioGroup
                  sx={{ color: "white", borderColor: "white" }}
                  value={answers[question.questionId] || ""}
                >
                  {question?.options?.map((option) => {
                    const isUserAnswer =
                      answers[question.questionId] === option.optionId;
                    const isCorrect = option.isCorrect;
                    return (
                      <FormControlLabel
                        key={option.optionId}
                        value={option.optionId}
                        control={
                          <CustomRadio markRed={isUserAnswer && !isCorrect} />
                        }
                        label={`${option.optionText} ${
                          isCorrect ? "(Correct)" : ""
                        }`}
                        disabled
                      />
                    );
                  })}
                </RadioGroup>
              )}
              {question.questionType === "True/False" && (
                <RadioGroup value={answers[question.questionId] || ""}>
                  <FormControlLabel
                    value="true"
                    control={
                      <CustomRadio
                        markRed={
                          answers[question.questionId] === "true" &&
                          question.correctAnswer !== true
                        }
                      />
                    }
                    label={`True ${
                      question.correctAnswer === true ? "(Correct)" : ""
                    }`}
                    disabled
                  />
                  <FormControlLabel
                    value="false"
                    control={
                      <CustomRadio
                        markRed={
                          answers[question.questionId] === "false" &&
                          question.correctAnswer !== false
                        }
                      />
                    }
                    label={`False ${
                      question.correctAnswer === false ? "(Correct)" : ""
                    }`}
                    disabled
                  />
                </RadioGroup>
              )}
              {question.questionType === "Short Answer" && (
                <Typography
                  sx={{
                    color: "white",
                    mt: 2,
                    display: "flex",
                    justifyContent: "flex-start",
                  }}
                >
                  <br />
                  Your Answer: {answers[question.questionId] || "No Answer"}
                  <br />
                  Correct Answer: {question.correctAnswer}
                </Typography>
              )}
            </FormControl>
          </Box>
        ))}
      </ContainerStyled>
    </>
  );
};

export default ReviewPage;
