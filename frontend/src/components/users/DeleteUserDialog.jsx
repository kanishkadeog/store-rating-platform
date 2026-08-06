////store-rating-platform/frontend/src/components/users/DeleteUserDialog.jsx

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";

function DeleteUserDialog({
  open,
  onClose,
  onDelete,
}) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
    >
      <DialogTitle>
        Delete User
      </DialogTitle>

      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete this
          user?
        </DialogContentText>
      </DialogContent>

      <DialogActions>

        <Button onClick={onClose}>
          Cancel
        </Button>

        <Button
          color="error"
          variant="contained"
          onClick={onDelete}
        >
          Delete
        </Button>

      </DialogActions>
    </Dialog>
  );
}

export default DeleteUserDialog;