import {
  Add as AddIcon,
  Group as GroupIcon,
  Logout as LogoutIcon,
  Menu as MenuIcon,
  NotificationAdd as NotificationIcon,
  Search as SearchIcon,
} from "@mui/icons-material";
import {
  AppBar,
  Backdrop,
  Box,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { Suspense, lazy, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userNotExist } from "../../redux/reducers/auth";
import { setIsMobile } from "../../redux/reducers/misc";
import { server } from "../constants/config";
import { setIsSearch } from "../../redux/reducers/misc";

const SearchDialog = lazy(() => import("../specific/Search"));
const GroupDialog = lazy(() => import("../specific/NewGroups"));
const NotificationDialog = lazy(() => import("../specific/Notification"));

const Header = () => {
  const [isGroup, setIsGroup] = useState(false);
  const [isNotification, setIsNotification] = useState(false);

  const { isSearch } = useSelector((state) => state.misc);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleMobile = () => dispatch(setIsMobile(true));

  const openSearchDialog = () => dispatch(setIsSearch(true));

  const openNewGroup = () => {
    setIsGroup(!isGroup);
  };

  const openNotification = () => {
    setIsNotification(!isNotification);
  };

  const navigateToGroup = () => navigate("/groups");

  const logoutHandler = async () => {
    try {
      console.log("logout");
      const { data } = await axios.get(`${server}/api/v1/users/logout`, {
        withCredentials: true,
      });
      localStorage.removeItem("privezer-token");
      dispatch(userNotExist());
      navigate("/login");
      toast.success(data.message);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
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
