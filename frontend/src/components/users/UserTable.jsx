//store-rating-platform/frontend/src/components/users/UserTable.jsx

import {
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  IconButton,
  Tooltip,
  TableSortLabel,
} from "@mui/material";

import {
  Visibility,
  Edit,
  Delete,
} from "@mui/icons-material";

import { useNavigate } from "react-router-dom";

function UserTable({
  users,
  onDelete,
  sortBy,
  sortOrder,
  onSort,
}) {
    const navigate = useNavigate();

  return (
    <TableContainer component={Paper}>
      <Table>

        <TableHead>
          <TableRow>

            <TableCell>
  <TableSortLabel
    active={sortBy === "name"}
    direction={
      sortBy === "name"
        ? sortOrder.toLowerCase()
        : "asc"
    }
    onClick={() => onSort("name")}
  >
    <b>Name</b>
  </TableSortLabel>
</TableCell>

<TableCell>
  <TableSortLabel
    active={sortBy === "email"}
    direction={
      sortBy === "email"
        ? sortOrder.toLowerCase()
        : "asc"
    }
    onClick={() => onSort("email")}
  >
    <b>Email</b>
  </TableSortLabel>
</TableCell>

<TableCell>
  <TableSortLabel
    active={sortBy === "address"}
    direction={
      sortBy === "address"
        ? sortOrder.toLowerCase()
        : "asc"
    }
    onClick={() => onSort("address")}
  >
    <b>Address</b>
  </TableSortLabel>
</TableCell>

<TableCell>
  <TableSortLabel
    active={sortBy === "role"}
    direction={
      sortBy === "role"
        ? sortOrder.toLowerCase()
        : "asc"
    }
    onClick={() => onSort("role")}
  >
    <b>Role</b>
  </TableSortLabel>
</TableCell>

            <TableCell align="center">
              <b>Actions</b>
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>

          {users.map((user) => (

            <TableRow key={user.id}>

              <TableCell>{user.name}</TableCell>

              <TableCell>{user.email}</TableCell>

              <TableCell>{user.address}</TableCell>

              <TableCell>{user.role}</TableCell>

              <TableCell align="center">

                <Tooltip title="View">

                  <IconButton
                    color="primary"
                    onClick={() =>
                      navigate(`/admin/users/${user.id}`)
                    }
                  >
                    <Visibility />
                  </IconButton>

                </Tooltip>

                <Tooltip title="Edit">

                  <IconButton
                    color="warning"
                    onClick={() =>
                      navigate(`/admin/users/edit/${user.id}`)
                    }
                  >
                    <Edit />
                  </IconButton>

                </Tooltip>

                <Tooltip title="Delete">

                  <IconButton
                     color="error"
                     onClick={() => onDelete(user.id)}
                    >
                    <Delete />
                  </IconButton>

                </Tooltip>

              </TableCell>

            </TableRow>

          ))}

        </TableBody>

      </Table>
    </TableContainer>
  );
}

export default UserTable;