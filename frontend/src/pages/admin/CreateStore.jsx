import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Typography,
  Card,
  CardContent,
} from "@mui/material";

import { toast } from "react-toastify";

import DashboardLayout from "../../components/layout/DashboardLayout";
import StoreForm from "../../components/stores/StoreForm";

import {
  getAllOwners,
  createStore,
} from "../../services/admin.service";

function CreateStore() {
  const navigate = useNavigate();

  const [owners, setOwners] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchOwners();
  }, []);

  const fetchOwners = async () => {
    try {
      const response = await getAllOwners();

      setOwners(response.data);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to load owners"
      );
    }
  };

  const handleCreateStore = async (data) => {
    try {
      setLoading(true);

      const response = await createStore(data);

      toast.success(response.message);

      navigate("/admin/stores");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to create store"
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
        Create Store
      </Typography>

      <Card sx={{ maxWidth: 700 }}>
        <CardContent>
          <StoreForm
            defaultValues={{
              name: "",
              email: "",
              address: "",
              ownerId: "",
            }}
            owners={owners}
            loading={loading}
            onSubmit={handleCreateStore}
            buttonText="Create Store"
          />
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}

export default CreateStore;