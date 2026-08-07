// store-rating-platform/frontend/src/components/users/UserForm.jsx

import { useForm, Controller } from "react-hook-form";

import {
  Box,
  TextField,
  Button,
  MenuItem,
} from "@mui/material";

import CircularProgress from "@mui/material/CircularProgress";

function UserForm({
  defaultValues,
  onSubmit,
  loading,
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
  required: "Name is required",
  minLength: {
    value: 20,
    message: "Minimum 20 characters",
  },
  maxLength: {
    value: 60,
    message: "Maximum 60 characters",
  },
}}

        render={({ field, fieldState }) => (
          <TextField
            {...field}
            label="Full Name"
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
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            autoComplete="off"
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
          />
        )}
      />

      <Controller
        name="password"
        control={control}
       
        rules={{
  required: "Password is required",
  minLength: {
    value: 8,
    message: "Minimum 8 characters",
  },
  maxLength: {
    value: 16,
    message: "Maximum 16 characters",
  },
}}

        render={({ field, fieldState }) => (
          <TextField
            {...field}
            label="Password"
            type="password"
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
  maxLength: {
    value: 400,
    message: "Maximum 400 characters",
  },
}}

        render={({ field, fieldState }) => (
          <TextField
            {...field}
            label="Address"
            fullWidth
            margin="normal"
            autoComplete="off"
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
          />
        )}
      />

      <Controller
        name="role"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            select
            label="Role"
            fullWidth
            margin="normal"
            autoComplete="off"
          >
            <MenuItem value="USER">
              USER
            </MenuItem>

            <MenuItem value="OWNER">
              OWNER
            </MenuItem>

            <MenuItem value="ADMIN">
              ADMIN
            </MenuItem>
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

export default UserForm;