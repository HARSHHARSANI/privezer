import React, { useRef } from "react";
import AppLayout from "../components/layout/AppLayout";
import { Stack } from "@mui/material";
const Chat = () => {
  const containerRef = useRef(null);
  return <Stack ref={containerRef}></Stack>;
};

export default AppLayout()(Chat);
