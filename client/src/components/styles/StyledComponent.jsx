import { styled } from "@mui/material";
import { Link as LinkComponent } from "react-router-dom";
import { grayColor } from "../constants/color";

export const VisuallyHiddenInput = styled("input")({
  border: 0,
  clip: "rect(0 0 0 0)",
  height: 1,
  margin: -1,
  overflow: "hidden",
  padding: 0,
  position: "absolute",
  whiteSpace: "nowrap",
  width: 1,
});

export const Link = styled(LinkComponent)`
  text-decoration: none;
  color: black;
  padding: 1rem;
  &:hover {
    background-color: #f0f0f0;
`;

export const InputBox = styled("input")`
  width: 100%;
  height: 100%;
  padding: 0 3rem;
  border: none;
  outline: none;
  border-radius: 1.5rem;
  background-color: ${grayColor};
`;

export const SearchField = styled("input")`
  width: 20vmax;
  height: 100%;
  padding: 1rem 2rem;
  border: none;
  outline: none;
  border-radius: 1.5rem;
  background-color: #f1f1f1;
  font-size: 1.1rem;
`;

export const CurveButton = styled("button")`
  border: none;
  outline: none;
  border-radius: 1.5rem;
  padding: 1rem 2rem;
  background-color: black;
  color: white;
  cursor: pointer;
  font-size: 1.1rem;
  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }
`;
