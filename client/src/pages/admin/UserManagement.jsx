import React, { useState } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import Table from "../../components/shared/Table";
import { Avatar } from "@mui/material";

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

  return (
    <AdminLayout>
      <Table heading={"All Users"} columns={columns} rows={rows}></Table>
    </AdminLayout>
  );
};

export default UserManagement;
