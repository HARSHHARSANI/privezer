import { CameraAlt as CameraAltIcon } from "@mui/icons-material";
import {
  Avatar,
  Button,
  Container,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { VisuallyHiddenInput } from "../components/styles/StyledComponent";
import { backGround } from "../components/constants/color";

const validationSchema = Yup.object({
  username: Yup.string()
    .required("Username is required")
    .min(3, "Username must be at least 3 characters long")
    .max(20, "Username cannot be more than 20 characters long")
    .matches(/^[a-zA-Z0-9]+$/, "Username can only contain letters and numbers"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    ),
  name: Yup.string().required("Name is required"),
  bio: Yup.string().required("Bio is required"),
});

const Login = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  const toggleLogin = () => {
    setIsLogin(!isLogin);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setImageFile(file);
    setImageUrl(URL.createObjectURL(file));
  };

  const handleLogin = (values) => {
    e.preventDefault();
    console.log("Login values:", values);
  };

  return (
    <div
      style={{
        background: backGround,
      }}
    >
      <Container
        component={"main"}
        maxWidth="xs"
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Formik
            initialValues={{
              username: "",
              password: "",
              name: "",
              bio: "",
            }}
            validationSchema={
              isLogin
                ? Yup.object({
                    username: Yup.string()
                      .required("Username is required")
                      .min(3, "Username must be at least 3 characters long")
                      .max(
                        20,
                        "Username cannot be more than 20 characters long"
                      )
                      .matches(
                        /^[a-zA-Z0-9]+$/,
                        "Username can only contain letters and numbers"
                      ),
                    password: Yup.string()
                      .required("Password is required")
                      .min(8, "Password must be at least 8 characters long")
                      .matches(
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
                        "Password must contain at least one uppercase letter, one lowercase letter, and one number"
                      ),
                  })
                : validationSchema
            }
            onSubmit={(values, { setSubmitting }) => {
              values.imageUrl = imageUrl;
              handleLogin(values);
              setSubmitting(false);
            }}
          >
            {({ isSubmitting }) => (
              <Form style={{ width: "100%", marginTop: "0.5rem" }}>
                {!isLogin && (
                  <Stack position={"relative"} width={"10rem"} margin={"auto"}>
                    <Avatar
                      sx={{
                        width: "10rem",
                        height: "10rem",
                        objectFit: "contain",
                      }}
                      src={imageUrl || "/default-avatar.png"}
                    />
                    <IconButton
                      sx={{
                        position: "absolute",
                        bottom: "0",
                        right: "0",
                        color: "white",
                        bgcolor: "rgba(0, 0, 0,0.5)",
                        ":hover": {
                          bgcolor: "rgba(0, 0, 0,0.7)",
                        },
                      }}
                      component="label"
                    >
                      <>
                        <CameraAltIcon />
                        <VisuallyHiddenInput
                          type="file"
                          onChange={(event) => handleFileChange(event)}
                        />
                      </>
                    </IconButton>
                  </Stack>
                )}

                {!isLogin && (
                  <>
                    <Field
                      type="text"
                      name="name"
                      label="Name"
                      fullWidth
                      margin="normal"
                      variant="outlined"
                      as={TextField}
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="error-message"
                    />

                    <Field
                      type="text"
                      name="bio"
                      label="Bio"
                      fullWidth
                      margin="normal"
                      variant="outlined"
                      as={TextField}
                    />
                    <ErrorMessage
                      name="bio"
                      component="div"
                      className="error-message"
                    />
                  </>
                )}

                <Field
                  type="text"
                  name="username"
                  label="Username"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  as={TextField}
                />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="error-message"
                />

                <Field
                  type="password"
                  name="password"
                  label="Password"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  as={TextField}
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="error-message"
                />

                <Button
                  variant="contained"
                  color="primary"
                  sx={{ marginTop: "1rem" }}
                  type="submit"
                  fullWidth
                  disabled={isSubmitting}
                >
                  {isLogin ? "Log In" : "Sign Up"}
                </Button>

                <Typography textAlign={"center"} m={"1rem"}>
                  Or
                </Typography>

                <Button
                  variant="contained"
                  fullWidth
                  sx={{ marginTop: "1rem" }}
                  type="button"
                  onClick={toggleLogin}
                >
                  {isLogin ? "Sign Up" : "Log In"}
                </Button>
              </Form>
            )}
          </Formik>
        </Paper>
      </Container>
    </div>
  );
};

export default Login;
