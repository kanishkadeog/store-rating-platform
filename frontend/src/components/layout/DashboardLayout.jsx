// store-rating-platform/frontend/src/components/layout/DashboardLayout.jsx

import { Box } from "@mui/material";

import Header from "./Header";
import Sidebar from "./Sidebar";

function DashboardLayout({ children }) {
  return (
    <>
      <Header />

      <Box sx={{ display: "flex" }}>
        <Sidebar />

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            ml: "240px",
            mt: "64px",
          }}
        >
          {children}
        </Box>
      </Box>
    </>
  );
}

export default DashboardLayout;