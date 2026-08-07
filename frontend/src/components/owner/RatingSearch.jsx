//store-rating-platform/frontend/src/components/owner/RatingSearch.jsx

import { TextField } from "@mui/material";

function RatingSearch({
  search,
  setSearch,
  setPage,
}) {
  return (
    <TextField
      fullWidth
      label="Search by user name or email"
      value={search}
      onChange={(e) => {
        setSearch(e.target.value);
        setPage(1);
      }}
      margin="normal"
    />
  );
}

export default RatingSearch;