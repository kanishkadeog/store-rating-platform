// store-rating-platform/frontend/src/components/layout/DashboardLayout.jsx

import { Box } from "@mui/material";

import Header from "./Header";

import Sidebar from "./Sidebar";
import OwnerSidebar from "./OwnerSidebar";
import UserSidebar from "./UserSidebar";

import { useAuth } from "../../context/AuthContext";

const drawerWidth = 100;


function DashboardLayout({ children }) {
  const { user } = useAuth();

  return (
    <>
      <Header />

      <Box sx={{ display: "flex" }}>
        
        {user?.role === "ADMIN" && <Sidebar />}

        {user?.role === "OWNER" && <OwnerSidebar />}

        {user?.role === "USER" && <UserSidebar />}


        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
             ml: `${drawerWidth}px`,
            mt: "64px",
            mr: "64px",
          }}
        >
          {children}
        </Box>
      </Box>
    </>
  );
}

export default DashboardLayout;