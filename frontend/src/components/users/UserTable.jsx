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

                {/* =========================
                    TABLE HEADER
                ========================== */}

                <TableHead>

                    <TableRow>

                        {/* NAME */}

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
                            >
                                <b>Name</b>
                            </TableSortLabel>

                        </TableCell>


                        {/* EMAIL */}

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
                            >
                                <b>Email</b>
                            </TableSortLabel>

                        </TableCell>


                        {/* ADDRESS */}

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
                            >
                                <b>Address</b>
                            </TableSortLabel>

                        </TableCell>


                        {/* ROLE */}

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
                            >
                                <b>Role</b>
                            </TableSortLabel>

                        </TableCell>


                        {/* ACTIONS */}

                        <TableCell align="center">

                            <b>Actions</b>

                        </TableCell>

                    </TableRow>

                </TableHead>


                {/* =========================
                    TABLE BODY
                ========================== */}

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


//==================================

// import {
//   Paper,
//   Table,
//   TableHead,
//   TableBody,
//   TableRow,
//   TableCell,
//   TableContainer,
//   IconButton,
//   Tooltip,
//   TableSortLabel,
//     Box,

// } from "@mui/material";

// import {
//   Visibility,
//   Edit,
//   Delete,
//   ArrowUpward,
//   ArrowDownward,
//   UnfoldMore,
// } from "@mui/icons-material";

// import { useNavigate } from "react-router-dom";

// function UserTable({
//   users,
//   onDelete,
//   sortBy,
//   sortOrder,
//   onSort,
// }) {
//     const navigate = useNavigate();

//     const SortIcon = ({ field }) => {
//   if (sortBy !== field) {
//     return (
//       <UnfoldMore
//         sx={{
//           fontSize: 18,
//           verticalAlign: "middle",
//           ml: 0.5,
//           opacity: 0.5,
//         }}
//       />
//     );
//   }

//   return sortOrder === "asc" ? (
//     <ArrowUpward
//       sx={{
//         fontSize: 18,
//         verticalAlign: "middle",
//         ml: 0.5,
//       }}
//     />
//   ) : (
//     <ArrowDownward
//       sx={{
//         fontSize: 18,
//         verticalAlign: "middle",
//         ml: 0.5,
//       }}
//     />
//   );
// };


//   return (
//     <TableContainer component={Paper}>
//       <Table>

//         <TableHead>
//           <TableRow>

//             <TableCell>
//   <Tooltip title="Sort by Name">
//     <Box
//       component="span"
//       onClick={() => onSort("name")}
//       sx={{
//         cursor: "pointer",
//         display: "inline-flex",
//         alignItems: "center",
//         fontWeight: "bold",
//         userSelect: "none",
//       }}
//     >
//       Name
//       <SortIcon field="name" />
//     </Box>
//   </Tooltip>
// </TableCell>

// <TableCell>
//   <Tooltip title="Sort by Email">
//     <Box
//       component="span"
//       onClick={() => onSort("email")}
//       sx={{
//         cursor: "pointer",
//         display: "inline-flex",
//         alignItems: "center",
//         fontWeight: "bold",
//         userSelect: "none",
//       }}
//     >
//       Email
//       <SortIcon field="email" />
//     </Box>
//   </Tooltip>
// </TableCell>

// <TableCell>
//   <Tooltip title="Sort by Address">
//     <Box
//       component="span"
//       onClick={() => onSort("address")}
//       sx={{
//         cursor: "pointer",
//         display: "inline-flex",
//         alignItems: "center",
//         fontWeight: "bold",
//         userSelect: "none",
//       }}
//     >
//       Address
//       <SortIcon field="address" />
//     </Box>
//   </Tooltip>
// </TableCell>

// <TableCell>
//   <Tooltip title="Sort by Role">
//     <Box
//       component="span"
//       onClick={() => onSort("role")}
//       sx={{
//         cursor: "pointer",
//         display: "inline-flex",
//         alignItems: "center",
//         fontWeight: "bold",
//         userSelect: "none",
//       }}
//     >
//       Role
//       <SortIcon field="role" />
//     </Box>
//   </Tooltip>
// </TableCell>

//             <TableCell align="center">
//               <b>Actions</b>
//             </TableCell>
//           </TableRow>
//         </TableHead>

//         <TableBody>

//           {users.map((user) => (

//             <TableRow key={user.id}>

//               <TableCell>{user.name}</TableCell>

//               <TableCell>{user.email}</TableCell>

//               <TableCell>{user.address}</TableCell>

//               <TableCell>{user.role}</TableCell>

//               <TableCell align="center">

//                 <Tooltip title="View">

//                   <IconButton
//                     color="primary"
//                     onClick={() =>
//                       navigate(`/admin/users/${user.id}`)
//                     }
//                   >
//                     <Visibility />
//                   </IconButton>

//                 </Tooltip>

//                 <Tooltip title="Edit">

//                   <IconButton
//                     color="warning"
//                     onClick={() =>
//                       navigate(`/admin/users/edit/${user.id}`)
//                     }
//                   >
//                     <Edit />
//                   </IconButton>

//                 </Tooltip>

//                 <Tooltip title="Delete">

//                   <IconButton
//                      color="error"
//                      onClick={() => onDelete(user.id)}
//                     >
//                     <Delete />
//                   </IconButton>

//                 </Tooltip>

//               </TableCell>

//             </TableRow>

//           ))}

//         </TableBody>

//       </Table>
//     </TableContainer>
//   );
// }

// export default UserTable;