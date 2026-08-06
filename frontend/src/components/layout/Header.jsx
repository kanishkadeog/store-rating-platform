// store-rating-platform/frontend/src/components/layout/Header.jsx

import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Header() {
  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <AppBar position="static">
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h6">
          Store Rating Platform
        </Typography>

        <div>
          <Typography
            component="span"
            sx={{ mr: 2 }}
          >
            {user?.name}
          </Typography>

          <Button
            color="inherit"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Header;