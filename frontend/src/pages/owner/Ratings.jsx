//store-rating-platform/frontend/src/pages/owner/Ratings.jsx

import {
  Typography,
  Box,
  CircularProgress,
  Pagination,
} from "@mui/material";

import { useEffect, useState } from "react";

import { toast } from "react-toastify";

import DashboardLayout from "../../components/layout/DashboardLayout";

import RatingSearch from "../../components/owner/RatingSearch";
import RatingTable from "../../components/owner/RatingTable";

import {
  getStoreRatings,
} from "../../services/owner.service";

function Ratings() {
  const [ratings, setRatings] = useState([]);

  const [search, setSearch] =
    useState("");

  const [page, setPage] =
    useState(1);

  const [totalPages, setTotalPages] =
    useState(1);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchRatings();
  }, [page, search]);

  const fetchRatings = async () => {
    try {
      setLoading(true);

      const response =
        await getStoreRatings(
          page,
          search
        );

        console.log("Ratings Response:", response);


      setRatings(response.data.ratings);

      setTotalPages(response.data.totalPages);
      
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to load ratings"
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <Box
          display="flex"
          justifyContent="center"
          mt={8}
        >
          <CircularProgress />
        </Box>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <Typography
        variant="h4"
        fontWeight="bold"
        mb={3}
      >
        Store Ratings
      </Typography>

      <RatingSearch
        search={search}
        setSearch={setSearch}
        setPage={setPage}
      />

      <RatingTable ratings={ratings} />

      <Box
        mt={3}
        display="flex"
        justifyContent="center"
      >
        <Pagination
          page={page}
          count={totalPages}
          onChange={(_, value) =>
            setPage(value)
          }
          color="primary"
        />
      </Box>
    </DashboardLayout>
  );
}

export default Ratings;