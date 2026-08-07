//store-rating-platform/frontend/src/components/owner/RaringTable.jsx


import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Rating,
} from "@mui/material";

function RatingTable({ ratings }) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <strong>User</strong>
            </TableCell>

            <TableCell>
              <strong>Email</strong>
            </TableCell>

            <TableCell>
              <strong>Rating</strong>
            </TableCell>

            <TableCell>
              <strong>Date</strong>
            </TableCell>
          </TableRow>
        </TableHead>


{/* <TableBody>
  {ratings.map((item) => (
    <TableRow key={item.userId}>
      <TableCell>{item.name}</TableCell>

      <TableCell>{item.email}</TableCell>

      <TableCell>
        <Rating
          readOnly
          value={item.rating}
        />
      </TableCell>

      <TableCell>-</TableCell>
    </TableRow>
  ))}
</TableBody> */}


        <TableBody>
          {ratings.map((item) => (
            <TableRow key={item.id}>
              <TableCell>
                {item.user?.name}
              </TableCell>

              <TableCell>
                {item.user?.email}
              </TableCell>

              <TableCell>
                <Rating
                  readOnly
                  value={item.rating}
                />
              </TableCell>

              <TableCell>
                {new Date(
                  item.createdAt
                ).toLocaleDateString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default RatingTable;