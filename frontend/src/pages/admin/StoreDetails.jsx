//store-rating-platform/frontend/src/pages/admin/StoreDetails.jsx

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import {
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Box,
  Stack,
  Button,
  Rating,
} from "@mui/material";

import { toast } from "react-toastify";

import DashboardLayout from "../../components/layout/DashboardLayout";
import { getStoreById } from "../../services/store.service";

function StoreDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [store, setStore] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStore();
  }, []);

  const fetchStore = async () => {
    try {
      const response = await getStoreById(id);

      setStore(response.data);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Failed to load store"
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
        Store Details
      </Typography>

      <Card sx={{ maxWidth: 700 }}>
        <CardContent>
          <Stack spacing={2}>
            <Typography>
              <strong>Store Name:</strong> {store.name}
            </Typography>

            <Typography>
              <strong>Email:</strong> {store.email}
            </Typography>

            <Typography>
              <strong>Address:</strong> {store.address}
            </Typography>

            <Typography>
              <strong>Owner:</strong> {store.owner?.name}
            </Typography>

            <Typography>
              <strong>Owner Email:</strong> {store.owner?.email}
            </Typography>

            <Box display="flex" alignItems="center" gap={2}>
              <Typography>
                <strong>Average Rating:</strong>
              </Typography>

              <Rating
                value={Number(store.averageRating || 0)}
                precision={0.5}
                readOnly
              />

              {/* <Typography>
                ({store.averageRating || 0})
              </Typography> */}

              <Typography>
               ({Number(store.averageRating || 0).toFixed(1)})
           </Typography>
            </Box>

            <Button
              variant="contained"
              onClick={() => navigate("/admin/stores")}
            >
              Back
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}

export default StoreDetails;