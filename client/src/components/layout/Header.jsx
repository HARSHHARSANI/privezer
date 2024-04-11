import React, { Suspense, lazy, useState } from "react";
import {
  Box,
  AppBar,
  Typography,
  Toolbar,
  IconButton,
  Tooltip,
  Backdrop,
} from "@mui/material";
import { orange } from "../constants/color";
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  Add as AddIcon,
  Group as GroupIcon,
  Logout as LogoutIcon,
  NotificationAdd as NotificationIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import NewGroups from "../specific/NewGroups";

const SearchDialog = lazy(() => import("../specific/Search"));
const GroupDialog = lazy(() => import("../specific/NewGroups"));
const NotificationDialog = lazy(() => import("../specific/Notification"));

const Header = () => {
  const [isSearch, setIsSearch] = useState(false);
  const [isGroup, setIsGroup] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isNotification, setIsNotification] = useState(false);
  const navigate = useNavigate();

  const handleMobile = () => {
    setIsMobile(!isMobile);
  };

  const openSearchDialog = () => {
    setIsSearch(!isSearch);
  };

  const openNewGroup = () => {
    setIsGroup(!isGroup);
  };

  const openNotification = () => {
    setIsNotification(!isNotification);
  };

  const navigateToGroup = () => navigate("/groups");

  const logoutHandler = () => {
    console.log("logoutHandler");
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }} height={"4rem"}>
        <AppBar
          position="static"
          sx={{
            bgcolor: "red",
          }}
        >
          <Toolbar sx={{ justifyContent: "flex-end" }}>
            <Typography
              variant="h6"
              sx={{
                flexGrow: 1,
                display: { xs: "none", sm: "block" },
                bgcolor: "red",
              }}
            >
              Pr!vezer
            </Typography>
            <Box sx={{ display: { xs: "block", sm: "none" } }}>
              <IconButton color="inherit" onClick={handleMobile}>
                <MenuIcon />
              </IconButton>
            </Box>
            <Box sx={{ flexGrow: 1 }} />{" "}
            <Box
              sx={{
                display: { xs: "block" },
              }}
            >
              <IconBtn
                title={"Search"}
                icon={<SearchIcon />}
                onClick={openSearchDialog}
              />
              <IconBtn
                title={"New Group"}
                onClick={openNewGroup}
                icon={<AddIcon />}
              />
              <IconBtn
                title={"Manage Group"}
                onClick={navigateToGroup}
                icon={<GroupIcon />}
              />
              <IconBtn
                title={"Notification"}
                onClick={openNotification}
                icon={<NotificationIcon />}
              />
              <IconBtn
                title={"Logout"}
                onClick={logoutHandler}
                icon={<LogoutIcon />}
              />
            </Box>
          </Toolbar>
        </AppBar>
      </Box>

      {isSearch && (
        <Suspense fallback={<Backdrop open />}>
          <SearchDialog />
        </Suspense>
      )}

      {isNotification && (
        <Suspense fallback={<Backdrop open />}>
          <NotificationDialog />
        </Suspense>
      )}

      {isGroup && (
        <Suspense fallback={<Backdrop open />}>
          <GroupDialog />
        </Suspense>
      )}
    </>
  );
};

const IconBtn = ({ title, icon, onClick }) => {
  return (
    <Tooltip title={title}>
      <IconButton color="inherit" size="large" onClick={onClick}>
        {icon}
      </IconButton>
    </Tooltip>
  );
};

export default Header;
