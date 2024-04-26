import { CameraAlt as CameraAltIcon } from "@mui/icons-material";
import {
  Avatar,
  Button,
  CircularProgress,
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
import axios from "axios";
import { server } from "../components/constants/config";
import { useDispatch } from "react-redux";
import { userExist } from "../redux/reducers/auth";
import toast from "react-hot-toast";

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

const CircularProgressWithLabel = ({ value }) => (
  <Stack alignItems="center">
    <CircularProgress variant="determinate" value={value} />
    <Typography variant="caption">{`${Math.round(value)}%`}</Typography>
  </Stack>
);

const Login = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0); // Added progress state
  const dispatch = useDispatch();

  const toggleLogin = () => {
    setIsLogin(!isLogin);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setImageFile(file);
    setImageUrl(URL.createObjectURL(file));
  };

  const config = {
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  };

  const handleLogin = async (values) => {
    try {
      setLoading(true);
      setProgress(50); // Example progress update
      const { data } = await axios.post(
        `${server}/api/v1/users/login`,
        {
          username: values.username,
          password: values.password,
        },
        config
      );
      // console.log(data);
      dispatch(userExist(data.user));
      setLoading(false);
      toast.success(data.message);
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error(error?.response?.data?.message || "An error occurred");
    }
  };

  const handleSignup = async (values) => {
    try {
      setLoading(true);
      setProgress(50); // Example progress update
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("username", values.username);
      formData.append("bio", values.bio);
      formData.append("password", values.password);
      formData.append("avatar", imageFile);

      const { data } = await axios.post(
        `${server}/api/v1/users/register`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(data);
      dispatch(userExist(true));
      setLoading(false);
      toast.success(data.message);
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error(error?.response?.data?.message || "An error occurred");
    }
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
            width: "100%",
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
              if (isLogin) {
                handleLogin(values);
              } else {
                values.imageUrl = imageUrl;
                handleSignup(values);
              }
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

                {/* Conditional rendering based on loading state */}
                {loading ? (
                  <CircularProgressWithLabel value={progress} />
                ) : (
                  <>
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
                  </>
                )}
              </Form>
            )}
          </Formik>
        </Paper>
      </Container>
    </div>
  );
};

export default Login;
