import { useInputValidation } from "6pp";
import { Search as SearchIcon } from "@mui/icons-material";
import {
  CircularProgress,
  Dialog,
  DialogTitle,
  InputAdornment,
  List,
  Box,
  ListItem,
  Stack,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLazySearchUserQuery } from "../../redux/api/api";
import { setIsSearch } from "../../redux/reducers/misc";
import UserItem from "../shared/UserItem";

const Search = () => {
  const search = useInputValidation("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const addFriendHandler = () => {
    console.log("addFriendHandler");
  };

  const { isSearch } = useSelector((state) => state.misc);

  const [searchUser] = useLazySearchUserQuery();

  const handleSearchClose = () => dispatch(setIsSearch(false));

  const isLoadingSendFriendRequest = false;

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      setLoading(true);
      searchUser(search.value)
        .unwrap()
        .then((data) => {
          console.log(data.users);
          setUsers(data.users);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    }, 1000);

    return () => clearTimeout(timeOutId);
  }, [search.value]);

  return (
    <Dialog open={isSearch} onClose={handleSearchClose}>
      <Stack p={"2rem"} direction={"column"} width={"25rem"}>
        <DialogTitle textAlign={"center"}>Find People</DialogTitle>
        <TextField
          label=""
          value={search.value}
          onChange={search.changeHandler}
          variant="outlined"
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "2rem",
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <List>
            {users.map((user) => (
              <ListItem key={user._id}>
                <UserItem
                  user={user}
                  key={user._id}
                  handler={addFriendHandler}
                  handlerIsLoading={isLoadingSendFriendRequest}
                />
              </ListItem>
            ))}
          </List>
        )}
      </Stack>
    </Dialog>
  );
};

export default Search;
