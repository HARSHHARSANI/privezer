import { Button, Container, Paper, Typography, TextField } from "@mui/material";
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { backGround } from "../../components/constants/color";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object({
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    ),
});

const AdminLogin = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [secretKey, setSecretKey] = useState("asdfghjkl");

  const navigate = useNavigate();

  const isAdmin = true;

  if (isAdmin) navigate("/admin/dashboard");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setImageUrl(URL.createObjectURL(file));
  };

  const handleLogin = (values) => {
    console.log("Login values:", values);
  };

  return (
    <div style={{ background: backGround }}>
      <Container
        component={"main"}
        width="xs"
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
            width: "40%",
          }}
        >
          <Typography variant="h4" gutterBottom>
            Admin Login
          </Typography>
          <Formik
            initialValues={{
              password: "",
              name: "",
              bio: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
              values.imageUrl = imageUrl;
              handleLogin(values);
              setSubmitting(false);
            }}
          >
            {({ isSubmitting }) => (
              <Form style={{ width: "100%", marginTop: "0.5rem" }}>
                <Field
                  type="password"
                  name="SecretKey"
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
                  Log In
                </Button>
              </Form>
            )}
          </Formik>
        </Paper>
      </Container>
    </div>
  );
};

export default AdminLogin;
