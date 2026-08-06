//store-rating-platform/frontend/src/pages/auth/Login.jsx

import { useState } from "react";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import LoginForm from "../../components/forms/LoginForm";
import { loginUser } from "../../services/auth.service";
import { useAuth } from "../../context/AuthContext";

function Login() {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
const { login } = useAuth();

  const handleLogin = async (data) => {
    try {
      setLoading(true);

      // const response = await loginUser(data);

      // const { token, user } = response.data;
const response = await loginUser(data);

const { token, user } = response;

      // localStorage.setItem("token", token);
      // localStorage.setItem("user", JSON.stringify(user));
login(token, user);

      toast.success(response.message);

      switch (user.role) {
        case "ADMIN":
          navigate("/admin/dashboard");
          break;

        case "OWNER":
          navigate("/owner/dashboard");
          break;

        default:
          navigate("/user/dashboard");
      }
    } 
    catch (error) {
      toast.error(
        error.response?.data?.message || "Login failed"
      );
    } 
//     catch (error) {
//   console.log("Full Error:", error);
//   console.log("Response:", error.response);
//   console.log("Data:", error.response?.data);

//   toast.error(
//     error.response?.data?.message || "Login failed"
//   );
// }
    finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "#f5f5f5",
        p: 2,
      }}
    >
      <LoginForm
        onSubmit={handleLogin}
        loading={loading}
      />
    </Box>
  );
}

export default Login;