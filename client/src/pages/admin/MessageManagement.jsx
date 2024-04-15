import { Box, Stack } from "@mui/material";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { DashboardData } from "../../components/constants/SampleData";
import AdminLayout from "../../components/layout/AdminLayout";
import AvatarCard from "../../components/shared/AvatarCard";
import RenderAttachment from "../../components/shared/RenderAttachment";
import Table from "../../components/shared/Table";
import { fileFormat, transformImage } from "../../lib/features";

const columns = [
  {
    field: "id",
    headerName: "ID",
    width: 200,
    headerClassName: "table-header",
  },
  {
    field: "attachments",
    headerName: "Attachments",
    width: 200,
    headerClassName: "table-header",
    renderCell: (params) => {
      const { attachments } = params.row;
      return attachments?.length > 0
        ? attachments.map((attachment, index) => {
            const url = attachment.url;
            const file = fileFormat(url);
            return (
              <Box
                key={index}
                sx={{ display: "flex", flexDirection: "column" }}
              >
                <a
                  href={url}
                  download
                  target="_blank"
                  style={{ color: "black" }}
                >
                  {RenderAttachment(file, url)}
                </a>
              </Box>
            );
          })
        : "No Attachments";
    },
  },
  {
    field: "content",
    headerName: "Content",
    width: 200,
    headerClassName: "table-header",
  },
  {
    field: "sender",
    headerName: "Send By",
    width: 200,
    headerClassName: "table-header",
    renderCell: (params) => (
      <Stack direction={"row"} spacing={"1rem"} alignItems={"center"}>
        <AvatarCard alt={params.row.name} avatar={params.row.sender.avatar} />
        <span>{params.row.sender.name}</span>
      </Stack>
    ),
  },
  {
    field: "chat",
    headerName: "Chat",
    width: 220,
    headerClassName: "table-header",
  },
  {
    field: "groupChat",
    headerName: "GroupChat",
    width: 100,
    headerClassName: "table-header",
  },
  {
    field: "createdAt",
    headerName: "Time",
    width: 250,
    headerClassName: "table-header",
  },
];
const MessageManagement = () => {
  const [rows, setRows] = useState([]);
  useEffect(() => {
    setRows(
      DashboardData.messages.map((message) => ({
        ...message,
        id: message._id,
        sender: {
          name: message.sender.name,
          avatar: transformImage(message.sender.avatar, 50),
        },
        createdAt: moment(message.createdAt).format("MMMM Do YYYY, h:mm:ss a"),
      }))
    );
  }, []);
  return (
    <AdminLayout>
      <Table
        heading={"Messages "}
        rows={rows}
        columns={columns}
        rowHeight={200}
      />
    </AdminLayout>
  );
};

export default MessageManagement;
