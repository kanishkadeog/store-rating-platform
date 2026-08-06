// store-rating-platform/frontend/src/components/layout/Sidebar.jsx

import { Drawer, List, ListItemButton, ListItemText } from "@mui/material";
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;

function Sidebar() {
  const navigate = useNavigate();

  const menuItems = [
    {
      text: "Dashboard",
      path: "/admin/dashboard",
    },
    {
      text: "Users",
      path: "/admin/users",
    },
    {
      text: "Stores",
      path: "/admin/stores",
    },
    {
      text: "Create User",
      path: "/admin/create-user",
    },
    {
      text: "Create Store",
      path: "/admin/create-store",
    },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          marginTop: "64px",
        },
      }}
    >
      <List>
        {menuItems.map((item) => (
          <ListItemButton
            key={item.text}
            onClick={() => navigate(item.path)}
          >
            <ListItemText primary={item.text} />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
}

export default Sidebar;