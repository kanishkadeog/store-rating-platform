//store-rating-platform/frontend/src/pages/admin/CreateUser.jsx

import {
  Typography,
  Card,
  CardContent,
} from "@mui/material";

import DashboardLayout from "../../components/layout/DashboardLayout";

import { useState } from "react";
import UserForm from "../../components/users/UserForm";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { createUser } from "../../services/admin.service";

function CreateUser() {

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

  const handleCreateUser = async (data) => {
  try {
    setLoading(true);

    const response = await createUser(data);

    toast.success(response.message);

    navigate("/admin/users");
  } catch (error) {
    toast.error(
      error.response?.data?.message ||
      "Failed to create user"
    );
  } finally {
    setLoading(false);
  }
};

  return (
    <DashboardLayout>
      <Typography
        variant="h4"
        fontWeight="bold"
        mb={3}
      >
        Create User
      </Typography>

      <Card sx={{ maxWidth: 700 }}>
        <CardContent>
         <UserForm
  defaultValues={{
    name: "",
    email: "",
    password: "",
    address: "",
    role: "USER",
  }}
  onSubmit={handleCreateUser}
  loading={loading}
  buttonText="Create User"
/>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}

export default CreateUser;