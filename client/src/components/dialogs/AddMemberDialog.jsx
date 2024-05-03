import { Button, Dialog, DialogTitle, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAvailableFriendsQuery } from "../../redux/api/api";
import { setIsAddMember } from "../../redux/reducers/misc";
import UserItem from "../shared/UserItem";

const AddMemberDialog = ({ addmember, isLoadingAddMember, chatId }) => {
  const dispatch = useDispatch();

  const availableFriends = useAvailableFriendsQuery(chatId);

  // console.log(availableFriends, "availableFriends");

  const { isAddMember } = useSelector((state) => state.misc);

  const [selectedMembers, setSelectedMembers] = useState([]);

  const selectMemberHandler = (id) => {
    setSelectedMembers((prev) =>
      prev.includes(id)
        ? prev.filter((currentelement) => currentelement !== id)
        : [...prev, id]
    );
  };

  const AddMemberSubmitHandler = () => {
    addmember("Adding Selected Members ...", {
      chatId,
      members: selectedMembers,
    });
    console.log("AddMemberSubmitHandler");
    closeHandler();
  };

  const closeHandler = () => {
    dispatch(setIsAddMember(false));
    console.log("closeHandler");
    setMembers([]);
    setSelectedMembers([]);
  };

  return (
    <Dialog open={isAddMember} onClose={closeHandler}>
      <Stack p={"2rem"} width={"20rem"} spacing={"2rem"}>
        <DialogTitle textAlign={"center"}>Add Member</DialogTitle>

        <Stack spacing={"1rem"}>
          {availableFriends?.data?.allAvailableFriends?.length > 0 ? (
            availableFriends?.data?.allAvailableFriends?.map((user) => (
              <UserItem
                user={user}
                key={user.id}
                handler={selectMemberHandler}
                isAdded={selectedMembers.includes(user._id)}
              />
            ))
          ) : (
            <Typography variant="inherit" textAlign={"center"}>
              No Friends
            </Typography>
          )}
        </Stack>
        <Stack
          direction={"row"}
          justifyContent={"space-around"}
          alignItems={"center"}
        >
          {" "}
          <Button
            color="error"
            variant="outlined"
            onClick={closeHandler}
            disabled={isLoadingAddMember}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            disabled={isLoadingAddMember}
            onClick={AddMemberSubmitHandler}
          >
            Submit
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};
export default AddMemberDialog;
