import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Button, TextField, Container, Typography, Box } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import { toast, Toaster } from "react-hot-toast";

import { users } from "../../../db/users";
import { useNavigate } from "react-router-dom"; // Updated import
import { useAppState } from "../../../db/db";
// Adjust the path if necessary

const useStyles = makeStyles((theme) => ({
  formContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: theme.spacing(8),
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  textField: {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "white", // Default border color
      },
      "&:hover fieldset": {
        borderColor: "white", // Border color on hover
      },
      "&.Mui-focused fieldset": {
        borderColor: "white", // Border color when focused
      },
    },
    "& .MuiInputLabel-root": {
      color: "white", // Label color
      fontSize: "1rem",
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "white", // Label color when focused
      fontSize: "1.3rem",
    },
    "& .MuiOutlinedInput-input": {
      color: "white", // Input text color
    },
    "& .MuiOutlinedInput-input::placeholder": {
      color: "white", // Placeholder text color
    },
    "& .Mui-error .MuiOutlinedInput-notchedOutline": {
      borderColor: "red", // Border color when there is an error
    },
  },
}));

const LoginForm = () => {
  const classes = useStyles();
  const { login } = useAppState();
  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string().required("Required"),
  });

  const navigate = useNavigate();

  const onSubmit = (values, { setSubmitting }) => {
    login(
      values,
      () => {
        navigate("/dashboard");
      },
      () => {
        console.log("Invalid email or password.");
      }
    );
    // const user = users.find(
    //   (user) => user.email === values.email && user.password === values.password
    // );

    // if (user) {
    //   toast.success("Login successful!");
    //   setTimeout(() => {
    //     navigate("/dashboard");
    //   }, 2000);
    //   localStorage.setItem("user", JSON.stringify(user));
    // } else {
    //   toast.error("Invalid email or password.");
    //   console.log("Invalid email or password.");
    // }
    // console.log(values, !!user);
    setSubmitting(false);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box className={classes.formContainer}>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting, touched, errors }) => (
            <Form className={classes.form}>
              <Field
                as={TextField}
                variant="outlined"
                margin="normal"
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                className={classes.textField}
                helperText={touched.email && errors.email ? errors.email : ""}
                error={touched.email && Boolean(errors.email)}
              />
              <Field
                as={TextField}
                variant="outlined"
                margin="normal"
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                className={classes.textField}
                helperText={
                  touched.password && errors.password ? errors.password : ""
                }
                error={touched.password && Boolean(errors.password)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                disabled={isSubmitting}
              >
                Login
              </Button>
            </Form>
          )}
        </Formik>
        <Toaster />
      </Box>
    </Container>
  );
};

export default LoginForm;
