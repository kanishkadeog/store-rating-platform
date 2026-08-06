//store-rating-platform/frontend/src/pages/admin/Users.jsx

import { useEffect, useState } from "react";
import {
  Typography,
  CircularProgress,
  Box,
} from "@mui/material";
import { toast } from "react-toastify";

import DashboardLayout from "../../components/layout/DashboardLayout";
import UserTable from "../../components/users/UserTable";
import UserSearch from "../../components/users/UserSearch";
import Pagination from "@mui/material/Pagination";

import DeleteUserDialog from "../../components/users/DeleteUserDialog";

import {
  getAllUsers,
  deleteUser,
} from "../../services/user.service";

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

   // Search State
  const [searchTerm, setSearchTerm] = useState("");

  const [page, setPage] = useState(1);

  const [openDelete, setOpenDelete] = useState(false);

const [selectedUserId, setSelectedUserId] =
  useState(null);

const rowsPerPage = 5;

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await getAllUsers();

      setUsers(response.data);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Failed to fetch users"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (id) => {
  setSelectedUserId(id);
  setOpenDelete(true);
};

const handleDelete = async () => {
  try {
    const response = await deleteUser(selectedUserId);

    toast.success(response.message);

    // Refresh users list
    fetchUsers();

    // Close dialog
    setOpenDelete(false);

    // Clear selected user
    setSelectedUserId(null);

  } catch (error) {
    toast.error(
      error.response?.data?.message ||
      "Delete failed"
    );
  }
};

   // Filter Users
  const filteredUsers = users.filter((user) => {
    const keyword = searchTerm.toLowerCase();

    return (
      user.name.toLowerCase().includes(keyword) ||
      user.email.toLowerCase().includes(keyword) ||
      user.address.toLowerCase().includes(keyword) ||
      user.role.toLowerCase().includes(keyword)
    );
  });

  const totalPages = Math.ceil(
  filteredUsers.length / rowsPerPage
);

const paginatedUsers = filteredUsers.slice(
  (page - 1) * rowsPerPage,
  page * rowsPerPage
);

  if (loading) {
    return (
      <DashboardLayout>
        <Box
          display="flex"
          justifyContent="center"
          mt={8}
        >
          <CircularProgress />
        </Box>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <Typography
        variant="h4"
        fontWeight="bold"
        mb={3}
      >
        Users Management
      </Typography>

      <>
  <UserSearch
    searchTerm={searchTerm}
    setSearchTerm={setSearchTerm}
    setPage={setPage}

  />

  <UserTable
  users={paginatedUsers}
  onDelete={handleDeleteClick}
/>

  <Box
  display="flex"
  justifyContent="center"
  mt={3}
>
  <Pagination
    count={totalPages}
    page={page}
    color="primary"
    onChange={(event, value) =>
      setPage(value)
    }
  />
</Box>

<DeleteUserDialog
  open={openDelete}
  onClose={() => {
    setOpenDelete(false);
    setSelectedUserId(null);
  }}
  onDelete={handleDelete}
/>

</>

    </DashboardLayout>
  );
}

export default Users;