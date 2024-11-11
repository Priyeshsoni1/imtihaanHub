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
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { toast, Toaster } from "react-hot-toast";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useAppState } from "../../db/db";

const ContainerStyled = styled(Container)(({ theme }) => ({
  minHeight: "100vh",
  width: "100vw",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "flex-start",
  backgroundColor: "#2D3D2BFF",
  padding: "2rem",
  margin: 0,
  maxWidth: "none",
  overflowY: "auto", // Ensure the container is scrollable
}));

const AddQuiz = () => {
  const { addQuiz } = useAppState();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [totalMarks, setTotalMarks] = useState("");
  const [questions, setQuestions] = useState([]);
  const [instructions, setInstructions] = useState([
    {
      title: "",
      steps: "",
    },
  ]);
  const [difficulty, setDifficulty] = useState("Easy");

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

  const handleDifficultyChange = (e) => {
    setDifficulty(e.target.value);
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
      { ...currentQuestion, questionId: uuidv4(), difficulty },
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
    setDifficulty("Easy"); // Reset difficulty to "Easy"
    toast.success("Question added successfully");
  };

  const handleInstructionChange = (index, field, value) => {
    const newInstructions = instructions.map((instruction, i) =>
      i === index ? { ...instruction, [field]: value } : instruction
    );

    setInstructions(newInstructions);
  };

  const handleAddStep = () => {
    setInstructions([...instructions, { title: "", steps: "" }]);
  };

  const handleRemoveStep = (instructionIndex) => {
    const newInstructions = instructions.filter(
      (_, i) => i !== instructionIndex
    );
    setInstructions(newInstructions);
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

    if (!duration) {
      toast.error("Duration is required");
      return;
    }

    if (!totalMarks) {
      toast.error("Total marks are required");
      return;
    }

    if (questions.length === 0) {
      toast.error("At least one question must be added");
      return;
    }
    console.log(duration, e, parseInt(duration, 10), "parseInt");
    const newQuestionBank = {
      id: uuidv4(),
      title,
      description,
      duration: parseInt(duration, 10),
      totalMarks: parseInt(totalMarks, 10),
      questions,
      instructionData: { instructorId: uuidv4(), instructions: instructions },
    };
    console.log(newQuestionBank, "currentInstruction");
    addQuiz(newQuestionBank);

    toast.success("Question bank added successfully");
    navigate("/quiz");
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
        <TextField
          label="Duration (minutes)"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
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
          label="Total Marks"
          value={totalMarks}
          onChange={(e) => setTotalMarks(e.target.value)}
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
        <Typography
          variant="h5"
          gutterBottom
          sx={{ color: "white", fontWeight: "bold", mt: 4 }}
        >
          Add Instructions
        </Typography>
        {instructions.map((instruction, instructionIndex) => (
          <Box key={instructionIndex} sx={{ mb: 4 }}>
            <TextField
              label="Instruction Title"
              value={instruction.title}
              onChange={(e) =>
                handleInstructionChange(
                  instructionIndex,
                  "title",
                  e.target.value
                )
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

            <Box
              key={instructionIndex}
              sx={{ display: "flex", alignItems: "center", mb: 2 }}
            >
              <TextField
                label={`Step ${instructionIndex + 1}`}
                value={instruction.steps}
                onChange={(e) =>
                  handleInstructionChange(
                    instructionIndex,
                    "steps",

                    e.target.value
                  )
                }
                fullWidth
                sx={{
                  input: { color: "white" },
                  label: { color: "white" },
                  backgroundColor: "#61725FFF",
                  borderRadius: "10px",
                }}
              />
            </Box>

            <Button
              variant="contained"
              color="secondary"
              onClick={() => handleRemoveStep(instructionIndex)}
              sx={{ mb: 2 }}
            >
              Remove
            </Button>
          </Box>
        ))}
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddStep}
          sx={{ mb: 2 }}
        >
          Add More Instruction
        </Button>{" "}
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
        <FormControl component="fieldset" sx={{ mb: 2 }}>
          <Typography variant="h6" sx={{ color: "white" }}>
            Difficulty Level
          </Typography>
          <RadioGroup
            row
            value={difficulty}
            onChange={handleDifficultyChange}
            sx={{ color: "white" }}
          >
            <FormControlLabel
              value="Easy"
              control={<Radio sx={{ color: "white" }} />}
              label="Easy"
            />
            <FormControlLabel
              value="Medium"
              control={<Radio sx={{ color: "white" }} />}
              label="Medium"
            />
            <FormControlLabel
              value="Hard"
              control={<Radio sx={{ color: "white" }} />}
              label="Hard"
            />
          </RadioGroup>
        </FormControl>
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
        </Box>
        <Box style={{ display: "flex", justifyContent: "space-between" }}>
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

export default AddQuiz;
