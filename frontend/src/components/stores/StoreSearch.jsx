import { TextField } from "@mui/material";

function StoreSearch({
  searchTerm,
  setSearchTerm,
  setPage,
}) {
  return (
    <TextField
      fullWidth
      label="Search Store"
      placeholder="Search by store, owner or email..."
      margin="normal"
      value={searchTerm}
      onChange={(e) => {
        setSearchTerm(e.target.value);
        setPage(1);
      }}
    />
  );
}

export default StoreSearch;