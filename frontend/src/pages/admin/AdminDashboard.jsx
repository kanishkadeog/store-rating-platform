//store-rating-platform/frontend/src/pages/admin/AdminDashboard.jsx

import { useEffect, useState } from "react";

import {
  Typography,
  CircularProgress,
  Box,
} from "@mui/material";

import Grid from "@mui/material/Grid";

import {
  People,
  Store,
  Star,
} from "@mui/icons-material";

import { toast } from "react-toastify";

import DashboardLayout from "../../components/layout/DashboardLayout";
import StatCard from "../../components/common/StatCard";
import { getDashboardStats } from "../../services/dashboard.service";

function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalStores: 0,
    totalRatings: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const response = await getDashboardStats();

      setStats(response.data);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to load dashboard"
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
        mb={4}
      >
        Dashboard
      </Typography>

      <Grid container spacing={3}>
        <Grid size={{ xs: 9, md: 4 }}>
          <StatCard
            title="Total Users"
            value={stats.totalUsers}
            icon={<People fontSize="inherit" />}
            color="#1976d2"
          />
        </Grid>

        <Grid size={{ xs: 9, md: 4 }}>
          <StatCard
            title="Total Stores"
            value={stats.totalStores}
            icon={<Store fontSize="inherit" />}
            color="#2e7d32"
          />
        </Grid>

        <Grid size={{ xs: 9, md: 4 }}>
          <StatCard
            title="Total Ratings"
            value={stats.totalRatings}
            icon={<Star fontSize="inherit" />}
            color="#ed6c02"
          />
        </Grid>
      </Grid>
    </DashboardLayout>
  );
}

export default AdminDashboard;