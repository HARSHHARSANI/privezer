import {
  AudioFile as AudioFileIcon,
  Image as ImageIcon,
  UploadFile as UploadFileIcon,
  VideoFile as VideoIcon,
} from "@mui/icons-material";
import { ListItemText, Menu, MenuItem, MenuList, Tooltip } from "@mui/material";
import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsFileMenu, setUploadingLoader } from "../../redux/reducers/misc";
import toast from "react-hot-toast";
import { useSendAttachmentsMutation } from "../../redux/api/api";

const FileMenu = ({ anchorE1, chatId }) => {
  const dispatch = useDispatch();
  const { isFileMenu } = useSelector((state) => state.misc);

  const closeFileMenuHandler = () => {
    dispatch(setIsFileMenu(false));
  };

  const [sendAttachments] = useSendAttachmentsMutation();

  const imageRef = useRef(null);
  const audioRef = useRef(null);
  const videoRef = useRef(null);
  const fileRef = useRef(null);

  const selectImage = () => imageRef.current?.click();
  const selectAudio = () => audioRef.current?.click();
  const selectVideo = () => videoRef.current?.click();
  const selectFile = () => fileRef.current?.click();

  const fileChangeHandler = async (e, key) => {
    const files = Array.from(e.target.files);

    if (files.length <= 0) return;
    if (files.length > 5)
      return toast.alert(`You can only upload 5 ${key} at a time`);

    dispatch(setUploadingLoader(true));

    const taostId = toast.loading("Uploading...");

    closeFileMenuHandler();

    try {
      ///fetching here

      const myForm = new FormData();

      myForm.append("chatId", chatId);
      files.forEach((file) => {
        myForm.append("files", file);
      });

      const res = await sendAttachments(myForm);

      console.log(res.data, "res.data");

      if (res.data) {
        toast.success(`Uploaded ${key} successfully`, {
          id: taostId,
        });
      } else {
        toast.error(`Failed to upload ${key}`, {
          id: taostId,
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setUploadingLoader(false));
    }
  };

  return (
    <Menu anchorEl={anchorE1} open={isFileMenu} onClose={closeFileMenuHandler}>
      <MenuList
        sx={{
          width: "10rem",
        }}
      >
        <MenuItem onClick={selectImage}>
          <Tooltip title="Image">
            <ImageIcon />
          </Tooltip>
          <ListItemText
            primary="Image"
            style={{
              marginLeft: "0.5rem",
            }}
          />
          <input
            type="file"
            multiple
            accept="image/png, image/jpeg, image/gif"
            style={{
              display: "none",
            }}
            onChange={(e) => fileChangeHandler(e, "Images")}
            ref={imageRef}
          />
        </MenuItem>
        <MenuItem onClick={selectAudio}>
          <Tooltip title="Audio">
            <AudioFileIcon />
          </Tooltip>
          <ListItemText
            primary="Audio"
            style={{
              marginLeft: "0.5rem",
            }}
          />
          <input
            type="file"
            multiple
            accept="audio/mpeg ,audio/wav "
            style={{
              display: "none",
            }}
            onChange={(e) => fileChangeHandler(e, "Audios")}
            ref={audioRef}
          />
        </MenuItem>
        <MenuItem onClick={selectVideo}>
          <Tooltip title="Video">
            <VideoIcon />
          </Tooltip>
          <ListItemText
            primary="Video"
            style={{
              marginLeft: "0.5rem",
            }}
          />
          <input
            type="file"
            multiple
            accept="video/mp3, video/wav,"
            style={{
              display: "none",
            }}
            onChange={(e) => fileChangeHandler(e, "Videos")}
            ref={videoRef}
          />
        </MenuItem>
        <MenuItem onClick={selectFile}>
          <Tooltip title="File">
            <UploadFileIcon />
          </Tooltip>
          <ListItemText
            primary="Files"
            style={{
              marginLeft: "0.5rem",
            }}
          />
          <input
            type="file"
            multiple
            accept="*"
            style={{
              display: "none",
            }}
            onChange={(e) => fileChangeHandler(e, "Files")}
            ref={fileRef}
          />
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default FileMenu;
