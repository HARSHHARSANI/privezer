import { useInputValidation } from "6pp";
import {
  Button,
  Dialog,
  DialogTitle,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useAvailableFriendsQuery,
  useCreateNewGroupMutation,
} from "../../redux/api/api";
import { setIsNewGroup } from "../../redux/reducers/misc";
import { useErrors, useAsyncMutation } from "../hooks/hook";
import UserItem from "../shared/UserItem";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const NewGroups = () => {
  const [selectedMembers, setSelectedMembers] = useState([]);

  const dispatch = useDispatch();
  const { isNewGroup } = useSelector((state) => state.misc);

  const { isError, isLoading, data, error } = useAvailableFriendsQuery("");

  const [newGroup, isloadingNewGroup] = useAsyncMutation(
    useCreateNewGroupMutation
  );

  const selectMemberHandler = (id) => {
    setSelectedMembers((prev) =>
      prev.includes(id)
        ? prev.filter((currentelement) => currentelement !== id)
        : [...prev, id]
    );
  };

  const groupName = useInputValidation("");

  const submitHandler = () => {
    if (!groupName.value) return toast.error("Group Name is required");
    if (selectedMembers.length < 2)
      return toast.error("Add atleast one member to create a group");

    console.log(groupName.value, "groupName");
    console.log(selectedMembers, "selectedMembers");
    ///create group
    newGroup("Creating New Group", {
      name: groupName.value,
      members: selectedMembers,
    });

    closeHandler();
  };

  const closeHandler = () => {
    dispatch(setIsNewGroup(false));
  };

  useErrors([{ isError, error: null }]);

  return (
    <Dialog open={isNewGroup} onClose={closeHandler}>
      <Stack
        p={{
          xs: "1rem",
          sm: "3rem",
        }}
        width={"25rem"}
        spacing={"1rem"}
      >
        <DialogTitle
          sx={{
            textAlign: "center",
          }}
          variant="h5"
        >
          New Group
        </DialogTitle>

        <TextField
          label="Group Name"
          value={groupName.value}
          onChange={groupName.changeHandler}
        />

        <Typography variant="body1" color="initial">
          Add Members
        </Typography>

        <Stack>
          {isLoading ? (
            <Skeleton />
          ) : (
            <motion.div
              initial={{ opacity: 0, y: "40" }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {data?.allFriends?.map((user) => (
                <UserItem
                  user={user}
                  key={user._id}
                  handler={selectMemberHandler}
                  isAdded={selectedMembers.includes(user._id)}
                />
              ))}
            </motion.div>
          )}
        </Stack>

        <Stack
          direction={"row"}
          spacing={"1rem"}
          sx={{
            justifyContent: "space-around",
            marginTop: "1rem",
          }}
        >
          <Button
            variant="text"
            color="error"
            size="large"
            onClick={closeHandler}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            size="large"
            onClick={submitHandler}
            disabled={isloadingNewGroup}
          >
            Create
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default NewGroups;
