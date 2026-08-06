//store-rating-platform/frontend/src/pages/admin/UserDetails.jsx

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Box,
  Stack,
} from "@mui/material";

import { toast } from "react-toastify";

import DashboardLayout from "../../components/layout/DashboardLayout";

import { getUserById } from "../../services/user.service";

function UserDetails() {
  const { id } = useParams();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const response = await getUserById(id);

      setUser(response.data);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Failed to load user"
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
        User Details
      </Typography>

      <Card sx={{ maxWidth: 700 }}>
        <CardContent>

          <Stack spacing={2}>

            <Typography>
              <strong>Name:</strong> {user.name}
            </Typography>

            <Typography>
              <strong>Email:</strong> {user.email}
            </Typography>

            <Typography>
              <strong>Address:</strong> {user.address}
            </Typography>

            <Typography>
              <strong>Role:</strong> {user.role}
            </Typography>

          </Stack>

        </CardContent>
      </Card>
    </DashboardLayout>
  );
}

export default UserDetails;