//store-rating-platform/frontend/src/pages/admin/Stores.jsx

import { useEffect, useState } from "react";

import {
  Typography,
  CircularProgress,
  Box,
  Pagination,
} from "@mui/material";

import { toast } from "react-toastify";

import DashboardLayout from "../../components/layout/DashboardLayout";

import StoreTable from "../../components/stores/StoreTable";

import StoreSearch from "../../components/stores/StoreSearch";

import { getAllStores } from "../../services/store.service";

function Stores() {
  // =====================================================
  // STATE
  // =====================================================

  const [stores, setStores] = useState([]);

  const [loading, setLoading] =
    useState(true);

  // Search
  const [searchTerm, setSearchTerm] =
    useState("");

  // Pagination
  const [page, setPage] = useState(1);

  const [totalPages, setTotalPages] =
    useState(1);

  // Sorting
  const [sortBy, setSortBy] =
    useState("name");

  const [sortOrder, setSortOrder] =
    useState("ASC");

  const rowsPerPage = 5;

  // =====================================================
  // FETCH STORES
  // =====================================================

  useEffect(() => {
    fetchStores();
  }, [
    page,
    searchTerm,
    sortBy,
    sortOrder,
  ]);

  const fetchStores = async () => {
    try {
      setLoading(true);

      const response =
        await getAllStores({
          page,
          limit: rowsPerPage,
          search: searchTerm,
          sortBy,
          order: sortOrder,
        });

      console.log(
        "Admin Stores Response:",
        response
      );

      setStores(
        response.data?.stores || []
      );

      setTotalPages(
        response.data?.totalPages || 1
      );
    } catch (error) {
      console.error(
        "Admin Stores Error:",
        error
      );

      toast.error(
        error.response?.data?.message ||
          "Failed to fetch stores"
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // SORTING
  // =====================================================

  const handleSort = (field) => {
    if (sortBy === field) {
      // Same column → toggle ASC/DESC

      setSortOrder((prev) =>
        prev === "ASC"
          ? "DESC"
          : "ASC"
      );
    } else {
      // New column → start ASC

      setSortBy(field);
      setSortOrder("ASC");
    }

    // Return to first page
    setPage(1);
  };

  // =====================================================
  // SEARCH
  // =====================================================

  const handleSearch = (value) => {
    setSearchTerm(value);

    // Return to first page
    setPage(1);
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
          sx={{ mb: 2 }}
        >
          Store Management
        </Typography>

        {/* SEARCH */}

        <StoreSearch
          searchTerm={searchTerm}
          onSearch={handleSearch}
        />

        {/* STORE TABLE */}

        <StoreTable
          stores={stores}
          sortBy={sortBy}
          sortOrder={sortOrder}
          onSort={handleSort}
        />

        {/* PAGINATION */}

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
            onChange={(event, value) => {
              setPage(value);
            }}
          />
        </Box>
      </Box>
    </DashboardLayout>
  );
}

export default Stores;

// import { useEffect, useState } from "react";
// import {
//   Typography,
//   CircularProgress,
//   Box,
// } from "@mui/material";
// import { toast } from "react-toastify";

// import DashboardLayout from "../../components/layout/DashboardLayout";
// import StoreTable from "../../components/stores/StoreTable";
// import { getAllStores } from "../../services/store.service";

// import Pagination from "@mui/material/Pagination";
// import StoreSearch from "../../components/stores/StoreSearch";

// function Stores() {
//   const [stores, setStores] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const [searchTerm, setSearchTerm] = useState("");

// const [page, setPage] = useState(1);

// const rowsPerPage = 5;

//   useEffect(() => {
//     fetchStores();
//   }, []);

//   const fetchStores = async () => {
//     try {
//       const response = await getAllStores();

//       setStores(response.data);
//     } catch (error) {
//       toast.error(
//         error.response?.data?.message ||
//         "Failed to fetch stores"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   const filteredStores = stores.filter((store) => {
//   const keyword = searchTerm.toLowerCase();

//   return (
//     store.name.toLowerCase().includes(keyword) ||
//     store.email.toLowerCase().includes(keyword) ||
//     store.address.toLowerCase().includes(keyword) ||
//     store.owner?.name
//       ?.toLowerCase()
//       .includes(keyword) ||
//     store.owner?.email
//       ?.toLowerCase()
//       .includes(keyword)
//   );
// });

// const totalPages = Math.ceil(
//   filteredStores.length / rowsPerPage
// );

// const paginatedStores = filteredStores.slice(
//   (page - 1) * rowsPerPage,
//   page * rowsPerPage
// );



//   if (loading) {
//     return (
//       <DashboardLayout>
//         <Box
//           display="flex"
//           justifyContent="center"
//           mt={8}
//         >
//           <CircularProgress />
//         </Box>
//       </DashboardLayout>
//     );
//   }

//   return (
//     <DashboardLayout>
//       <Typography
//         variant="h4"
//         fontWeight="bold"
//         mb={3}
//       >
//         Store Management
//       </Typography>

//       {/* <StoreTable stores={stores} /> */}
//       <>
//   <StoreSearch
//     searchTerm={searchTerm}
//     setSearchTerm={setSearchTerm}
//     setPage={setPage}
//   />

//   <StoreTable
//     stores={paginatedStores}
//   />

//   <Box
//     display="flex"
//     justifyContent="center"
//     mt={3}
//   >
//     <Pagination
//       count={totalPages}
//       page={page}
//       color="primary"
//       onChange={(event, value) =>
//         setPage(value)
//       }
//     />
//   </Box>
// </>


//     </DashboardLayout>
//   );
// }

// export default Stores;