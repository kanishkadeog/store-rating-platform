// store-rating-platform/frontend/src/components/forms/LoginForm.jsx

import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

// import {
//   Visibility,
//   VisibilityOff,
// } from "@mui/icons-material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { useForm } from "react-hook-form";

import {
  emailValidation,
  passwordValidation,
} from "../../utils/validators";

function LoginForm({ onSubmit, loading }) {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <Card sx={{ width: 420, maxWidth: "100%" }}>
      <CardContent>

        <Typography
          variant="h4"
          align="center"
          gutterBottom
        >
          Login
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
        >

          <Stack spacing={3}>

            <TextField
              label="Email"
              fullWidth
              {...register(
                "email",
                emailValidation
              )}
              error={!!errors.email}
              helperText={errors.email?.message}
            />

            <TextField
              label="Password"
              fullWidth
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              {...register(
                "password",
                passwordValidation
              )}
              error={!!errors.password}
              helperText={
                errors.password?.message
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() =>
                        setShowPassword(
                          !showPassword
                        )
                      }
                      edge="end"
                    >
                      {showPassword ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={loading}
            >
              {loading
                ? "Logging in..."
                : "Login"}
            </Button>

          </Stack>

        </Box>

      </CardContent>
    </Card>
  );
}

export default LoginForm;