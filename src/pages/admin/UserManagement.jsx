import AdminLayout from "../../components/layout/AdminLayout";
import Table from "../../components/shared/Table";
import { useEffect, useState } from "react";
import { Avatar, Skeleton } from "@mui/material";
import { transformImage } from "../../lib/features";
import { useFetchData } from "6pp";
import { server } from "../../constants/config";
import { useErrors } from "../../hooks/hook";
//creating column
const columns = [
  {
    field: "id",
    headerName: "ID",
    headerClassName: "table-header",
    width: 200,
  },
  {
    field: "avatar",
    headerName: "Avatar",
    headerClassName: "table-header",
    width: 150,
    renderCell: (params) => <Avatar alt={params.row.name} src={params.row.avatar} />,
  },
  {
    field: "name",
    headerName: "Name",
    headerClassName: "table-header",
    width: 200,
  },
  {
    field: "username",
    headerName: "Username",
    headerClassName: "table-header",
    width: 200,
  },
  {
    field: "friends",
    headerName: "Friends",
    headerClassName: "table-header",
    width: 150,
  },
  {
    field: "groups",
    headerName: "Groups",
    headerClassName: "table-header",
    width: 200,
  },
];

const UserManagement = () => {
  const { loading, data, error } = useFetchData(`${server}/api/v1/admin/users`, "dashboard-users");

  useErrors([
    {
      isError: error,
      error: error,
    },
  ]);

  const [rows, setRows] = useState([]);

  //50 is the aspect ratio of the transformation image
  //fetch the data
  useEffect(() => {
    if (data) {
      setRows(data.users.map((i) => ({ ...i, id: i._id, avatar: transformImage(i.avatar, 50) })));
    }
  }, [data]);

  // useEffect(() => {
  //   setRows(dashboardData.users.map((i) => ({ ...i, id: i._id, avatar: transformImage(i.avatar, 50) })));
  // }, []);
  return <AdminLayout>{loading ? <Skeleton height={"100vh"} /> : <Table heading={"All Users"} columns={columns} rows={rows} />}</AdminLayout>;
};

export default UserManagement;
