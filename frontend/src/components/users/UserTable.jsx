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

    // --------------------------------------------------
    // Common styling for sorting headers
    // --------------------------------------------------

    const getSortLabelStyles = (field) => {
        const isActive = sortBy === field;

        return {
            fontWeight: isActive ? 700 : 600,

            color: isActive
                ? "#111827"
                : "#374151",

            "& .MuiTableSortLabel-icon": {
                opacity: 1,
                color: isActive
                    ? "#111827 !important"
                    : "#6B7280 !important",
            },

            "&:hover": {
                color: "#111827",

                "& .MuiTableSortLabel-icon": {
                    color: "#111827 !important",
                    opacity: 1,
                },
            },
        };
    };

    return (
        <TableContainer component={Paper}>

            <Table>

                {/* =================================================
                    TABLE HEADER
                ================================================== */}

                <TableHead>

                    <TableRow>

                        {/* =========================
                            NAME
                        ========================== */}

                        <TableCell>

                            <TableSortLabel
                                active={sortBy === "name"}
                                direction={
                                    sortBy === "name"
                                        ? sortOrder.toLowerCase()
                                        : "asc"
                                }
                                onClick={() =>
                                    onSort("name")
                                }
                                sx={getSortLabelStyles("name")}
                            >
                                Name
                            </TableSortLabel>

                        </TableCell>


                        {/* =========================
                            EMAIL
                        ========================== */}

                        <TableCell>

                            <TableSortLabel
                                active={sortBy === "email"}
                                direction={
                                    sortBy === "email"
                                        ? sortOrder.toLowerCase()
                                        : "asc"
                                }
                                onClick={() =>
                                    onSort("email")
                                }
                                sx={getSortLabelStyles("email")}
                            >
                                Email
                            </TableSortLabel>

                        </TableCell>


                        {/* =========================
                            ADDRESS
                        ========================== */}

                        <TableCell>

                            <TableSortLabel
                                active={sortBy === "address"}
                                direction={
                                    sortBy === "address"
                                        ? sortOrder.toLowerCase()
                                        : "asc"
                                }
                                onClick={() =>
                                    onSort("address")
                                }
                                sx={getSortLabelStyles("address")}
                            >
                                Address
                            </TableSortLabel>

                        </TableCell>


                        {/* =========================
                            ROLE
                        ========================== */}

                        <TableCell>

                            <TableSortLabel
                                active={sortBy === "role"}
                                direction={
                                    sortBy === "role"
                                        ? sortOrder.toLowerCase()
                                        : "asc"
                                }
                                onClick={() =>
                                    onSort("role")
                                }
                                sx={getSortLabelStyles("role")}
                            >
                                Role
                            </TableSortLabel>

                        </TableCell>


                        {/* =========================
                            ACTIONS
                        ========================== */}

                        <TableCell align="center">

                            <b>Actions</b>

                        </TableCell>

                    </TableRow>

                </TableHead>


                {/* =================================================
                    TABLE BODY
                ================================================== */}

                <TableBody>

                    {users.length === 0 ? (

                        <TableRow>

                            <TableCell
                                colSpan={5}
                                align="center"
                            >
                                No users found
                            </TableCell>

                        </TableRow>

                    ) : (

                        users.map((user) => (

                            <TableRow
                                key={user.id}
                                hover
                            >

                                {/* NAME */}

                                <TableCell>
                                    {user.name}
                                </TableCell>


                                {/* EMAIL */}

                                <TableCell>
                                    {user.email}
                                </TableCell>


                                {/* ADDRESS */}

                                <TableCell>
                                    {user.address}
                                </TableCell>


                                {/* ROLE */}

                                <TableCell>
                                    {user.role}
                                </TableCell>


                                {/* ACTIONS */}

                                <TableCell align="center">

                                    {/* VIEW */}

                                    <Tooltip title="View">

                                        <IconButton
                                            color="primary"
                                            onClick={() =>
                                                navigate(
                                                    `/admin/users/${user.id}`
                                                )
                                            }
                                        >
                                            <Visibility />
                                        </IconButton>

                                    </Tooltip>


                                    {/* EDIT */}

                                    <Tooltip title="Edit">

                                        <IconButton
                                            color="warning"
                                            onClick={() =>
                                                navigate(
                                                    `/admin/users/edit/${user.id}`
                                                )
                                            }
                                        >
                                            <Edit />
                                        </IconButton>

                                    </Tooltip>


                                    {/* DELETE */}

                                    <Tooltip title="Delete">

                                        <IconButton
                                            color="error"
                                            onClick={() =>
                                                onDelete(user.id)
                                            }
                                        >
                                            <Delete />
                                        </IconButton>

                                    </Tooltip>

                                </TableCell>

                            </TableRow>

                        ))

                    )}

                </TableBody>

            </Table>

        </TableContainer>
    );
}

export default UserTable;