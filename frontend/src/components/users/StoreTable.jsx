//store-rating-platform/frontend/src/components/users/StoreTable.jsx

import {
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Rating,
  Button,
    Box,

} from "@mui/material";

import {
  ArrowUpward,
  ArrowDownward,
  UnfoldMore,
} from "@mui/icons-material";

function StoreTable({
  stores,
  onRate,
  getUserRating,
  sortBy,
  sortOrder,
  onSort,
}) {

  // =====================================================
// SORT ICON
// =====================================================

const SortIcon = ({ field }) => {
  // Not currently sorted
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

  // ASC
  if (sortOrder === "ASC") {
    return (
      <ArrowUpward
        sx={{
          fontSize: 18,
          verticalAlign: "middle",
          ml: 0.5,
        }}
      />
    );
  }

  // DESC
  return (
    <ArrowDownward
      sx={{
        fontSize: 18,
        verticalAlign: "middle",
        ml: 0.5,
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
      sx={{
        width: "100%",
        overflowX: "auto",
      }}
    >
      <Table
        size="small"
        sx={{
          minWidth: 750,
        }}
      >
        {/* =====================================================
            TABLE HEADER
        ===================================================== */}

        <TableHead>
          <TableRow
            sx={{
              backgroundColor: "#f5f5f5",
            }}
          >
            <SortableHeader
  label="Store"
  field="name"
/>

<SortableHeader
  label="Email"
  field="email"
/>

<SortableHeader
  label="Address"
  field="address"
/>

          <SortableHeader
  label="Average Rating"
  field="averageRating"
/>

<SortableHeader
  label="My Rating"
  field="myRating"
/>

            <TableCell
              sx={{
                fontWeight: 700,
                textAlign: "center",
              }}
            >
              Action
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
                sx={{
                  py: 3,
                  color: "text.secondary",
                }}
              >
                No stores found
              </TableCell>
            </TableRow>
          ) : (
            stores.map((store) => {
              const userRating = getUserRating(store.id);

              return (
                <TableRow
                  key={store.id}
                  hover
                >
                  {/* STORE */}
                  <TableCell
                    sx={{
                      fontWeight: 600,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {store.name}
                  </TableCell>

                  {/* EMAIL */}
                  <TableCell
                    sx={{
                      whiteSpace: "nowrap",
                    }}
                  >
                    {store.email}
                  </TableCell>

                  {/* ADDRESS */}
                  <TableCell>
                    {store.address}
                  </TableCell>

                  {/* AVERAGE RATING */}
                  <TableCell>
                    <Rating
                      value={Number(
                        store.averageRating || 0
                      )}
                      precision={0.5}
                      readOnly
                      size="small"
                    />

                    <span
                      style={{
                        marginLeft: "6px",
                        fontSize: "13px",
                      }}
                    >
                      {store.averageRating}
                    </span>
                  </TableCell>

                  {/* MY RATING */}
                  <TableCell>
                    {userRating ? (
                      <Rating
                        value={Number(userRating)}
                        readOnly
                        size="small"
                      />
                    ) : (
                      <span
                        style={{
                          fontSize: "13px",
                          color: "#777",
                        }}
                      >
                        Not Rated
                      </span>
                    )}
                  </TableCell>

                  {/* ACTION */}
                  <TableCell
                    sx={{
                      textAlign: "center",
                    }}
                  >
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() =>
                        onRate(store)
                      }
                      sx={{
                        fontSize: "12px",
                        minWidth: "110px",
                        py: 0.6,
                      }}
                    >
                      {userRating
                        ? "Update Rating"
                        : "Rate"}
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default StoreTable;