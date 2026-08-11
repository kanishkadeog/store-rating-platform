//store-rating-platform/frontend/src/pages/user/MyRatings.jsx

// store-rating-platform/frontend/src/pages/user/MyRatings.jsx

import { useEffect, useState } from "react";

import {
  Box,
  Typography,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Rating,
  Button,
  TextField,
  Pagination,
  TableSortLabel,
} from "@mui/material";

import { toast } from "react-toastify";

import DashboardLayout from "../../components/layout/DashboardLayout";

import {
  getMyRatings,
  updateRating,
} from "../../services/rating.service";

import RateDialog from "../../components/users/RateDialog";


function MyRatings() {

  // =====================================================
  // STATE
  // =====================================================

  const [ratings, setRatings] = useState([]);

  const [loading, setLoading] = useState(true);


  // =====================================================
  // SEARCH
  // =====================================================

  // What the user is currently typing
  const [searchInput, setSearchInput] = useState("");

  // Search value actually used for filtering
  const [searchTerm, setSearchTerm] = useState("");


  // =====================================================
  // PAGINATION
  // =====================================================

  const [page, setPage] = useState(1);

  const rowsPerPage = 5;


  // =====================================================
  // SORTING
  // =====================================================

  const [sortBy, setSortBy] = useState("storeName");

  const [sortOrder, setSortOrder] = useState("ASC");


  // =====================================================
  // RATING UPDATE
  // =====================================================

  const [ratingLoading, setRatingLoading] = useState(false);


  // Selected store for update
  const [selectedStore, setSelectedStore] = useState(null);


  // Rating dialog
  const [openRate, setOpenRate] = useState(false);


  // =====================================================
  // LOAD MY RATINGS
  // =====================================================

  useEffect(() => {
    fetchMyRatings();
  }, []);


  // =====================================================
  // DEBOUNCE SEARCH
  // =====================================================

  /*
    The user can type normally without the page
    refreshing on every letter.

    Example:

    User types:

    s
    st
    sto
    stor
    store

    We wait 1 second after the user stops typing
    and then update searchTerm.

    This keeps the cursor stable and makes the
    search easier for a new user.
  */

  useEffect(() => {

    const timer = setTimeout(() => {

      setSearchTerm(searchInput);

      // Whenever search changes,
      // go back to page 1.
      setPage(1);

    }, 1000);


    // Cancel previous timer when user types
    // another character.
    return () => {
      clearTimeout(timer);
    };

  }, [searchInput]);


  // =====================================================
  // FETCH CURRENT USER'S RATINGS
  // =====================================================

  const fetchMyRatings = async () => {

    try {

      setLoading(true);


      const response = await getMyRatings();


      console.log(
        "My Ratings Response:",
        response
      );


      setRatings(
        response.data || []
      );


    } catch (error) {

      console.error(
        "My Ratings Error:",
        error
      );


      toast.error(
        error.response?.data?.message ||
          "Failed to load your ratings"
      );


    } finally {

      setLoading(false);

    }

  };


  // =====================================================
  // SORT HANDLER
  // =====================================================

  const handleSort = (field) => {

    if (sortBy === field) {

      // Same column
      // Toggle ASC <-> DESC

      setSortOrder((prev) =>
        prev === "ASC"
          ? "DESC"
          : "ASC"
      );

    } else {

      // New column
      // Start with ASC

      setSortBy(field);

      setSortOrder("ASC");

    }


    // Reset pagination
    setPage(1);

  };


  // =====================================================
  // FILTER RATINGS
  // =====================================================

  const filteredRatings = ratings.filter((item) => {

    const keyword =
      searchTerm.toLowerCase().trim();


    return (

      item.storeName
        ?.toLowerCase()
        .includes(keyword)

      ||

      item.address
        ?.toLowerCase()
        .includes(keyword)

    );

  });


  // =====================================================
  // SORT RATINGS
  // =====================================================

  const sortedRatings = [
    ...filteredRatings,
  ].sort((a, b) => {

    // -------------------------------------------------
    // STORE NAME
    // -------------------------------------------------

    if (sortBy === "storeName") {

      const valueA =
        String(
          a.storeName || ""
        ).toLowerCase();


      const valueB =
        String(
          b.storeName || ""
        ).toLowerCase();


      const result =
        valueA.localeCompare(valueB);


      return sortOrder === "ASC"
        ? result
        : -result;

    }


    // -------------------------------------------------
    // ADDRESS
    // -------------------------------------------------

    if (sortBy === "address") {

      const valueA =
        String(
          a.address || ""
        ).toLowerCase();


      const valueB =
        String(
          b.address || ""
        ).toLowerCase();


      const result =
        valueA.localeCompare(valueB);


      return sortOrder === "ASC"
        ? result
        : -result;

    }


    // -------------------------------------------------
    // MY RATING
    // -------------------------------------------------

    if (sortBy === "rating") {

      const ratingA =
        Number(a.rating) || 0;


      const ratingB =
        Number(b.rating) || 0;


      return sortOrder === "ASC"
        ? ratingA - ratingB
        : ratingB - ratingA;

    }


    return 0;

  });


  // =====================================================
  // PAGINATION
  // =====================================================

  const totalRatings =
    sortedRatings.length;


  const totalPages =
    Math.ceil(
      totalRatings / rowsPerPage
    );


  const paginatedRatings =
    sortedRatings.slice(
      (page - 1) * rowsPerPage,
      page * rowsPerPage
    );


  // =====================================================
  // OPEN UPDATE RATING DIALOG
  // =====================================================

  const handleUpdateClick = (item) => {

    setSelectedStore({

      id: item.storeId,

      name: item.storeName,

      address: item.address,

      userRating: item.rating,

    });


    setOpenRate(true);

  };


  // =====================================================
  // UPDATE RATING
  // =====================================================

  const handleSubmitRating = async (data) => {

    try {

      setRatingLoading(true);


      const response =
        await updateRating(
          data.storeId,
          {
            rating: data.rating,
          }
        );


      console.log(
        "Update Rating Response:",
        response
      );


      toast.success(
        response.message ||
          "Rating updated successfully"
      );


      // Close dialog
      setOpenRate(false);


      // Clear selected store
      setSelectedStore(null);


      // Refresh ratings
      await fetchMyRatings();


    } catch (error) {

      console.error(
        "Update Rating Error:",
        error
      );


      toast.error(
        error.response?.data?.message ||
          "Failed to update rating"
      );


    } finally {

      setRatingLoading(false);

    }

  };


  // =====================================================
  // LOADING STATE
  // =====================================================

  if (loading) {

    return (

      <DashboardLayout>

        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="60vh"
        >

          <CircularProgress />

        </Box>

      </DashboardLayout>

    );

  }


  // =====================================================
  // PAGE UI
  // =====================================================

  return (

    <DashboardLayout>

      {/* =================================================
          PAGE TITLE
      ================================================= */}

      <Typography
        variant="h4"
        fontWeight="bold"
        mb={1}
      >
        My Ratings
      </Typography>


      <Typography
        variant="body1"
        color="text.secondary"
        mb={3}
      >
        View and update the ratings you have
        submitted.
      </Typography>


      {/* =================================================
          SEARCH
      ================================================= */}

      <TextField
        fullWidth
        size="small"
        placeholder="Search by store name or address..."
        value={searchInput}
        onChange={(e) => {

          setSearchInput(
            e.target.value
          );

          // Immediately reset page
          // when user starts a new search.
          setPage(1);

        }}
        sx={{
          mb: 2,

          "& .MuiInputBase-root": {
            fontSize: "14px",
          },
        }}
      />


      {/* =================================================
          RATINGS TABLE
      ================================================= */}

      <TableContainer
        component={Paper}
        sx={{
          width: "100%",
          overflowX: "auto",
        }}
      >

        <Table>

          {/* =================================================
              TABLE HEADER
          ================================================= */}

          {/* =================================================
    TABLE HEADER
================================================= */}

<TableHead>

  <TableRow>

    {/* =================================================
        STORE
    ================================================= */}

    <TableCell
      sx={{
        fontWeight:
          sortBy === "storeName"
            ? 700
            : 600,

        color:
          sortBy === "storeName"
            ? "text.primary"
            : "text.secondary",
      }}
    >

      <TableSortLabel

        active={sortBy === "storeName"}

        direction={
          sortBy === "storeName"
            ? sortOrder.toLowerCase()
            : "asc"
        }

        onClick={() =>
          handleSort("storeName")
        }

        hideSortIcon={false}

        sx={{

          fontWeight:
            sortBy === "storeName"
              ? 700
              : 600,

          color:
            sortBy === "storeName"
              ? "text.primary"
              : "text.secondary",

          "&:hover": {
            color: "text.primary",
          },

          "& .MuiTableSortLabel-icon": {

            opacity: 1,

            color:
              sortBy === "storeName"
                ? "text.primary !important"
                : "text.secondary !important",

          },

          "&.Mui-active": {

            color:
              "text.primary",

          },

          "&.Mui-active .MuiTableSortLabel-icon": {

            color:
              "text.primary !important",

            opacity: 1,

          },

        }}
      >

        <strong>
          Store
        </strong>

      </TableSortLabel>

    </TableCell>


    {/* =================================================
        ADDRESS
    ================================================= */}

    <TableCell
      sx={{
        fontWeight:
          sortBy === "address"
            ? 700
            : 600,

        color:
          sortBy === "address"
            ? "text.primary"
            : "text.secondary",
      }}
    >

      <TableSortLabel

        active={sortBy === "address"}

        direction={
          sortBy === "address"
            ? sortOrder.toLowerCase()
            : "asc"
        }

        onClick={() =>
          handleSort("address")
        }

        hideSortIcon={false}

        sx={{

          fontWeight:
            sortBy === "address"
              ? 700
              : 600,

          color:
            sortBy === "address"
              ? "text.primary"
              : "text.secondary",

          "&:hover": {
            color: "text.primary",
          },

          "& .MuiTableSortLabel-icon": {

            opacity: 1,

            color:
              sortBy === "address"
                ? "text.primary !important"
                : "text.secondary !important",

          },

          "&.Mui-active": {

            color:
              "text.primary",

          },

          "&.Mui-active .MuiTableSortLabel-icon": {

            color:
              "text.primary !important",

            opacity: 1,

          },

        }}
      >

        <strong>
          Address
        </strong>

      </TableSortLabel>

    </TableCell>


    {/* =================================================
        MY RATING
    ================================================= */}

    <TableCell
      sx={{
        fontWeight:
          sortBy === "rating"
            ? 700
            : 600,

        color:
          sortBy === "rating"
            ? "text.primary"
            : "text.secondary",
      }}
    >

      <TableSortLabel

        active={sortBy === "rating"}

        direction={
          sortBy === "rating"
            ? sortOrder.toLowerCase()
            : "asc"
        }

        onClick={() =>
          handleSort("rating")
        }

        hideSortIcon={false}

        sx={{

          fontWeight:
            sortBy === "rating"
              ? 700
              : 600,

          color:
            sortBy === "rating"
              ? "text.primary"
              : "text.secondary",

          "&:hover": {
            color: "text.primary",
          },

          "& .MuiTableSortLabel-icon": {

            opacity: 1,

            color:
              sortBy === "rating"
                ? "text.primary !important"
                : "text.secondary !important",

          },

          "&.Mui-active": {

            color:
              "text.primary",

          },

          "&.Mui-active .MuiTableSortLabel-icon": {

            color:
              "text.primary !important",

            opacity: 1,

          },

        }}
      >

        <strong>
          My Rating
        </strong>

      </TableSortLabel>

    </TableCell>


    {/* =================================================
        ACTION
    ================================================= */}

    <TableCell>

      <strong>
        Action
      </strong>

    </TableCell>

  </TableRow>

</TableHead>


          {/* =================================================
              TABLE BODY
          ================================================= */}

          <TableBody>

            {paginatedRatings.length === 0 ? (

              <TableRow>

                <TableCell
                  colSpan={4}
                  align="center"
                >

                  <Typography
                    color="text.secondary"
                    sx={{
                      py: 3,
                    }}
                  >

                    {searchTerm
                      ? "No ratings found matching your search."
                      : "You have not rated any stores yet."
                    }

                  </Typography>

                </TableCell>

              </TableRow>

            ) : (

              paginatedRatings.map(
                (item) => (

                  <TableRow
                    key={item.storeId}
                    hover
                  >

                    {/* STORE */}

                    <TableCell>

                      <Typography
                        fontWeight={600}
                      >
                        {item.storeName}
                      </Typography>

                    </TableCell>


                    {/* ADDRESS */}

                    <TableCell>

                      {item.address}

                    </TableCell>


                    {/* MY RATING */}

                    <TableCell>

                      <Box
                        display="flex"
                        alignItems="center"
                        gap={1}
                      >

                        <Rating
                          value={Number(
                            item.rating
                          )}
                          readOnly
                        />


                        <Typography
                          fontWeight={500}
                        >

                          {item.rating}/5

                        </Typography>

                      </Box>

                    </TableCell>


                    {/* ACTION */}

                    <TableCell>

                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() =>
                          handleUpdateClick(
                            item
                          )
                        }
                      >

                        Update Rating

                      </Button>

                    </TableCell>

                  </TableRow>

                )
              )

            )}

          </TableBody>

        </Table>

      </TableContainer>


      {/* =================================================
          PAGINATION
      ================================================= */}

      {totalPages > 1 && (

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mt: 3,
            mb: 3,
          }}
        >

          <Pagination
            count={totalPages}
            page={page}
            color="primary"
            size="small"
            onChange={(
              event,
              value
            ) => {

              setPage(value);

            }}
          />

        </Box>

      )}


      {/* =================================================
          UPDATE RATING DIALOG
      ================================================= */}

      <RateDialog
        open={openRate}
        store={selectedStore}
        onClose={() => {

          setOpenRate(false);

          setSelectedStore(null);

        }}
        onSubmit={handleSubmitRating}
        loading={ratingLoading}
      />

    </DashboardLayout>

  );

}


export default MyRatings;

