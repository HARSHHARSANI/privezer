import { Avatar, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { DashboardData } from "../../components/constants/SampleData";
import AdminLayout from "../../components/layout/AdminLayout";
import AvatarCard from "../../components/shared/AvatarCard";
import Table from "../../components/shared/Table";
import { transformImage } from "../../lib/features";
const ChatManagement = () => {
  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 200,
      headerClassName: "table-header",
    },
    {
      field: "avatar",
      headerName: "Avatar",
      width: 150,
      headerClassName: "table-header",
      renderCell: (params) => (
        <AvatarCard alt={params.row.name} avatar={params.row.avatar} />
      ),
    },
    {
      field: "name",
      headerName: "Name",
      width: 300,
      headerClassName: "table-header",
    },
    {
      field: "totalMembers",
      headerName: "Total Members",
      width: 120,
      headerClassName: "table-header",
    },
    {
      field: "members",
      headerName: "Members",
      width: 400,
      headerClassName: "table-header",
      renderCell: (params) => (
        <AvatarCard max={100} avatar={params.row.members} />
      ),
    },
    {
      field: "totalMessages",
      headerName: "Total Messages",
      width: 120,
      headerClassName: "table-header",
    },
    {
      field: "creator",
      headerName: "Created By",
      width: 250,
      headerClassName: "table-header",
      renderCell: (params) => (
        <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
          <Avatar
            alt={params.row.creator.name}
            src={params.row.creator.avatar}
          />
          <span>{params.row.creator.name}</span>
        </Stack>
      ),
    },
  ];
  const [rows, setRows] = useState([]);

  useEffect(() => {
    setRows(
      DashboardData.chats.map((chat) => ({
        ...chat,
        id: chat._id,
        avatar: chat.avatar.map((i) => transformImage(i, 50)),
        members: chat.members.map((i) => transformImage(i.avatar, 50)),
        creator: {
          name: chat.creator.name,
          avatar: transformImage(chat.creator.avatar, 50),
        },
      }))
    );
  }, []);

  return (
    <AdminLayout>
      <Table heading={"All Chats"} columns={columns} rows={rows}></Table>
    </AdminLayout>
  );
};

export default ChatManagement;
