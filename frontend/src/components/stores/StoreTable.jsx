// store-rating-platform/frontend/src/components/stores/StoreTable.jsx


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
  ArrowUpward,
  ArrowDownward,
  UnfoldMore,
} from "@mui/icons-material";

import { useNavigate } from "react-router-dom";

function StoreTable({
  stores,
  sortBy,
  sortOrder,
  onSort,
}) {
  const navigate = useNavigate();

  // =====================================================
  // SORT ICON
  // =====================================================

  const SortIcon = ({ field }) => {
    // Column is not currently sorted
    if (sortBy !== field) {
      return (
        <UnfoldMore
          sx={{
            fontSize: 18,
            verticalAlign: "middle",
            ml: 0.5,
            opacity: 0.55,
          }}
        />
      );
    }

    // Active ASC
    if (sortOrder === "ASC") {
      return (
        <ArrowUpward
          sx={{
            fontSize: 18,
            verticalAlign: "middle",
            ml: 0.5,
            fontWeight: "bold",
          }}
        />
      );
    }

    // Active DESC
    return (
      <ArrowDownward
        sx={{
          fontSize: 18,
          verticalAlign: "middle",
          ml: 0.5,
          fontWeight: "bold",
        }}
      />
    );
  };

  // =====================================================
  // SORTABLE HEADER
  // =====================================================

  const SortableHeader = ({
    label,
    field,
  }) => {
    const isActive = sortBy === field;

    return (
      <TableCell>
        <Box
          component="button"
          onClick={() => onSort(field)}
          sx={{
            border: "none",
            background: "transparent",
            padding: 0,
            margin: 0,
            cursor: "pointer",

            display: "inline-flex",
            alignItems: "center",

            fontFamily: "inherit",
            fontSize: "inherit",
            fontWeight: 700,

            color: isActive
              ? "primary.main"
              : "inherit",

            "&:hover": {
              color: "primary.main",
            },
          }}
        >
          {label}

          <SortIcon field={field} />
        </Box>
      </TableCell>
    );
  };

  return (
    <TableContainer
      component={Paper}
      elevation={2}
    >
      <Table>
        {/* =====================================================
            TABLE HEADER
        ===================================================== */}

        <TableHead>
          <TableRow>

            {/* STORE */}

            <SortableHeader
              label="Store"
              field="name"
            />

            {/* EMAIL */}

            <SortableHeader
              label="Email"
              field="email"
            />

            {/* ADDRESS */}

            <SortableHeader
              label="Address"
              field="address"
            />

            {/* OWNER */}

           {/* OWNER */}

<SortableHeader
  label="Owner"
  field="owner"
/>

{/* RATING */}

<SortableHeader
  label="Average Rating"
  field="averageRating"
/>

            {/* ACTIONS */}

            <TableCell align="center">
              <b>Actions</b>
            </TableCell>

          </TableRow>
        </TableHead>

        {/* =====================================================
            TABLE BODY
        ===================================================== */}

        <TableBody>

          {stores.length === 0 ? (

            <TableRow>
              <TableCell
                colSpan={6}
                align="center"
              >
                No stores found
              </TableCell>
            </TableRow>

          ) : (

            stores.map((store) => (

              <TableRow
                key={store.id}
              >

                <TableCell>
                  {store.name}
                </TableCell>

                <TableCell>
                  {store.email}
                </TableCell>

                <TableCell>
                  {store.address}
                </TableCell>

                <TableCell>
                  {store.owner?.name ||
                    "N/A"}
                </TableCell>

                <TableCell>
                    ⭐{" "}
                  {Number(store.averageRating || 0).toFixed(1)}
                  </TableCell>

                <TableCell align="center">

                  <Tooltip title="View">

                    <IconButton
                      color="primary"
                      onClick={() =>
                        navigate(
                          `/admin/stores/${store.id}`
                        )
                      }
                    >
                      <Visibility />
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

export default StoreTable;

// import {
//   Paper,
//   Table,
//   TableHead,
//   TableBody,
//   TableRow,
//   TableCell,
//   TableContainer,
//   IconButton,
// } from "@mui/material";

// import { Visibility } from "@mui/icons-material";

// import { useNavigate } from "react-router-dom";

// function StoreTable({ stores }) {
//    const navigate = useNavigate();


//   return (
//     <TableContainer component={Paper}>
//       <Table>

//         <TableHead>
//           <TableRow>
//             <TableCell><b>Store</b></TableCell>
//             <TableCell><b>Email</b></TableCell>
//             <TableCell><b>Address</b></TableCell>
//             <TableCell><b>Owner</b></TableCell>
//             <TableCell><b>Average Rating</b></TableCell>
//             <TableCell><b>Actions</b></TableCell>
//           </TableRow>
//         </TableHead>

//         <TableBody>

//   {stores.length === 0 ? (

//     <TableRow>

//    <TableCell
//      colSpan={6}
//      align="center"
//     >
//         No stores found
//       </TableCell>

//     </TableRow>

//   ) : (

//     stores.map((store) => (

//       <TableRow key={store.id}>

//         <TableCell>{store.name}</TableCell>

//         <TableCell>{store.email}</TableCell>

//         <TableCell>{store.address}</TableCell>

//         <TableCell>
//           {store.owner?.name}
//         </TableCell>

//         <TableCell>
//           ⭐ {store.averageRating}
//         </TableCell>

//         <TableCell>
//   <IconButton
//     color="primary"
//     onClick={() =>
//       navigate(`/admin/stores/${store.id}`)
//     }
//   >
//     <Visibility />
//   </IconButton>
// </TableCell>

//       </TableRow>

//     ))

//   )}

// </TableBody>

//       </Table>
//     </TableContainer>
//   );
// }

// export default StoreTable;