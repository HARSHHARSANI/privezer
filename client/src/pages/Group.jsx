import React, { memo, useState } from "react";
import Grid from "@mui/material/Grid";
import { orange } from "../components/constants/color";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import {
  KeyboardBackspace as KeyboardBackspaceIcon,
  Menu as MenuIcons,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { Drawer } from "@mui/material";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Link } from "../components/styles/StyledComponent";
import AvatarCard from "../components/shared/AvatarCard";
import { Samplechats } from "../components/constants/SampleData";

const Group = () => {
  const navigate = useNavigate();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigateBack = () => {
    navigate("/");
  };

  const handleMobile = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleMobileClose = () => {
    setIsMobileMenuOpen(false);
  };

  const IconBtns = () => (
    <>
      <Tooltip title="menu">
        <IconButton
          sx={{
            position: "absolute",
            top: "2rem",
            right: "2rem",
            bgcolor: "black",
            color: "white",
            "&:hover": {
              bgcolor: orange,
            },
          }}
          onClick={handleMobile}
        >
          <MenuIcons />
        </IconButton>
      </Tooltip>

      <Tooltip title="Back">
        <IconButton
          aria-label=""
          sx={{
            position: "absolute",
            top: "2rem",
            left: "2rem",
            bgcolor: "black",
            color: "white",
            "&:hover": {
              bgcolor: orange,
            },
          }}
          onClick={navigateBack}
        >
          <KeyboardBackspaceIcon />
        </IconButton>
      </Tooltip>
    </>
  );

  return (
    <Grid container spacing={0} height={"100vh"}>
      <Grid
        item
        sx={{
          display: {
            xs: "none",
            sm: "block",
          },
        }}
        sm={4}
        height={"100vh"}
        bgcolor={"bisque"}
      >
        <GroupsList myGroups={Samplechats} />
      </Grid>
      <Grid
        item
        xs={12}
        sm={8}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
          padding: "1rem",
        }}
      >
        {<IconBtns />}
      </Grid>
      <Drawer
        anchor={"left"}
        open={isMobileMenuOpen}
        onClose={handleMobileClose}
        sx={{
          display: {
            xs: "block",
            sm: "none",
          },
        }}
      >
        <GroupsList myGroups={Samplechats} />
      </Drawer>
    </Grid>
  );
};

const GroupsList = ({ w = "100%", myGroups = [], chatId }) => {
  return (
    <Stack>
      {myGroups.length > 0 ? (
        myGroups.map((group) => (
          <GroupListItems group={group} chatId={chatId} key={group._id} />
        ))
      ) : (
        <Typography padding={"1rem"} textAlign={"center"}>
          No Group Found
        </Typography>
      )}
    </Stack>
  );
};

const GroupListItems = memo(({ group, chatId }) => {
  const { name, _id, members = [], avatar } = group;
  return (
    <Link
      to={`?group=${_id}`}
      onClick={(e) => {
        if (chatId === _id) e.preventDefault();
      }}
    >
      <Stack direction={"row"} spacing={"1rem"} alignItems={"center"}>
        <AvatarCard avatar={avatar} />
        <Typography>{name}</Typography>
      </Stack>
    </Link>
  );
});

export default Group;
