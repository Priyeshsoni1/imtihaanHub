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

import { styled } from "@mui/material/styles";
import { css, Global } from "@emotion/react";

import { useAppState } from "../../db/db";

const ContainerStyled = styled(Container)(({ theme }) => ({
  height: "100vh",
  width: "100vw",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#2D3D2BFF",
  padding: 0,
  margin: 0,
  maxWidth: "none", // Ensure the container is not constrained by its default max-width
  position: "relative", // To position the icon button absolutely within the container
}));

const AddButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  top: "6rem",
  right: "1rem",

  backgroundColor: "#467340FF",
  borderRadius: "4%",

  color: "white",
}));

const QuestionBankMenu = () => {
  const navigate = useNavigate();
  const { getQuestionBank } = useAppState();
  const questionBankData = getQuestionBank();

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
        <AddButton onClick={() => navigate("/addQuestionBank")}>
          Add Question Bank
        </AddButton>
        <Typography
          variant="h4"
          gutterBottom
          sx={{ color: "white", fontWeight: "bold" }}
        >
          Question Bank
        </Typography>
        <List>
          {questionBankData?.map((quiz, index) => (
            <Box
              key={quiz.id}
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
                  onClick={() => navigate(`/questionbank/${quiz.id}`)}
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
      </ContainerStyled>
    </>
  );
};

export default QuestionBankMenu;
