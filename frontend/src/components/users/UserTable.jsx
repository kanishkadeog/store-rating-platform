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
    Box,
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

    // =========================================================
    // Sorting Header Component
    // =========================================================

    const SortHeader = ({ field, children }) => {

        const isActive = sortBy === field;

        // Active column:
        // ASC  → ↑
        // DESC → ↓
        //
        // Inactive column:
        // ↕
        const sortIcon = !isActive
            ? "↕"
            : sortOrder === "ASC"
                ? "↑"
                : "↓";

        return (
            <Box
                component="button"
                onClick={() => onSort(field)}
                sx={{
                    // Remove default button styling
                    background: "none",
                    border: "none",
                    padding: 0,

                    // Cursor
                    cursor: "pointer",

                    // Layout
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",

                    // Text
                    fontFamily: "inherit",
                    fontSize: "inherit",

                    fontWeight: isActive
                        ? 700
                        : 600,

                    color: isActive
                        ? "#111827"
                        : "#374151",

                    // Prevent text selection while clicking
                    userSelect: "none",

                    // Smooth transition
                    transition:
                        "all 0.15s ease",

                    "&:hover": {
                        color: "#111827",

                        transform:
                            "translateY(-1px)",
                    },
                }}
            >

                {/* Column name */}

                <span>
                    {children}
                </span>


                {/* Sorting icon */}

                <Box
                    component="span"
                    sx={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",

                        minWidth: "20px",

                        fontSize: isActive
                            ? "18px"
                            : "17px",

                        fontWeight: isActive
                            ? 800
                            : 500,

                        color: isActive
                            ? "#111827"
                            : "#6B7280",

                        lineHeight: 1,

                        transition:
                            "all 0.15s ease",
                    }}
                >
                    {sortIcon}
                </Box>

            </Box>
        );
    };


    return (
        <TableContainer
            component={Paper}
        >

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

                            <SortHeader
                                field="name"
                            >
                                Name
                            </SortHeader>

                        </TableCell>


                        {/* =========================
                            EMAIL
                        ========================== */}

                        <TableCell>

                            <SortHeader
                                field="email"
                            >
                                Email
                            </SortHeader>

                        </TableCell>


                        {/* =========================
                            ADDRESS
                        ========================== */}

                        <TableCell>

                            <SortHeader
                                field="address"
                            >
                                Address
                            </SortHeader>

                        </TableCell>


                        {/* =========================
                            ROLE
                        ========================== */}

                        <TableCell>

                            <SortHeader
                                field="role"
                            >
                                Role
                            </SortHeader>

                        </TableCell>


                        {/* =========================
                            ACTIONS
                        ========================== */}

                        <TableCell align="center">

                            <Box
                                component="span"
                                sx={{
                                    fontWeight: 700,
                                }}
                            >
                                Actions
                            </Box>

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

                                {/* =========================
                                    NAME
                                ========================== */}

                                <TableCell>
                                    {user.name}
                                </TableCell>


                                {/* =========================
                                    EMAIL
                                ========================== */}

                                <TableCell>
                                    {user.email}
                                </TableCell>


                                {/* =========================
                                    ADDRESS
                                ========================== */}

                                <TableCell>
                                    {user.address}
                                </TableCell>


                                {/* =========================
                                    ROLE
                                ========================== */}

                                <TableCell>
                                    {user.role}
                                </TableCell>


                                {/* =========================
                                    ACTIONS
                                ========================== */}

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