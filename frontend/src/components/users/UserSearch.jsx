//store-rating-platform/frontend/src/components/users/UserSearch.jsx

import { TextField } from "@mui/material";

function UserSearch({ searchTerm, setSearchTerm,setPage,}) {
  return (
    <TextField
      fullWidth
      label="Search users"
      placeholder="Search by name, email, address or role..."
      value={searchTerm}
      onChange={(e) => {
          setSearchTerm(e.target.value);
          setPage(1);
        }}
      sx={{ mb: 3 }}
    />
  );
}

export default UserSearch;