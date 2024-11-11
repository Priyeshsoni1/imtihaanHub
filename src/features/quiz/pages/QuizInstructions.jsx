import React, { useEffect } from "react";
import {
  Container,
  Typography,
  Button,
  Box,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { css, Global } from "@emotion/react";
import { styled } from "@mui/material/styles";
import { quizData } from "../quizData/quizData";
import { instructionData } from "../quizData/instruction";
import { useAppState } from "../../db/db";
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
const QuizInstructions = () => {
  const navigate = useNavigate();
  const { quizId } = useParams();
  const { getQuiz } = useAppState();
  const quizData = getQuiz();

  const quizDataForId = quizData.find((item) => {
    console.log(item, "quizDataForId");
    return item.quizId == quizId ? item : null;
  });
  console.log(quizDataForId, "quizDataForId");

  useEffect(() => {
    console.log("first time");
  }, []);

  const handleStart = () => {
    navigate(`/quiz/${quizId}/start`);
  };

  const handleCancel = () => {
    navigate("/quiz");
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
          Quizzes
        </Typography>
        <Typography variant="body1" gutterBottom fontSize={"1.2rem"}>
          Please read the instructions carefully before starting the quiz.
        </Typography>
        {/* ------------ */}
        <List>
          {quizDataForId?.instructionData?.instructions?.map((quiz, index) => (
            <Box
              key={quiz.quizId}
              sx={{
                backgroundColor: "#4A4D49FF",
                borderRadius: ".5rem",
                transition: "background-color 0.3s",
                "&:hover": {
                  backgroundColor: "#599052FF",
                },
                mb: 2,
              }}
            >
              <ListItem>
                <Button sx={{ width: "100%", textAlign: "left" }}>
                  <ListItemText
                    primary={` ${index + 1}: ${quiz.title}`}
                    primaryTypographyProps={{
                      color: "#FFFFFFFF",
                      fontWeight: "bold",
                      display: "flex",
                      justifyContent: "flex-start",
                      marginBottom: "1rem",
                    }}
                    secondary={quiz.steps}
                    secondaryTypographyProps={{ color: "#ACC5A9FF" }}
                  />
                </Button>
              </ListItem>
            </Box>
          ))}
        </List>
        {/* ----------- */}
        <Box mt={2} mb={10}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleStart}
            style={{
              fontSize: "1.2rem",
              marginLeft: "10px",
              color: "white",

              fontWeight: "bold",
            }}
          >
            Start
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleCancel}
            style={{
              fontSize: "1.2rem",
              marginLeft: "10px",
              color: "white",

              fontWeight: "bold",
            }}
          >
            Cancel
          </Button>
        </Box>
      </ContainerStyled>
    </>
  );
};

export default QuizInstructions;
