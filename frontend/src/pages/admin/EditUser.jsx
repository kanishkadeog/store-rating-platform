//store-rating-platform/frontend/src/pages/admin/EditUser.jsx

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  MenuItem,
  Stack,
  CircularProgress,
  Box,
} from "@mui/material";

import { toast } from "react-toastify";

import DashboardLayout from "../../components/layout/DashboardLayout";
import {
  getUserById,
  updateUser,
} from "../../services/user.service";

function EditUser() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
  } = useForm();

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const response = await getUserById(id);

      reset(response.data);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to load user"
      );
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data) => {
    try {
      const response = await updateUser(id, data);

      toast.success(response.message);

      navigate("/admin/users");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Update failed"
      );
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
        Edit User
      </Typography>

      <Card sx={{ maxWidth: 700 }}>
        <CardContent>

          <form onSubmit={handleSubmit(onSubmit)}>

            <Stack spacing={3}>

              <TextField
                label="Full Name"
                {...register("name")}
                fullWidth
              />

              <TextField
                label="Email"
                {...register("email")}
                fullWidth
              />

              <TextField
                label="Address"
                {...register("address")}
                fullWidth
              />

              <TextField
                select
                label="Role"
                defaultValue=""
                {...register("role")}
                fullWidth
              >
                <MenuItem value="ADMIN">
                  ADMIN
                </MenuItem>

                <MenuItem value="OWNER">
                  OWNER
                </MenuItem>

                <MenuItem value="USER">
                  USER
                </MenuItem>

              </TextField>

              <Button
                type="submit"
                variant="contained"
              >
                Update User
              </Button>

            </Stack>

          </form>

        </CardContent>
      </Card>
    </DashboardLayout>
  );
}

export default EditUser;