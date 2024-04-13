import {
  Close as CloseIcon,
  Dashboard as DashboardIcon,
  ExitToApp as ExittToAppIcon,
  Group as GroupIcon,
  ManageAccounts as ManageAccountsIcon,
  Menu as MenuIcon,
  Message as MessageIcon,
} from "@mui/icons-material";
import {
  Box,
  Drawer,
  Grid,
  IconButton,
  Stack,
  Typography,
  styled,
} from "@mui/material";
import React, { useState } from "react";
import {
  Link as LinkComponent,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { grayColor } from "../constants/color";

const Link = styled(LinkComponent)`
  text-decoration: none;
  border-radius: 2rem;
  padding: 1rem 2rem;
  color: black;
  &:hover {
    color: rgba(0, 0, 0, 0.54);
  }
`;

const admintabs = [
  {
    name: "Dashboard",
    path: "/admin/dashboard",
    icon: <DashboardIcon />,
  },
  {
    name: "Users",
    path: "/admin/user-management",
    icon: <ManageAccountsIcon />,
  },
  {
    name: "Chats",
    path: "/admin/group-management",
    icon: <GroupIcon />,
  },
  {
    name: "Messages",
    path: "/admin/message-management",
    icon: <MessageIcon />,
  },
];

const SideBar = ({ w = "100%" }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const logoutHandler = () => {
    console.log("Logout");
  };

  const isAdmin = true;

  if (!isAdmin) {
    navigate("/admin");
  }

  return (
    <Stack w={w} direction="column" spacing={"3rem"} padding={"3rem"}>
      <Typography variant="h5" color="initial">
        Pr!vezer
      </Typography>
      <Stack spacing={1}>
        {admintabs.map((tab) => (
          <Link
            key={tab.path}
            to={tab.path}
            style={{ textDecoration: "none" }}
            sx={
              location.pathname === tab.path
                ? {
                    bgcolor: "rgba(0, 0, 0, 0.1)",
                    color: "rgba(0, 0, 0, 0.87)",
                    borderRadius: "2rem",
                  }
                : {}
            }
          >
            <Stack direction="row" alignItems="center" spacing={"1rem"}>
              {tab.icon}
              <Typography variant="body1" color="initial">
                {tab.name}
              </Typography>
            </Stack>
          </Link>
        ))}

        <Link onClick={logoutHandler}>
          <Stack direction="row" alignItems="center" spacing={"1rem"}>
            <ExittToAppIcon />
            <Typography>Logout</Typography>
          </Stack>
        </Link>
      </Stack>
    </Stack>
  );
};

const AdminLayout = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false);

  const handleMobile = () => {
    setIsMobile(!isMobile);
  };

  const handleClose = () => {
    setIsMobile(false);
  };

  return (
    <Grid container minHeight={"100vh"}>
      <Box
        sx={{
          display: { xs: "block", md: "none" },
          bgcolor: grayColor,
          position: "fixed",
          right: "1rem",
          top: "1rem",
        }}
      >
        <IconButton onClick={handleMobile}>
          {isMobile ? <CloseIcon /> : <MenuIcon />}
        </IconButton>
      </Box>
      <Grid
        item
        md={4}
        lg={3}
        sx={{
          display: { xs: "none", md: "block" },
          bgcolor: grayColor,
        }}
      >
        <SideBar />
      </Grid>
      <Grid
        item
        xs={12}
        md={8}
        lg={9}
        sx={{
          bgcolor: "f5f5f5",
        }}
      >
        {children}
      </Grid>
      <Drawer open={isMobile} onClose={handleClose}>
        <SideBar w={"50vw"} />
      </Drawer>
    </Grid>
  );
};

export default AdminLayout;
