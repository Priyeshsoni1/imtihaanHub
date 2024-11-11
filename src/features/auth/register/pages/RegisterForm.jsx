import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Button, TextField, Container, Typography, Box } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import { useAppState } from "../../../db/db";
import { useNavigate } from "react-router-dom";

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
      fontSize: "1.1rem",
    },
    "& .MuiOutlinedInput-input::placeholder": {
      color: "white", // Placeholder text color
    },
    "& .Mui-error .MuiOutlinedInput-notchedOutline": {
      borderColor: "red", // Border color when there is an error
    },
  },
}));

const RegisterForm = () => {
  const { createUser } = useAppState();
  const classes = useStyles();

  const initialValues = {
    email: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Required"),
  });
  const navigate = useNavigate();

  const onSubmit = (values, { setSubmitting }) => {
    console.log(values);
    createUser(
      values,
      (user) => {
        navigate("/login");
      },
      (error) => {
        console.error(error);
        setSubmitting(false);
      }
    );
    setSubmitting(false);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box className={classes.formContainer}>
        <Typography component="h1" variant="h5">
          Register
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
                className={classes.textField}
                autoFocus
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
                className={classes.textField}
                autoComplete="current-password"
                helperText={
                  touched.password && errors.password ? errors.password : ""
                }
                error={touched.password && Boolean(errors.password)}
              />
              <Field
                as={TextField}
                variant="outlined"
                margin="normal"
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                className={classes.textField}
                autoComplete="current-password"
                helperText={
                  touched.confirmPassword && errors.confirmPassword
                    ? errors.confirmPassword
                    : ""
                }
                error={
                  touched.confirmPassword && Boolean(errors.confirmPassword)
                }
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                disabled={isSubmitting}
              >
                Register
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Container>
  );
};

export default RegisterForm;
