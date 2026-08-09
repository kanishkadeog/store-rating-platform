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
} from "@mui/material";

import { toast } from "react-toastify";

import DashboardLayout from "../../components/layout/DashboardLayout";

import {
  getMyRatings,
  updateRating,
} from "../../services/rating.service";

import RateDialog from "../../components/users/RateDialog";

function MyRatings() {
  // ============================================
  // STATE
  // ============================================

  const [ratings, setRatings] = useState([]);

  const [loading, setLoading] = useState(true);

  // Rating update loading
  const [ratingLoading, setRatingLoading] =
    useState(false);

  // Selected store for update
  const [selectedStore, setSelectedStore] =
    useState(null);

  // Rating dialog
  const [openRate, setOpenRate] =
    useState(false);

  // ============================================
  // LOAD MY RATINGS
  // ============================================

  useEffect(() => {
    fetchMyRatings();
  }, []);

  const fetchMyRatings = async () => {
    try {
      setLoading(true);

      const response = await getMyRatings();

      console.log(
        "My Ratings Response:",
        response
      );

      setRatings(response.data || []);
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

  // ============================================
  // OPEN UPDATE RATING DIALOG
  // ============================================

  const handleUpdateClick = (item) => {
    setSelectedStore({
      id: item.storeId,
      name: item.storeName,
      address: item.address,
      userRating: item.rating,
    });

    setOpenRate(true);
  };

  // ============================================
  // UPDATE RATING
  // ============================================

  const handleSubmitRating = async (data) => {
    try {
      setRatingLoading(true);

      const response = await updateRating(
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

  // ============================================
  // LOADING STATE
  // ============================================

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

  // ============================================
  // PAGE UI
  // ============================================

  return (
    <DashboardLayout>
      {/* ========================================
          PAGE TITLE
      ======================================== */}

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

      {/* ========================================
          RATINGS TABLE
      ======================================== */}

      <TableContainer
        component={Paper}
        sx={{
          width: "100%",
          overflowX: "auto",
        }}
      >
        <Table>
          {/* TABLE HEADER */}

          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Store</strong>
              </TableCell>

              <TableCell>
                <strong>Address</strong>
              </TableCell>

              <TableCell>
                <strong>My Rating</strong>
              </TableCell>

              <TableCell>
                <strong>Action</strong>
              </TableCell>
            </TableRow>
          </TableHead>

          {/* TABLE BODY */}

          <TableBody>
            {ratings.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={4}
                  align="center"
                >
                  <Typography
                    color="text.secondary"
                    sx={{ py: 3 }}
                  >
                    You have not rated any
                    stores yet.
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              ratings.map((item) => (
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

                  {/* RATING */}

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
                        handleUpdateClick(item)
                      }
                    >
                      Update Rating
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* ========================================
          UPDATE RATING DIALOG
      ======================================== */}

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