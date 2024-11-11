import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  Container,
  Typography,
  Button,
  Box,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { quizData } from "../quizData/quizData";
import { styled } from "@mui/material/styles";
import { css, Global } from "@emotion/react";
import { instructionData } from "../quizData/instruction";
import { useAppState } from "../../db/db";

const ContainerStyled = styled(Container)(({ theme }) => ({
  minHeight: "100vh",
  width: "100vw",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "flex-start",
  backgroundColor: "#2D3D2BFF",
  padding: 0,
  margin: 0,
  maxWidth: "none", // Ensure the container is not constrained by its default max-width
}));

const AddButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  top: "6rem",
  right: "1rem",
  backgroundColor: "#467340FF",
  borderRadius: "4%",
  color: "white",
}));

const ListContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  padding: "1rem",
  boxSizing: "border-box",
}));

const QuizzesMenu = () => {
  const navigate = useNavigate();
  const { getQuiz } = useAppState();
  const quizData = getQuiz();
  return (
    <>
      <Global
        styles={css`
          html,
          body,
          #root {
            margin: 0;
            padding: 0;
            min-height: 100vh;
            width: 100%;
            background-color: #2d3d2bff; // Ensure the background color is applied to the entire page
          }
          body {
            display: flex;
            justify-content: center;
            padding-top: 8rem;
            align-items: flex-start;
            min-height: 100vh;
            width: 100%;
            background-color: #2d3d2bff;
          }
        `}
      />
      <ContainerStyled>
        <AddButton onClick={() => navigate("/addQuiz")}>Add Quiz</AddButton>
        <Typography
          variant="h4"
          gutterBottom
          sx={{ color: "white", fontWeight: "bold" }}
        >
          Quizzes
        </Typography>
        <ListContainer>
          <List>
            {quizData?.map((quiz, index) => (
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
                  <Button
                    onClick={() =>
                      navigate(`/quiz/${quiz.quizId}/instructions`)
                    }
                    sx={{ width: "100%", textAlign: "left" }}
                  >
                    <ListItemText
                      primary={` ${index + 1}: ${quiz.title}`}
                      primaryTypographyProps={{
                        color: "#FFFFFFFF",
                        fontWeight: "bold",
                        display: "flex",
                        justifyContent: "flex-start",
                        marginBottom: "1rem",
                      }}
                      secondary={quiz.description}
                      secondaryTypographyProps={{ color: "#ACC5A9FF" }}
                    />
                  </Button>
                </ListItem>
              </Box>
            ))}
          </List>
        </ListContainer>
      </ContainerStyled>
    </>
  );
};

export default QuizzesMenu;
