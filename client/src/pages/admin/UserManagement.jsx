import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import Table from "../../components/shared/Table";
import { Avatar } from "@mui/material";
import { DashboardData } from "../../components/constants/SampleData";
import { transformImage } from "../../lib/features";

const UserManagement = () => {
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
        <Avatar alt={params.row.name} src={params.row.avatar} />
      ),
    },
    {
      field: "name",
      headerName: "Name",
      width: 200,
      headerClassName: "table-header",
    },
    {
      field: "username",
      headerName: "Username",
      width: 200,
      headerClassName: "table-header",
    },
    {
      field: "friends",
      headerName: "Friends",
      width: 150,
      headerClassName: "table-header",
    },
    {
      field: "groups",
      headerName: "Groups",
      width: 200,
      headerClassName: "table-header",
    },
  ];
  const [rows, setRows] = useState([]);

  useEffect(() => {
    setRows(
      DashboardData.users.map((user) => ({
        ...user,
        id: user._id,
        avatar: transformImage(user.avatar, 50),
      }))
    );
  }, []);

  return (
    <AdminLayout>
      <Table heading={"All Users"} columns={columns} rows={rows}></Table>
    </AdminLayout>
  );
};

export default UserManagement;
