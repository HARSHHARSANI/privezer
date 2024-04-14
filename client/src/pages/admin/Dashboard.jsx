import React from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import {
  Box,
  Container,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import {
  AdminPanelSettings as AdminPanelSettingsIcon,
  Group as GroupIcon,
  Message as MessageIcon,
  Notifications as NotificationsIcon,
  Person as PersonIcon,
} from "@mui/icons-material";
import moment from "moment";
import {
  CurveButton,
  SearchField,
} from "../../components/styles/StyledComponent";
import { LineChart, DoughnutChart } from "../../components/specific/Chart";

const Widget = ({ title, value, icon }) => (
  <Paper
    sx={{
      padding: "2rem",
      borderRadius: "1rem",
      width: "20rem",
      margin: "2rem 0",
      backgroundColor: "rgba(0, 0, 0, 0.05)",
    }}
  >
    <Stack spacing={"1rem"} alignItems={"center"}>
      <Typography
        color={"rgba(0, 0, 0, 0.7)"}
        borderRadius={"50%"}
        border={"5px solid rgba(0, 0, 0, 0.9)"}
        width={"5rem"}
        height={"5rem"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        {value}
      </Typography>
      <Stack
        direction={"row"}
        spacing={"1rem"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        {icon}
        <Typography>{title}</Typography>
      </Stack>
    </Stack>
  </Paper>
);

const Widgets = (
  <Stack
    direction={{
      xs: "column",
      sm: "row",
    }}
    justifyContent={"space-between"}
    spacing={"2rem"}
    margin={"2rem 0"}
    marginTop={"4rem"}
    alignItems={{
      xs: "center",
      sm: "stretch",
    }}
  >
    <Widget title={"Users"} value={3} icon={<PersonIcon />} />

    <Widget title={"Messages"} value={3} icon={<GroupIcon />} />
    <Widget title={"Chats"} value={3} icon={<MessageIcon />} />
  </Stack>
);

const Dashboard = () => {
  const Appbar = (
    <Paper
      elevation={3}
      sx={{
        padding: "1rem",
        margin: "2rem 0",
        borderRadius: "1rem",
      }}
    >
      <Stack direction={"row"} spacing={"1rem"} alignItems={"center"}>
        <AdminPanelSettingsIcon
          sx={{
            fontSize: "3rem",
          }}
        />

        <SearchField type="text" />
        <CurveButton>Search</CurveButton>

        <Box flexGrow={1} />

        <Typography
          variant="body1"
          color="rgba(0, 0, 0, 0.6)"
          textAlign={"center"}
          display={{
            xs: "none",
            md: "block",
          }}
        >
          {moment().format("dddd, MMMM Do YYYY")}
        </Typography>
        <NotificationsIcon />
      </Stack>
    </Paper>
  );
  return (
    <AdminLayout>
      <Container component={"main"}>
        {Appbar}

        <Stack
          direction={"row"}
          spacing={"1rem"}
          flexWrap={"wrap"}
          justifyContent={"center"}
          alignItems={{
            xs: "center",
            lg: "stretch",
          }}
        >
          <Paper
            elevation={4}
            sx={{
              padding: "2rem 3.5rem",
              borderRadius: "1rem",
              width: "100%",
              maxWidth: "40rem",
            }}
          >
            <Typography variant="h4" margin={"2rem 0"}>
              Last Messages
            </Typography>

            <LineChart value={[23, 12, 45, 11, 67, 33, 89, 2]} />
          </Paper>
          <Paper
            elevation={4}
            sx={{
              padding: "1rem",
              borderRadius: "1rem",

              width: {
                xs: "100%",
                sm: "50%",
              },

              top: {
                xs: "2rem",
                sm: "2rem",
                md: "2rem",
                lg: "2rem",
                xl: "0",
              },

              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              maxWidth: "25rem",
              width: "100%",
              position: "relative",
            }}
          >
            <DoughnutChart
              labels={["Group Chats", "Single Chats"]}
              value={[23, 66]}
            />
            <Stack
              position={"absolute"}
              direction={"row"}
              justifyContent={"center"}
              alignItems={"center"}
              spacing={"0.5rem"}
              height={"100%"}
              width={"100%"}
            >
              <GroupIcon />
              <Typography>Vs</Typography>
              <PersonIcon />
            </Stack>
          </Paper>
        </Stack>
        {Widgets}
      </Container>
    </AdminLayout>
  );
};

export default Dashboard;
