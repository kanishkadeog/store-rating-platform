//store-rating-platform/frontend/src/pages/user/UserDashboard.jsx


import { useEffect, useState } from "react";

import {
  Typography,
  CircularProgress,
  Box,
  Pagination,
  TextField,
    Paper,
  Grid,
} from "@mui/material";

import { toast } from "react-toastify";

import DashboardLayout from "../../components/layout/DashboardLayout";
import { getAllStores } from "../../services/user.service";

import StoreTable from "../../components/users/StoreTable";
import RateDialog from "../../components/users/RateDialog";

import {
  createRating,
  getMyRatings,
  updateRating,
} from "../../services/rating.service";

function UserDashboard() {
  // =====================================================
  // STATE
  // =====================================================

  const [stores, setStores] = useState([]);

  // Total number of stores in database
const [totalStores, setTotalStores] = useState(0);

  // Search
  const [searchTerm, setSearchTerm] = useState("");

  // Pagination
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const rowsPerPage = 5;

  const [sortBy, setSortBy] =
  useState("name");

const [sortOrder, setSortOrder] =
  useState("ASC");

  // Current user's ratings
  const [myRatings, setMyRatings] = useState([]);

  // Selected store for rating
  const [selectedStore, setSelectedStore] = useState(null);

  // Rating dialog
  const [openRate, setOpenRate] = useState(false);

  // Rating submit loading
  const [ratingLoading, setRatingLoading] = useState(false);

  // Dashboard loading
  const [loading, setLoading] = useState(true);

  // =====================================================
  // LOAD STORES
  // =====================================================

  useEffect(() => {
  fetchStores();
}, [
  page,
  searchTerm,
  sortBy,
  sortOrder,
]);

  // =====================================================
  // LOAD MY RATINGS
  // =====================================================

  useEffect(() => {
    fetchMyRatings();
  }, []);

  const handleSort = (field) => {
  if (sortBy === field) {
    setSortOrder((prev) =>
      prev === "ASC"
        ? "DESC"
        : "ASC"
    );
  } else {
    setSortBy(field);
    setSortOrder("ASC");
  }

  setPage(1);
};

  // =====================================================
  // FETCH STORES
  // =====================================================

  const fetchStores = async () => {
    try {
      setLoading(true);

    const response = await getAllStores({
  page,
  limit: rowsPerPage,
  search: searchTerm,
  sortBy,
  sortOrder,
});

      console.log("User Stores Response:", response);

     setStores(response.data.stores || []);

// Total stores across all pages
setTotalStores(response.data.total || 0);

setTotalPages(response.data.totalPages || 1);

    } catch (error) {
      console.error("User Stores Error:", error);

      toast.error(
        error.response?.data?.message ||
          "Failed to load stores"
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // FETCH CURRENT USER'S RATINGS
  // =====================================================

  const fetchMyRatings = async () => {
    try {
      const response = await getMyRatings();

      console.log("My Ratings Response:", response);

      setMyRatings(response.data || []);
    } catch (error) {
      console.error("My Ratings Error:", error);

      toast.error(
        error.response?.data?.message ||
          "Failed to load your ratings"
      );
    }
  };

  // =====================================================
  // GET USER RATING FOR STORE
  // =====================================================

  const getUserRating = (storeId) => {
    const rating = myRatings.find(
      (item) => item.storeId === storeId
    );

    return rating?.rating || null;
  };


    // =====================================================
  // CALCULATE USER RATING STATISTICS
  // =====================================================


  const ratedStores = myRatings.length;

  const averageMyRating =
    myRatings.length > 0
      ? (
          myRatings.reduce(
            (sum, item) =>
              sum + Number(item.rating),
            0
          ) / myRatings.length
        ).toFixed(1)
      : "0.0";

  // =====================================================
  // OPEN RATING DIALOG
  // =====================================================

  const handleRateClick = (store) => {
    const existingRating = getUserRating(store.id);

    setSelectedStore({
      ...store,
      userRating: existingRating,
    });

    setOpenRate(true);
  };

  // =====================================================
  // CREATE / UPDATE RATING
  // =====================================================

  const handleSubmitRating = async (data) => {
    try {
      setRatingLoading(true);

      const existingRating = getUserRating(data.storeId);

      let response;

      // UPDATE
      if (existingRating) {
        response = await updateRating(
          data.storeId,
          {
            rating: data.rating,
          }
        );
      }

      // CREATE
      else {
        response = await createRating(data);
      }

      toast.success(response.message);

      // Close dialog
      setOpenRate(false);
      setSelectedStore(null);

      // Refresh stores
      await fetchStores();

      // Refresh user's ratings
      await fetchMyRatings();
    } catch (error) {
      console.error("Rating Error:", error);

      toast.error(
        error.response?.data?.message ||
          "Failed to submit rating"
      );
    } finally {
      setRatingLoading(false);
    }
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <DashboardLayout>
        <Box
          sx={{
            minHeight: "60vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Box>
      </DashboardLayout>
    );
  }

  // =====================================================
  // UI
  // =====================================================

  return (
    <DashboardLayout>
      <Box
        sx={{
          width: "100%",
          maxWidth: "1200px",
          mx: "auto",
        }}
      >
        {/* PAGE TITLE */}
        <Typography
          variant="h4"
          fontWeight={700}
          sx={{
            mb: 0.5,
            fontSize: {
              xs: "24px",
              sm: "28px",
            },
          }}
        >
          User Dashboard
        </Typography>

        {/* DESCRIPTION */}
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mb: 2 }}
        >
          Browse stores and rate your favorite stores.
        </Typography>


{/* =================================================
    SUMMARY CARDS
================================================= */}

<Grid
  container
  spacing={2}
  sx={{ mb: 3 }}
>
  {/* TOTAL STORES */}

  <Grid item xs={12} sm={4}>
    <Paper
      elevation={2}
      sx={{
        p: 2,
        height: "60%",
      }}
    >
      <Typography
        variant="body2"
        color="text.secondary"
      >
        Stores Available
      </Typography>

      <Typography
        variant="h5"
        fontWeight="bold"
        sx={{ mt: 1 }}
      >
        {totalStores}
      </Typography>
    </Paper>
  </Grid>

  {/* RATED STORES */}

  <Grid item xs={12} sm={4}>
    <Paper
      elevation={2}
      sx={{
        p: 2,
        height: "60%",
      }}
    >
      <Typography
        variant="body2"
        color="text.secondary"
      >
        Stores I Rated
      </Typography>

      <Typography
        variant="h5"
        fontWeight="bold"
        sx={{ mt: 1 }}
      >
        {ratedStores}
      </Typography>
    </Paper>
  </Grid>

  {/* AVERAGE RATING */}

  <Grid item xs={12} sm={4}>
    <Paper
      elevation={2}
      sx={{
        p: 2,
        height: "60%",
      }}
    >
      <Typography
        variant="body2"
        color="text.secondary"
      >
        My Average Rating
      </Typography>

      <Typography
        variant="h5"
        fontWeight="bold"
        sx={{ mt: 1 }}
      >
        ⭐ {averageMyRating}
      </Typography>
    </Paper>
  </Grid>
</Grid>


        {/* SEARCH */}
        <TextField
          fullWidth
          size="small"
          placeholder="Search by store name or email..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setPage(1);
          }}
          sx={{
            mb: 2,
            "& .MuiInputBase-root": {
              fontSize: "14px",
            },
          }}
        />

        {/* STORE TABLE */}
       <StoreTable
  stores={stores}
  onRate={handleRate}
  getUserRating={getUserRating}
  sortBy={sortBy}
  sortOrder={sortOrder}
  onSort={handleSort}
/>

        {/* PAGINATION */}
        { (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mt: 2,
              mb: 3,
            }}
          >
            <Pagination
              count={totalPages}
              page={page}
              color="primary"
              size="small"
              onChange={(event, value) => {
                setPage(value);
              }}
            />
          </Box>
        )}
      </Box>

      {/* RATING DIALOG */}
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

export default UserDashboard;
