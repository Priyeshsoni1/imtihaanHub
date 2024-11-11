import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { toast, Toaster } from "react-hot-toast";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useAppState } from "../../db/db";

const ContainerStyled = styled(Container)(({ theme }) => ({
  height: "100vh",
  width: "100vw",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#2D3D2BFF",
  padding: "2rem",
  margin: 0,
  maxWidth: "none", // Ensure the container is not constrained by its default max-width
}));

const AddQuestionBank = () => {
  const { addQuestionBank } = useAppState();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState({
    questionType: "MCQ",
    questionText: "",
    options: [
      { optionId: uuidv4(), optionText: "", isCorrect: false },
      { optionId: uuidv4(), optionText: "", isCorrect: false },
      { optionId: uuidv4(), optionText: "", isCorrect: false },
      { optionId: uuidv4(), optionText: "", isCorrect: false },
    ],
  });

  const handleQuestionTypeChange = (e) => {
    const newQuestionType = e.target.value;
    setCurrentQuestion((prev) => ({
      ...prev,
      questionType: newQuestionType,
      options:
        newQuestionType === "MCQ"
          ? [
              { optionId: uuidv4(), optionText: "", isCorrect: false },
              { optionId: uuidv4(), optionText: "", isCorrect: false },
              { optionId: uuidv4(), optionText: "", isCorrect: false },
              { optionId: uuidv4(), optionText: "", isCorrect: false },
            ]
          : [
              { optionId: uuidv4(), optionText: "True", isCorrect: false },
              { optionId: uuidv4(), optionText: "False", isCorrect: false },
            ],
    }));
  };

  const handleOptionChange = (index, field, value) => {
    const newOptions = currentQuestion.options.map((option, i) =>
      i === index ? { ...option, [field]: value } : option
    );
    setCurrentQuestion((prev) => ({ ...prev, options: newOptions }));
  };

  const handleMarkCorrect = (index) => {
    const newOptions = currentQuestion.options.map((option, i) => ({
      ...option,
      isCorrect: i === index,
    }));
    setCurrentQuestion((prev) => ({ ...prev, options: newOptions }));
  };

  const handleAddQuestion = () => {
    if (!currentQuestion.questionText) {
      toast.error("Question text is required");
      return;
    }

    if (!currentQuestion.options.some((option) => option.isCorrect)) {
      toast.error("At least one option must be marked as correct");
      return;
    }

    setQuestions((prev) => [
      ...prev,
      { ...currentQuestion, questionId: uuidv4() },
    ]);
    setCurrentQuestion({
      questionType: "MCQ",
      questionText: "",
      options: [
        { optionId: uuidv4(), optionText: "", isCorrect: false },
        { optionId: uuidv4(), optionText: "", isCorrect: false },
        { optionId: uuidv4(), optionText: "", isCorrect: false },
        { optionId: uuidv4(), optionText: "", isCorrect: false },
      ],
    });
    toast.success("Question added successfully");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title) {
      toast.error("Title is required");
      return;
    }

    if (!description) {
      toast.error("Description is required");
      return;
    }

    if (questions.length === 0) {
      toast.error("At least one question must be added");
      return;
    }

    const newQuestionBank = {
      id: uuidv4(),
      title,
      description,
      questions,
    };

    addQuestionBank(newQuestionBank);

    toast.success("Question bank added successfully");
    navigate("/questionbank");
  };

  return (
    <ContainerStyled>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ color: "white", fontWeight: "bold" }}
      >
        Add Question Bank
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          sx={{
            mb: 2,
            input: { color: "white" },
            label: { color: "white" },
            backgroundColor: "#61725FFF",
            borderRadius: "10px",
          }}
        />
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          sx={{
            mb: 2,
            input: { color: "white" },
            label: { color: "white" },
            backgroundColor: "#61725FFF",
            borderRadius: "10px",
          }}
        />
        <Box sx={{ height: "2rem" }}></Box>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel sx={{ color: "white", margin: "-.5rem" }}>
            Question Type
          </InputLabel>
          <Select
            value={currentQuestion.questionType}
            onChange={handleQuestionTypeChange}
            sx={{
              color: "white",
              backgroundColor: "#61725FFF",
              borderRadius: "10px",
            }}
          >
            <MenuItem value="MCQ">Multiple Choice Question</MenuItem>
            <MenuItem value="True/False">True/False</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Question Text"
          value={currentQuestion.questionText}
          onChange={(e) =>
            setCurrentQuestion((prev) => ({
              ...prev,
              questionText: e.target.value,
            }))
          }
          fullWidth
          sx={{
            mb: 2,
            input: { color: "white" },
            label: { color: "white" },
            backgroundColor: "#61725FFF",
            borderRadius: "10px",
          }}
        />
        {currentQuestion.options.map((option, index) => (
          <Box
            key={option.optionId}
            sx={{ display: "flex", alignItems: "center", mb: 2 }}
          >
            <TextField
              label={`Option ${index + 1}`}
              value={option.optionText}
              onChange={(e) =>
                handleOptionChange(index, "optionText", e.target.value)
              }
              fullWidth
              sx={{
                input: { color: "white" },
                label: { color: "white" },
                backgroundColor: "#61725FFF",
                borderRadius: "10px",
              }}
              disabled={currentQuestion.questionType === "True/False"}
            />
            <Button
              variant={option.isCorrect ? "contained" : "outlined"}
              color="primary"
              onClick={() => handleMarkCorrect(index)}
              sx={{ ml: 2 }}
            >
              {option.isCorrect ? "Correct" : "Mark Correct"}
            </Button>
          </Box>
        ))}
        <Box style={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddQuestion}
            sx={{ mb: 2 }}
          >
            Add Question
          </Button>
          <Button
            type="submit"
            variant="contained"
            sx={{ mb: 2, backgroundColor: "#217416FF" }}
          >
            Submit
          </Button>
        </Box>
      </form>
      <Toaster />
    </ContainerStyled>
  );
};

export default AddQuestionBank;
