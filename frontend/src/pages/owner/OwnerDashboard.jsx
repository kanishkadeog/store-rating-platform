//store-rating-platform/frontend/src/pages/owner/OwnerDashboard.jsx

import {
  Grid,
  Typography,
  CircularProgress,
  Box,
  Paper,
  TextField,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

import {
  Visibility,
} from "@mui/icons-material";

import {
  useEffect,
  useState,
} from "react";

import { toast } from "react-toastify";

import DashboardLayout
  from "../../components/layout/DashboardLayout";

import OwnerStatCard
  from "../../components/owner/OwnerStatCard";

import {
  getOwnerDashboard,
} from "../../services/owner.service";


function OwnerDashboard() {

  // =====================================================
  // STATE
  // =====================================================

  const [stores, setStores] =
    useState([]);

  const [totalStores, setTotalStores] =
    useState(0);

  const [loading, setLoading] =
    useState(true);


  // =====================================================
  // SEARCH
  // =====================================================

  const [searchInput, setSearchInput] =
    useState("");

  const [searchTerm, setSearchTerm] =
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
    useState("name");

  const [sortOrder, setSortOrder] =
    useState("ASC");


  // =====================================================
  // STORE DETAILS
  // =====================================================

  const [selectedStore, setSelectedStore] =
    useState(null);

  const [openDetails, setOpenDetails] =
    useState(false);


  // =====================================================
  // DEBOUNCE SEARCH
  // =====================================================

  useEffect(() => {

    const timer =
      setTimeout(() => {

        setSearchTerm(
          searchInput
        );

        setPage(1);

      }, 700);


    return () => {
      clearTimeout(timer);
    };

  }, [searchInput]);


  // =====================================================
  // FETCH DASHBOARD
  // =====================================================

  useEffect(() => {

    fetchDashboard();

  }, [
    page,
    searchTerm,
    sortBy,
    sortOrder,
  ]);


  const fetchDashboard = async () => {

    try {

      setLoading(true);


      const response =
        await getOwnerDashboard({

          page,

          limit:
            rowsPerPage,

          search:
            searchTerm,

          sortBy,

          sortOrder,

        });


      console.log(
        "Owner Dashboard Response:",
        response
      );


      const data =
        response.data;


      setStores(
        data.stores || []
      );


      setTotalStores(
        data.totalStores || 0
      );


      setTotalPages(
        data.totalPages || 1
      );


    } catch (error) {

      console.error(
        "Owner Dashboard Error:",
        error
      );


      toast.error(
        error.response?.data?.message ||
        "Failed to load dashboard"
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
  // VIEW STORE DETAILS
  // =====================================================

  const handleViewDetails = (
    store
  ) => {

    setSelectedStore(store);

    setOpenDetails(true);

  };


  // =====================================================
  // CALCULATE SUMMARY
  // =====================================================

  const totalRatings =
    stores.reduce(
      (sum, store) =>
        sum +
        Number(
          store.totalRatings || 0
        ),
      0
    );


  const averageRating =
    stores.length > 0

      ? (
          stores.reduce(
            (sum, store) =>
              sum +
              Number(
                store.averageRating || 0
              ),
            0
          ) / stores.length
        ).toFixed(1)

      : "0.0";


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

      <Box
        sx={{
          width: "100%",
          maxWidth: "1200px",
          mx: "auto",
        }}
      >

        {/* =================================================
            TITLE
        ================================================= */}

        <Typography
          variant="h4"
          fontWeight="bold"
          mb={1}
        >
          Owner Dashboard
        </Typography>


        <Typography
          color="text.secondary"
          mb={3}
        >
          Manage your stores and view their ratings.
        </Typography>


        {/* =================================================
            SUMMARY
        ================================================= */}

        <Grid
          container
          spacing={2}
          sx={{ mb: 3 }}
        >

          <Grid
            size={{
              xs: 12,
              md: 4,
            }}
          >

            <OwnerStatCard
              title="My Stores"
              value={totalStores}
            />

          </Grid>


          <Grid
            size={{
              xs: 12,
              md: 4,
            }}
          >

            <OwnerStatCard
              title="Total Ratings"
              value={totalRatings}
            />

          </Grid>


          <Grid
            size={{
              xs: 12,
              md: 4,
            }}
          >

            <OwnerStatCard
              title="Average Rating"
              value={`⭐ ${averageRating}`}
            />

          </Grid>

        </Grid>


        {/* =================================================
            SEARCH
        ================================================= */}

        <TextField
          fullWidth
          size="small"
          placeholder="Search by store name, email or address..."
          value={searchInput}
          onChange={(e) => {

            setSearchInput(
              e.target.value
            );

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
            STORE TABLE
        ================================================= */}

        <TableContainer
          component={Paper}
          sx={{
            width: "100%",
            overflowX: "auto",
          }}
        >

          <Table>

            <TableHead>

              <TableRow>

                {/* STORE */}

                <TableCell>

                  <TableSortLabel
                    active={
                      sortBy === "name"
                    }

                    direction={
                      sortBy === "name"
                        ? sortOrder.toLowerCase()
                        : "asc"
                    }

                    hideSortIcon={false}

                    onClick={() =>
                      handleSort("name")
                    }

                    sx={{

                      color:
                        sortBy === "name"
                          ? "text.primary"
                          : "text.secondary",

                      fontWeight:
                        sortBy === "name"
                          ? 700
                          : 600,

                      "& .MuiTableSortLabel-icon": {
                        opacity: 1,
                      },

                    }}
                  >

                    <strong>
                      Store
                    </strong>

                  </TableSortLabel>

                </TableCell>


                {/* EMAIL */}

                <TableCell>

                  <TableSortLabel
                    active={
                      sortBy === "email"
                    }

                    direction={
                      sortBy === "email"
                        ? sortOrder.toLowerCase()
                        : "asc"
                    }

                    hideSortIcon={false}

                    onClick={() =>
                      handleSort("email")
                    }

                    sx={{

                      color:
                        sortBy === "email"
                          ? "text.primary"
                          : "text.secondary",

                      fontWeight:
                        sortBy === "email"
                          ? 700
                          : 600,

                      "& .MuiTableSortLabel-icon": {
                        opacity: 1,
                      },

                    }}
                  >

                    <strong>
                      Email
                    </strong>

                  </TableSortLabel>

                </TableCell>


                {/* ADDRESS */}

                <TableCell>

                  <TableSortLabel
                    active={
                      sortBy === "address"
                    }

                    direction={
                      sortBy === "address"
                        ? sortOrder.toLowerCase()
                        : "asc"
                    }

                    hideSortIcon={false}

                    onClick={() =>
                      handleSort("address")
                    }

                    sx={{

                      color:
                        sortBy === "address"
                          ? "text.primary"
                          : "text.secondary",

                      fontWeight:
                        sortBy === "address"
                          ? 700
                          : 600,

                      "& .MuiTableSortLabel-icon": {
                        opacity: 1,
                      },

                    }}
                  >

                    <strong>
                      Address
                    </strong>

                  </TableSortLabel>

                </TableCell>


                {/* AVERAGE RATING */}

                <TableCell>

                  <strong>
                    Average Rating
                  </strong>

                </TableCell>


                {/* TOTAL RATINGS */}

                <TableCell>

                  <strong>
                    Total Ratings
                  </strong>

                </TableCell>


                {/* ACTION */}

                <TableCell align="center">

                  <strong>
                    Action
                  </strong>

                </TableCell>

              </TableRow>

            </TableHead>


            <TableBody>

              {stores.length === 0 ? (

                <TableRow>

                  <TableCell
                    colSpan={6}
                    align="center"
                  >

                    <Typography
                      color="text.secondary"
                      sx={{
                        py: 3,
                      }}
                    >

                      {searchTerm
                        ? "No stores found matching your search."
                        : "You do not have any stores yet."
                      }

                    </Typography>

                  </TableCell>

                </TableRow>

              ) : (

                stores.map(
                  (store) => (

                    <TableRow
                      key={store.id}
                      hover
                    >

                      <TableCell>

                        <Typography
                          fontWeight={600}
                        >
                          {store.name}
                        </Typography>

                      </TableCell>


                      <TableCell>
                        {store.email}
                      </TableCell>


                      <TableCell>
                        {store.address}
                      </TableCell>


                      <TableCell>

                        ⭐{" "}
                        {Number(
                          store.averageRating || 0
                        ).toFixed(1)}

                      </TableCell>


                      <TableCell>
                        {store.totalRatings}
                      </TableCell>


                      <TableCell align="center">

                        <Tooltip
                          title="View store details"
                        >

                          <IconButton
                            color="primary"
                            size="small"
                            onClick={() =>
                              handleViewDetails(
                                store
                              )
                            }
                          >

                            <Visibility />

                          </IconButton>

                        </Tooltip>

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
            display="flex"
            justifyContent="center"
            mt={3}
            mb={3}
          >

            <Pagination
              count={totalPages}
              page={page}
              color="primary"
              size="small"
              onChange={(_, value) =>
                setPage(value)
              }
            />

          </Box>

        )}


        {/* =================================================
            STORE DETAILS DIALOG
        ================================================= */}

        <Dialog
          open={openDetails}
          onClose={() => {

            setOpenDetails(false);

            setSelectedStore(null);

          }}

          fullWidth
          maxWidth="sm"
        >

          <DialogTitle>
            Store Details
          </DialogTitle>


          <DialogContent>

            {selectedStore && (

              <Box
                sx={{
                  pt: 1,
                }}
              >

                <Typography mb={1}>
                  <strong>
                    Store Name:
                  </strong>{" "}
                  {selectedStore.name}
                </Typography>


                <Typography mb={1}>
                  <strong>
                    Email:
                  </strong>{" "}
                  {selectedStore.email}
                </Typography>


                <Typography mb={1}>
                  <strong>
                    Address:
                  </strong>{" "}
                  {selectedStore.address}
                </Typography>


                <Typography mb={1}>
                  <strong>
                    Average Rating:
                  </strong>{" "}
                  ⭐{" "}
                  {selectedStore.averageRating}
                </Typography>


                <Typography>
                  <strong>
                    Total Ratings:
                  </strong>{" "}
                  {selectedStore.totalRatings}
                </Typography>

              </Box>

            )}

          </DialogContent>


          <DialogActions>

            <Button
              onClick={() => {

                setOpenDetails(false);

                setSelectedStore(null);

              }}
            >
              Close
            </Button>

          </DialogActions>

        </Dialog>

      </Box>

    </DashboardLayout>
  );
}


export default OwnerDashboard;