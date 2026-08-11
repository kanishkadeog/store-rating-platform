//store-rating-platform/frontend/src/pages/owner/Ratings.jsx

import {
  Typography,
  Box,
  CircularProgress,
  Pagination,
} from "@mui/material";

import {
  useEffect,
  useState,
} from "react";

import { toast } from "react-toastify";

import DashboardLayout
  from "../../components/layout/DashboardLayout";

import RatingSearch
  from "../../components/owner/RatingSearch";

import RatingTable
  from "../../components/owner/RatingTable";

import {
  getStoreRatings,
} from "../../services/owner.service";


function Ratings() {

  // =====================================================
  // RATINGS
  // =====================================================

  const [ratings, setRatings] =
    useState([]);


  // =====================================================
  // SEARCH
  // =====================================================

  const [searchInput, setSearchInput] =
    useState("");

  const [search, setSearch] =
    useState("");


  // =====================================================
  // PAGINATION
  // =====================================================

  const [page, setPage] =
    useState(1);

  const rowsPerPage = 5;

  const [totalPages, setTotalPages] =
    useState(1);


  // =====================================================
  // SORTING
  // =====================================================

  const [sortBy, setSortBy] =
    useState("createdAt");

  const [sortOrder, setSortOrder] =
    useState("DESC");


  // =====================================================
  // LOADING
  // =====================================================

  const [loading, setLoading] =
    useState(true);


  // =====================================================
  // DEBOUNCE SEARCH
  // =====================================================

  useEffect(() => {

    const timer =
      setTimeout(() => {

        setSearch(
          searchInput
        );

        setPage(1);

      }, 700);


    return () => {
      clearTimeout(timer);
    };

  }, [searchInput]);


  // =====================================================
  // FETCH RATINGS
  // =====================================================

  useEffect(() => {

    fetchRatings();

  }, [
    page,
    search,
    sortBy,
    sortOrder,
  ]);


  const fetchRatings = async () => {

    try {

      setLoading(true);


      const response =
        await getStoreRatings({

          page,

          limit:
            rowsPerPage,

          search,

          sortBy,

          sortOrder,

        });


      console.log(
        "Ratings Response:",
        response
      );


      setRatings(
        response.data.ratings || []
      );


      setTotalPages(
        response.data.totalPages || 1
      );


    } catch (error) {

      console.error(
        "Owner Ratings Error:",
        error
      );


      toast.error(
        error.response?.data?.message ||
        "Failed to load ratings"
      );

    } finally {

      setLoading(false);

    }
  };


  // =====================================================
  // SORT
  // =====================================================

  const handleSort = (
    field
  ) => {

    if (sortBy === field) {

      setSortOrder(
        (prev) =>
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
  // LOADING
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
  // UI
  // =====================================================

  return (

    <DashboardLayout>

      <Typography
        variant="h4"
        fontWeight="bold"
        mb={1}
      >
        Store Ratings
      </Typography>


      <Typography
        color="text.secondary"
        mb={3}
      >
        View ratings given by users to your stores.
      </Typography>


      <RatingSearch
        search={searchInput}
        setSearch={setSearchInput}
        setPage={setPage}
      />


      <RatingTable
        ratings={ratings}
        sortBy={sortBy}
        sortOrder={sortOrder}
        onSort={handleSort}
      />


      {totalPages > 1 && (

        <Box
          mt={3}
          mb={3}
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
            size="small"
          />

        </Box>

      )}

    </DashboardLayout>
  );
}


export default Ratings;