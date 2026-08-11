//store-rating-platform/frontend/src/components/owner/RaringTable.jsx


import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Typography,
  Rating,
} from "@mui/material";


function RatingTable({
  ratings,
  sortBy,
  sortOrder,
  onSort,
}) {


  // =====================================================
  // SORT HEADER
  // =====================================================

  const SortHeader = ({
    field,
    children,
  }) => (

    <TableSortLabel

      active={
        sortBy === field
      }

      direction={
        sortBy === field
          ? sortOrder.toLowerCase()
          : "asc"
      }

      hideSortIcon={false}

      onClick={() =>
        onSort(field)
      }

      sx={{

        color:
          sortBy === field
            ? "text.primary"
            : "text.secondary",

        fontWeight:
          sortBy === field
            ? 700
            : 600,

        "& .MuiTableSortLabel-icon": {

          opacity: 1,

          color:
            sortBy === field
              ? "text.primary !important"
              : "text.secondary !important",

        },

        "&.Mui-active": {

          color:
            "text.primary",

        },

      }}
    >

      <strong>
        {children}
      </strong>

    </TableSortLabel>

  );


  return (

    <TableContainer
      component={Paper}
      sx={{
        width: "100%",
        overflowX: "auto",
      }}
    >

      <Table>

        {/* =================================================
            HEADER
        ================================================= */}

        <TableHead>

          <TableRow>

            <TableCell>

              <SortHeader
                field="storeName"
              >
                Store
              </SortHeader>

            </TableCell>


            <TableCell>

              <SortHeader
                field="userName"
              >
                User
              </SortHeader>

            </TableCell>


            <TableCell>

              <SortHeader
                field="userEmail"
              >
                User Email
              </SortHeader>

            </TableCell>


            <TableCell>

              <SortHeader
                field="rating"
              >
                Rating
              </SortHeader>

            </TableCell>


            <TableCell>

              <SortHeader
                field="createdAt"
              >
                Date
              </SortHeader>

            </TableCell>

          </TableRow>

        </TableHead>


        {/* =================================================
            BODY
        ================================================= */}

        <TableBody>

          {ratings.length === 0 ? (

            <TableRow>

              <TableCell
                colSpan={5}
                align="center"
              >

                <Typography
                  color="text.secondary"
                  sx={{
                    py: 3,
                  }}
                >

                  No ratings found.

                </Typography>

              </TableCell>

            </TableRow>

          ) : (

            ratings.map(
              (item) => (

                <TableRow
                  key={item.id}
                  hover
                >

                  {/* =================================================
                      STORE
                  ================================================= */}

                  <TableCell>

                    <Typography
                      fontWeight={600}
                    >

                      {item.store?.name ||
                        "Unknown Store"}

                    </Typography>

                  </TableCell>


                  {/* =================================================
                      USER
                  ================================================= */}

                  <TableCell>

                    {item.user?.name ||
                      "Unknown User"}

                  </TableCell>


                  {/* =================================================
                      EMAIL
                  ================================================= */}

                  <TableCell>

                    {item.user?.email ||
                      "-"}

                  </TableCell>


                  {/* =================================================
                      RATING
                  ================================================= */}

                  <TableCell>

                    <Rating
                      value={Number(
                        item.rating
                      )}
                      readOnly
                      size="small"
                    />

                    <Typography
                      component="span"
                      sx={{
                        ml: 1,
                        fontWeight: 500,
                      }}
                    >

                      {item.rating}/5

                    </Typography>

                  </TableCell>


                  {/* =================================================
                      DATE
                  ================================================= */}

                  <TableCell>

                    {item.createdAt
                      ? new Date(
                          item.createdAt
                        ).toLocaleDateString()
                      : "-"}

                  </TableCell>

                </TableRow>

              )
            )

          )}

        </TableBody>

      </Table>

    </TableContainer>

  );
}


export default RatingTable;