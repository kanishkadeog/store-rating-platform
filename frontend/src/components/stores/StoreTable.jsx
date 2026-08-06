// store-rating-platform/frontend/src/components/stores/StoreTable.jsx

import {
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
} from "@mui/material";

function StoreTable({ stores }) {
  return (
    <TableContainer component={Paper}>
      <Table>

        <TableHead>
          <TableRow>
            <TableCell><b>Store</b></TableCell>
            <TableCell><b>Email</b></TableCell>
            <TableCell><b>Address</b></TableCell>
            <TableCell><b>Owner</b></TableCell>
            <TableCell><b>Average Rating</b></TableCell>
          </TableRow>
        </TableHead>

        <TableBody>

  {stores.length === 0 ? (

    <TableRow>

      <TableCell
        colSpan={5}
        align="center"
      >
        No stores found
      </TableCell>

    </TableRow>

  ) : (

    stores.map((store) => (

      <TableRow key={store.id}>

        <TableCell>{store.name}</TableCell>

        <TableCell>{store.email}</TableCell>

        <TableCell>{store.address}</TableCell>

        <TableCell>
          {store.owner?.name}
        </TableCell>

        <TableCell>
          ⭐ {store.averageRating}
        </TableCell>

      </TableRow>

    ))

  )}

</TableBody>

      </Table>
    </TableContainer>
  );
}

export default StoreTable;