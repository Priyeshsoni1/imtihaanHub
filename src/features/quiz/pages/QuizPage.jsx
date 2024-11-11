import React, { useState, useEffect } from "react";
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
  TextField,
  Chip,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import { quizData } from "../quizData/quizData";
import { styled } from "@mui/material/styles";
import { css, Global } from "@emotion/react";
import { instructionData } from "../quizData/instruction";
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
  maxWidth: "none", // Ensure the container is not constrained by its default max-width
}));

const CustomRadio = styled(Radio)(({ theme }) => ({
  color: "white",
  "&.Mui-checked": {
    color: "white",
  },
}));

const Spacing = styled(Box)(({ theme }) => ({
  height: theme.spacing(2), // Adjust the spacing value as needed
}));

const QuizPage = () => {
  const { quizId } = useParams();
  const { getQuiz } = useAppState();
  const quizData = getQuiz();
  const quizDataForId = quizData.find((item) => {
    console.log(item, "quizDataForId");
    return item.quizId == quizId ? item : null;
  });
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(quizDataForId.duration * 60);
  const [answers, setAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          handleSubmit(true); // Force submit when time is up
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (timeLeft === 600) toast.warning("10 minutes left!");
    if (timeLeft === 300) toast.warning("5 minutes left!");
  }, [timeLeft]);

  const handleChange = (questionId, value) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleSubmit = (forceSubmit = false) => {
    if (!forceSubmit && !allQuestionsAnswered()) {
      toast.error("Please answer all questions before submitting.");
      return;
    }
    setIsSubmitted(true);
    console.log(answers, "answers");
    navigate(`/quiz/${quizId}/result`, { state: { answers } });
  };

  const allQuestionsAnswered = () => {
    return QuestionArray.every((question) => answers[question.questionId]);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  const QuestionArray = quizDataForId?.questions;
  console.log(QuestionArray, "array data");

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
          {quizDataForId.title}
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "flex-start",
            width: "100%",
          }}
        >
          <Typography
            variant="h6"
            gutterBottom
            sx={{
              fontWeight: "bold",
              textAlign: "right",
              fontSize: "1rem",
            }}
          >
            Time Left: {formatTime(timeLeft)}
          </Typography>
        </Box>
        {QuestionArray.map((question, index) => (
          <Box
            sx={{
              backgroundColor: "#4A4D49FF",
              borderRadius: ".5rem",
              width: "90%",
              display: "flex",
              padding: "2rem",
              justifyContent: "space-between",
              transition: "background-color 0.3s",
              "&:hover": {
                backgroundColor: "#3C5E38FF",
              },
              mb: 2,
            }}
            key={question.questionId}
          >
            <Box sx={{ display: "flex", flex: "0.9" }}>
              <FormControl component="fieldset">
                <FormLabel
                  sx={{
                    color: "white",
                    "&.Mui-focused": {
                      color: "white",
                    },
                  }}
                >
                  {`${index + 1}. ${question.questionText}`}
                </FormLabel>

                {question.questionType === "MCQ" && (
                  <RadioGroup
                    sx={{ color: "white", borderColor: "white" }}
                    value={answers[question.questionId] || ""}
                    onChange={(e) =>
                      handleChange(question.questionId, e.target.value)
                    }
                  >
                    {question?.options?.map((option) => (
                      <FormControlLabel
                        color="white"
                        key={option.optionId}
                        value={option.optionId}
                        control={<CustomRadio />}
                        label={option.optionText}
                      />
                    ))}
                  </RadioGroup>
                )}
                {question.questionType === "True/False" && (
                  <RadioGroup
                    value={answers[question.questionId] || ""}
                    onChange={(e) =>
                      handleChange(question.questionId, e.target.value)
                    }
                  >
                    <FormControlLabel
                      value="true"
                      control={<CustomRadio />}
                      label="True"
                    />
                    <FormControlLabel
                      value="false"
                      control={<CustomRadio />}
                      label="False"
                    />
                  </RadioGroup>
                )}
                {question.questionType === "Short Answer" && (
                  <>
                    <Spacing />
                    <TextField
                      variant="outlined"
                      fullWidth
                      value={answers[question.questionId] || ""}
                      onChange={(e) =>
                        handleChange(question.questionId, e.target.value)
                      }
                      placeholder="Type your answer here"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: "white",
                          },
                          width: "100%",
                          "&:hover fieldset": {
                            borderColor: "white",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "white",
                          },
                        },
                        "& .MuiInputBase-input": {
                          color: "white",
                        },
                        "& .MuiInputLabel-root": {
                          color: "white",
                        },
                        "& .MuiInputLabel-root.Mui-focused": {
                          color: "white",
                        },
                        "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                          {
                            borderColor: "white",
                          },
                        "& .MuiOutlinedInput-input::placeholder": {
                          color: "white",
                          opacity: 1,
                        },
                      }}
                    />
                  </>
                )}
              </FormControl>
            </Box>
            <Box
              sx={{ display: "flex", flex: "0.1", alignItems: "flex-start" }}
            >
              <Chip
                label={question.difficulty}
                sx={{
                  backgroundColor: "#599052FF",
                  color: "white",
                  fontWeight: "bold",
                  fontSize: "1rem",
                }}
              />
            </Box>
          </Box>
        ))}
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleSubmit(false)}
          disabled={isSubmitted}
        >
          Submit
        </Button>
        <Toaster />
      </ContainerStyled>
    </>
  );
};

export default QuizPage;
