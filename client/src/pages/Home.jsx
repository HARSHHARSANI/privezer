import React from "react";
import AppLayout from "../components/layout/AppLayout";
import { Typography, Box } from "@mui/material";
import { grayColor } from "../components/constants/color";

const Home = () => {
  return (
    <Box bgcolor={grayColor} height={"100vh"}>
      <Typography variant="h5" textAlign={"center"} color="initial" p={"2rem"}>
        Select a friend to Chat
      </Typography>
    </Box>
  );
};

export default AppLayout()(Home);
