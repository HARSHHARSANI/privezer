import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Container, Paper, Typography } from "@mui/material";
import {
  backGround,
  grayColor,
  lightGray,
  matBlack,
  secondaryColor,
} from "../constants/color";

const Table = ({ rows, columns, heading, rowHeight = 52 }) => {
  return (
    <Container
      sx={{
        height: "100vh",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          height: "100%",
          overflow: "hidden",
          alignItems: "center",
          padding: "1rem 4rem",
          borderRadius: "1rem",
          margin: "auto",
          width: "100%",
        }}
      >
        <Typography
          textAlign={"center"}
          variant={"h4"}
          sx={{
            margin: "2rem",
            fontWeight: "bold",
            textTransform: "uppercase",
            color: "white",
          }}
        >
          {heading}
        </Typography>
        <DataGrid
          rows={rows}
          columns={columns}
          rowHeight={rowHeight}
          style={{
            height: "80%",
          }}
          sx={{
            border: "none",
            "& .table-header": {
              color: "white",
              fontWeight: "bold",
              backgroundColor: "dimgrey",
            },
          }}
        />
      </Paper>
    </Container>
  );
};

export default Table;
