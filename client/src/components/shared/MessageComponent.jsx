import React, { memo } from "react";
import { Typography, Box } from "@mui/material";
import moment from "moment";
import { fileFormat } from "../../lib/features";
import RenderAttachment from "./RenderAttachment";

const MessageComponent = ({ message, user }) => {
  // console.log(message, "message");
  const { attachments = [], sender, content, createdAt } = message || {};

  const sameSender = sender?._id === user?._id;

  const TimeAgo = moment(createdAt).fromNow();
  return (
    <div
      style={{
        alignSelf: sameSender ? "flex-end" : "flex-start",
        borderRadius: "5px",
        backgroundColor: "white",
        color: "black",
        padding: "0.5rem",
        width: "fit-content",
      }}
    >
      {!sameSender && (
        <Typography variant="caption" color="#2694ab" fontWeight={"600"}>
          {sender?.name}
        </Typography>
      )}
      {content && (
        <Typography variant="body1" color="initial">
          {("hi", content)}
        </Typography>
      )}

      {/* Attachment */}

      {attachments?.length > 0 &&
        attachments?.map((attachment, index) => {
          const url = attachment.url;
          const file = fileFormat(url);

          return (
            <Box key={index}>
              <a
                href={url}
                target="_blank"
                download
                style={{
                  color: "black",
                }}
              >
                {RenderAttachment(file, url)}
              </a>
            </Box>
          );
        })}

      <Typography variant="caption" color={"text.secondary"}>
        {TimeAgo}
      </Typography>
    </div>
  );
};

export default memo(MessageComponent);
