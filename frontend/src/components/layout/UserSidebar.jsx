// store-rating-platform/frontend/src/components/layout/UserSidebar.jsx

// store-rating-platform/frontend/src/components/layout/UserSidebar.jsx

import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import StarIcon from "@mui/icons-material/Star";

import {
  Link,
  useLocation,
} from "react-router-dom";

const drawerWidth = 220;

const menuItems = [
  {
    text: "Dashboard",
    icon: <DashboardIcon />,
    path: "/user/dashboard",
  },
  {
    text: "My Ratings",
    icon: <StarIcon />,
    path: "/user/ratings",
  },
];

function UserSidebar() {
  const location = useLocation();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,

        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          marginTop: "74px",
        },
      }}
    >
      <List>
        {menuItems.map((item) => (
          <ListItemButton
            key={item.text}
            component={Link}
            to={item.path}
            selected={
              location.pathname === item.path
            }
          >
            <ListItemIcon>
              {item.icon}
            </ListItemIcon>

            <ListItemText
              primary={item.text}
            />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
}

export default UserSidebar;