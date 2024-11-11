import React, { useState } from "react";
import {
  Container,
  Typography,
  Button,
  Box,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Collapse,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { css, Global } from "@emotion/react";
import { useParams } from "react-router-dom";
import { useAppState } from "../../db/db";

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
  maxWidth: "none",
}));

const QuestionBankPage = () => {
  const { questionBankId } = useParams();
  const [showAnswers, setShowAnswers] = useState({});
  const { getQuestionBank } = useAppState();
  const questionBankData = getQuestionBank();
  const questionBank = questionBankData.find(
    (bank) => bank.id === questionBankId
  );

  if (!questionBank) {
    return (
      <ContainerStyled>
        <Typography variant="h5" sx={{ color: "white", fontWeight: "bold" }}>
          Question Bank not found
        </Typography>
      </ContainerStyled>
    );
  }

  const toggleAnswer = (questionId) => {
    setShowAnswers((prev) => ({
      ...prev,
      [questionId]: !prev[questionId],
    }));
  };

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
            padding-top: 8rem;
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
          {questionBank.title}
        </Typography>
        {questionBank.questions.map((question, index) => (
          <Box
            key={question.questionId}
            sx={{
              backgroundColor: "#4A4D49FF",
              borderRadius: ".5rem",
              width: "90%",
              display: "flex",
              flexDirection: "column",
              padding: "2rem",
              justifyContent: "space-between",
              transition: "background-color 0.3s",
              "&:hover": {
                backgroundColor: "#3C5E38FF",
              },
              mb: 2,
            }}
          >
            <FormControl component="fieldset">
              <FormLabel
                sx={{
                  color: "white",
                  "&.Mui-focused": {
                    color: "white",
                  },
                  display: "flex",
                  justifyContent: "flex-start",
                }}
              >
                {`${index + 1}. ${question.questionText}`}
              </FormLabel>
              <RadioGroup>
                {question.options.map((option) => (
                  <FormControlLabel
                    key={option.optionId}
                    value={option.optionId}
                    control={<Radio sx={{ color: "white" }} />}
                    label={option.optionText}
                    sx={{ color: "white" }}
                  />
                ))}
              </RadioGroup>
            </FormControl>
            <Button
              variant="contained"
              onClick={() => toggleAnswer(question.questionId)}
              sx={{ mt: 2, backgroundColor: "#40513EFF" }}
            >
              {showAnswers[question.questionId] ? "Hide Answer" : "Show Answer"}
            </Button>
            <Collapse in={showAnswers[question.questionId]}>
              <Typography variant="body1" sx={{ color: "white", mt: 2 }}>
                Correct Answer:{" "}
                {question.options.find((option) => option.isCorrect).optionText}
              </Typography>
            </Collapse>
          </Box>
        ))}
      </ContainerStyled>
    </>
  );
};

export default QuestionBankPage;
