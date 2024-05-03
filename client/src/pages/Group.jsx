import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Done as DoneIcon,
  Edit as EditIcon,
  KeyboardBackspace as KeyboardBackspaceIcon,
  Menu as MenuIcons,
} from "@mui/icons-material";
import { Backdrop, Button, Drawer, TextField } from "@mui/material";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import React, { Suspense, lazy, memo, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { SampleUsers } from "../components/constants/SampleData";
import { backGround, orange } from "../components/constants/color";
import { useErrors } from "../components/hooks/hook";
import { LayoutLoaders } from "../components/layout/Loaders";
import AvatarCard from "../components/shared/AvatarCard";
import UserItem from "../components/shared/UserItem";
import { Link } from "../components/styles/StyledComponent";
import { useGetMyGroupsQuery } from "../redux/api/api";

const ConfirmDeleteDialog = lazy(() =>
  import("../components/dialogs/ConfirmDeleteDialog")
);

const AddMemberDialog = lazy(() =>
  import("../components/dialogs/AddMemberDialog")
);

const Group = () => {
  const navigate = useNavigate();

  const chatId = useSearchParams()[0].get("group");

  const myGroups = useGetMyGroupsQuery("");

  const selectedGroup = myGroups?.data?.groups?.find(
    (group) => group._id === chatId
  );

  console.log(myGroups, "myGroups.data");

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [groupNameUpdated, setGroupNameUpdated] = useState("");
  const [confirmDeleteDialog, setConfirmDeleteDialog] = useState(false);

  useErrors([{ isError: myGroups.isError, error: myGroups.error }]);

  const navigateBack = () => {
    navigate("/");
  };

  const isAddMember = false;

  const handleMobile = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const deleteHandler = () => {
    console.log("deleteHandler");
  };

  const handleMobileClose = () => {
    setIsMobileMenuOpen(false);
  };

  const updateGroupName = () => {
    setIsEdit(false);
    console.log("updateGroupName", groupNameUpdated);
  };

  const openConfirmDeleteHandler = () => {
    setConfirmDeleteDialog(true);
    console.log("confirmDeleteHandler");
  };

  const closeConfirmDeleteHandler = () => {
    setConfirmDeleteDialog(false);
    console.log("confirmDeleteHandler");
  };

  const openAddMemberHandler = () => {
    console.log("openAddMemberHandler");
  };

  const removeMemberHandler = (id) => {
    console.log("removeMemberHandler", id);
  };

  useEffect(() => {
    if (chatId) {
      const groupName = myGroups?.data?.groups?.find(
        (group) => group._id === chatId
      );

      setGroupName(`${groupName?.name} `);
      setGroupNameUpdated(`${groupName?.name} `);
    }
    return () => {
      setGroupName("");
      setGroupNameUpdated("");
      setIsEdit(false);
    };
  }, [chatId]);

  const GroupName = (
    <Stack
      direction={"row"}
      spacing={"1rem"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      {isEdit ? (
        <>
          <TextField
            value={groupNameUpdated}
            onChange={(e) => setGroupNameUpdated(e.target.value)}
          />
          <IconButton onClick={updateGroupName}>
            <DoneIcon />
          </IconButton>
        </>
      ) : (
        <>
          <Typography variant="h4">{groupName}</Typography>
          <IconButton onClick={() => setIsEdit(true)}>
            <EditIcon />
          </IconButton>
        </>
      )}
    </Stack>
  );

  const ButtonGroupComponent = (
    <>
      <Stack
        direction={{ xs: "column-reverse", sm: "row" }}
        spacing={"1rem"}
        justifyContent={"center"}
        padding={{
          xs: "0",
          sm: "1rem",
          md: "1rem 4rem",
        }}
      >
        <Button
          size="large"
          color="error"
          variant="outlined"
          startIcon={<DeleteIcon />}
          onClick={openConfirmDeleteHandler}
        >
          Delete Group
        </Button>
        <Button
          size="large"
          variant="contained"
          startIcon={<AddIcon />}
          onClick={openAddMemberHandler}
        >
          Add Member
        </Button>
      </Stack>
    </>
  );

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

  return myGroups.isLoading ? (
    <LayoutLoaders />
  ) : (
    <>
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
          bgcolor={backGround}
        >
          <GroupsList myGroups={myGroups?.data?.groups} chatId={chatId} />
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

          {groupName && (
            <>
              {GroupName}

              <Typography margin={"2rem"} marginTop={"2rem"} variant="h5">
                Members
              </Typography>

              <Stack
                padding={{ sm: "1rem", xs: "0", md: "1rem 4rem " }}
                height={"50vh"}
                overflow={"auto"}
                spacing={"2rem"}
                maxweidth={"45rem"}
                width={"100%"}
                boxSizing={"border-box"}
              >
                {/* Members */}
                {selectedGroup.members.map((user) => {
                  console.log(selectedGroup.members, "selectedGroup.members");
                  return (
                    <UserItem
                      user={user}
                      key={user._id}
                      isAdded
                      styling={{
                        boxShadow: "0 0 0.5rem 0 rgba(0,0,0,0.2)",
                        padding: "1rem 2rem",
                        borderRadius: "2rem",
                      }}
                      handler={removeMemberHandler}
                    />
                  );
                })}
              </Stack>

              {ButtonGroupComponent}
            </>
          )}
        </Grid>

        {isAddMember && (
          <Suspense fallback={<Backdrop open />}>
            <AddMemberDialog />
          </Suspense>
        )}

        {confirmDeleteDialog && (
          <>
            <Suspense fallback={<Backdrop open />}>
              <ConfirmDeleteDialog
                open={confirmDeleteDialog}
                handleClose={closeConfirmDeleteHandler}
                deleteHandler={deleteHandler}
              />
            </Suspense>
          </>
        )}

        <Drawer
          open={isMobileMenuOpen}
          onClose={handleMobileClose}
          sx={{
            display: {
              xs: "block",
              sm: "none",
            },
          }}
        >
          <GroupsList myGroups={myGroups.data} chatId={chatId} w="80vw" />
        </Drawer>
      </Grid>
    </>
  );
};

const GroupsList = ({ w = "100%", myGroups = [], chatId }) => {
  // console.log(myGroups, "myGroups in GroupsList");

  return (
    <Stack
      w={w}
      sx={{
        backgroundImage: `linear-gradient(to right, #FFD2D2, #FF6464)`,
        height: "100vh",
      }}
    >
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

const GroupListItems = memo(({ group = [], chatId }) => {
  console.log(group, "group in GroupListItems");

  const { name, _id, members = [], avatar } = group;

  return (
    <Link
      to={`?group=${_id}`}
      onClick={(e) => {
        if (chatId === _id) e.preventDefault();
      }}
      key={_id}
    >
      <Stack
        direction={"row"}
        spacing={"2rem"}
        alignItems={"center"}
        width={"50vw"}
      >
        <AvatarCard avatar={avatar} />
        <Typography>{name}</Typography>
      </Stack>
    </Link>
  );
});

export default Group;
