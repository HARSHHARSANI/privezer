import { Button, Dialog, DialogTitle, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { SampleUsers } from "../constants/SampleData";
import UserItem from "../shared/UserItem";

const AddMemberDialog = ({ addmember, isLoadingAddMember, chatId }) => {
  const [members, setMembers] = useState(SampleUsers);

  const [selectedMembers, setSelectedMembers] = useState([]);

  const selectMemberHandler = (id) => {
    setSelectedMembers((prev) =>
      prev.includes(id)
        ? prev.filter((currentelement) => currentelement !== id)
        : [...prev, id]
    );
  };

  const AddMemberSubmitHandler = () => {
    console.log("AddMemberSubmitHandler");
    closeHandler();
  };

  const closeHandler = () => {
    console.log("closeHandler");
    setMembers([]);
    setSelectedMembers([]);
  };

  return (
    <Dialog open onClose={closeHandler}>
      <Stack p={"2rem"} width={"20rem"} spacing={"2rem"}>
        <DialogTitle textAlign={"center"}>Add Member</DialogTitle>

        <Stack spacing={"1rem"}>
          {members.length > 0 ? (
            members.map((user) => (
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
          <Button color="error" variant="outlined" onClick={closeHandler}>
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
