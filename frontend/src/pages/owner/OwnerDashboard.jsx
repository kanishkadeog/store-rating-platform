//store-rating-platform/frontend/src/pages/owner/OwnerDashboard.jsx

import {
  Grid,
  Typography,
  CircularProgress,
  Box,
} from "@mui/material";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import DashboardLayout from "../../components/layout/DashboardLayout";

import OwnerStatCard from "../../components/owner/OwnerStatCard";

import {
  getOwnerDashboard,
} from "../../services/owner.service";

function OwnerDashboard() {
  const [loading, setLoading] = useState(true);

  const [dashboard, setDashboard] =
    useState(null);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const response =
        await getOwnerDashboard();

            console.log("Owner Dashboard Response:", response);


      setDashboard(response.data);
    } catch (error) {
          console.log(error);

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
        mb={3}
      >
        Owner Dashboard
      </Typography>

      <Grid
        container
        spacing={3}
      >
        <Grid size={{ xs: 12, md: 4 }}>
          <OwnerStatCard
            title="Store"
            value={dashboard.store?.name}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <OwnerStatCard
            title="Average Rating"
            value={
              Number(
                dashboard.averageRating || 0
              ).toFixed(1)
            }
          />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <OwnerStatCard
            title="Total Ratings"
            value={dashboard.totalRatings}
          />
        </Grid>
      </Grid>
    </DashboardLayout>
  );
}

export default OwnerDashboard;