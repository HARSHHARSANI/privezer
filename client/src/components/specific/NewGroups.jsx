import { useInputValidation } from "6pp";
import {
  Button,
  Dialog,
  DialogTitle,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { SampleUsers } from "../constants/SampleData";
import UserItem from "../shared/UserItem";

const NewGroups = () => {
  const [members, setMembers] = useState(SampleUsers);

  const [selectedMembers, setSelectedMembers] = useState([]);

  const selectMemberHandler = (id) => {
    setSelectedMembers((prev) =>
      prev.includes(id)
        ? prev.filter((currentelement) => currentelement !== id)
        : [...prev, id]
    );
  };
  console.log(selectedMembers);
  const groupName = useInputValidation("");

  const submitHandler = () => {
    console.log("submitHandler");
  };

  const closeHandler = () => {
    console.log("closeHandler");
  };
  return (
    <Dialog open>
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
          {members.map((user) => (
            <UserItem
              user={user}
              key={user._id}
              handler={selectMemberHandler}
              isAdded={selectedMembers.includes(user._id)}
            />
          ))}
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
          <Button variant="contained" size="large" onClick={submitHandler}>
            Create
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default NewGroups;
