//store-rating-platform/frontend/src/pages/admin/Stores.jsx

import { useEffect, useState } from "react";
import {
  Typography,
  CircularProgress,
  Box,
} from "@mui/material";
import { toast } from "react-toastify";

import DashboardLayout from "../../components/layout/DashboardLayout";
import StoreTable from "../../components/stores/StoreTable";
import { getAllStores } from "../../services/store.service";

import Pagination from "@mui/material/Pagination";
import StoreSearch from "../../components/stores/StoreSearch";

function Stores() {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");

const [page, setPage] = useState(1);

const rowsPerPage = 5;

  useEffect(() => {
    fetchStores();
  }, []);

  const fetchStores = async () => {
    try {
      const response = await getAllStores();

      setStores(response.data);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Failed to fetch stores"
      );
    } finally {
      setLoading(false);
    }
  };

  const filteredStores = stores.filter((store) => {
  const keyword = searchTerm.toLowerCase();

  return (
    store.name.toLowerCase().includes(keyword) ||
    store.email.toLowerCase().includes(keyword) ||
    store.address.toLowerCase().includes(keyword) ||
    store.owner?.name
      ?.toLowerCase()
      .includes(keyword) ||
    store.owner?.email
      ?.toLowerCase()
      .includes(keyword)
  );
});

const totalPages = Math.ceil(
  filteredStores.length / rowsPerPage
);

const paginatedStores = filteredStores.slice(
  (page - 1) * rowsPerPage,
  page * rowsPerPage
);



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
        Store Management
      </Typography>

      {/* <StoreTable stores={stores} /> */}
      <>
  <StoreSearch
    searchTerm={searchTerm}
    setSearchTerm={setSearchTerm}
    setPage={setPage}
  />

  <StoreTable
    stores={paginatedStores}
  />

  <Box
    display="flex"
    justifyContent="center"
    mt={3}
  >
    <Pagination
      count={totalPages}
      page={page}
      color="primary"
      onChange={(event, value) =>
        setPage(value)
      }
    />
  </Box>
</>


    </DashboardLayout>
  );
}

export default Stores;