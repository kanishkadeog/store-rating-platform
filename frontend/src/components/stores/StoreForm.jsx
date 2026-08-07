//store-rating-platform/frontend/src/components/stores/StoreForm.jsx

import { Controller, useForm } from "react-hook-form";

import {
  Box,
  Button,
  CircularProgress,
  MenuItem,
  TextField,
} from "@mui/material";

function StoreForm({
  defaultValues,
  owners,
  loading,
  onSubmit,
  buttonText,
}) {
  const {
    control,
    handleSubmit,
  } = useForm({
    defaultValues,
  });

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Controller
        name="name"
        control={control}
        rules={{
          required: "Store name is required",
          minLength: {
            value: 3,
            message: "Minimum 3 characters",
          },
        }}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            label="Store Name"
            fullWidth
            margin="normal"
            autoComplete="off"
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
          />
        )}
      />

      <Controller
        name="email"
        control={control}
        rules={{
          required: "Email is required",
          pattern: {
            value: /^\S+@\S+\.\S+$/,
            message: "Invalid email",
          },
        }}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            label="Store Email"
            fullWidth
            margin="normal"
            autoComplete="off"
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
          />
        )}
      />

      <Controller
        name="address"
        control={control}
        rules={{
          required: "Address is required",
        }}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            label="Address"
            fullWidth
            margin="normal"
            multiline
            rows={3}
            autoComplete="off"
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
          />
        )}
      />

      <Controller
        name="ownerId"
        control={control}
        rules={{
          required: "Please select an owner",
        }}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            select
            fullWidth
            label="Store Owner"
            margin="normal"
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
          >
            {owners.map((owner) => (
              <MenuItem
                key={owner.id}
                value={owner.id}
              >
                {owner.name}
              </MenuItem>
            ))}
          </TextField>
        )}
      />

      <Button
        type="submit"
        variant="contained"
        fullWidth
        sx={{ mt: 3 }}
        disabled={loading}
      >
        {loading ? (
          <CircularProgress
            size={24}
            color="inherit"
          />
        ) : (
          buttonText
        )}
      </Button>
    </Box>
  );
}

export default StoreForm;