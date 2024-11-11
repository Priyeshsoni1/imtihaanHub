import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import { users } from "../../db/users"; // Adjust the path if necessary

const useStyles = makeStyles((theme) => ({
  "@global": {
    "html, body, #root": {
      height: "100%",
      margin: 0,
      padding: 0,
    },
  },
  root: {
    height: "100vh",
    width: "100vw",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start", // Changed from center to flex-start
    paddingTop: theme.spacing(8), // A
  },
  tableContainer: {
    height: "100%",
    width: "100%",
  },
  table: {
    minWidth: 450,
  },
  tableHeader: {
    backgroundColor: "#3C686BFF",
    color: theme.palette.common.white,
  },
  tableCell: {
    color: theme.palette.common.white,
    fontWeight: 800,
    fontSize: "1.1rem",
  },
}));

const Instructors = () => {
  const classes = useStyles();

  const instructors = users.filter((user) => user.role === "Instructor");

  return (
    <div className={classes.root}>
      <Typography
        variant="h5"
        component="div"
        style={{
          padding: "16px",
          backgroundColor: "#3C686BFF",
          width: "100%",
          color: "black",
          fontWeight: "bold",
        }} // B
      >
        Instructors
      </Typography>
      <hr
        style={{
          width: "100%",
          color: "black",
          padding: 0,
          backgroundColor: "black",
          margin: 0,
          height: 0.1,
        }}
      />
      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table className={classes.table} aria-label="instructor table">
          <TableHead>
            <TableRow className={classes.tableHeader}>
              <TableCell
                sx={{ color: "white", fontWeight: 800, fontSize: "1.1rem" }}
              >
                Name
              </TableCell>
              <TableCell
                sx={{ color: "white", fontWeight: 800, fontSize: "1.1rem" }}
              >
                Email
              </TableCell>
              <TableCell
                sx={{ color: "white", fontWeight: 800, fontSize: "1.1rem" }}
              >
                Department
              </TableCell>
              <TableCell
                sx={{ color: "white", fontWeight: 800, fontSize: "1.1rem" }}
              >
                Courses
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {instructors.map((instructor) => (
              <TableRow
                key={instructor.id}
                sx={{
                  "&:hover": {
                    backgroundColor: "#f5f5f5",
                  },
                }}
              >
                <TableCell>{instructor.name}</TableCell>
                <TableCell>{instructor.email}</TableCell>
                <TableCell>{instructor.instructor.department}</TableCell>
                <TableCell>
                  {instructor.instructor.courses.join(", ")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Instructors;
