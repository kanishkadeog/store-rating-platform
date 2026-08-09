//store-rating-platform/frontend/src/components/users/RateDialog.jsx

// store-rating-platform/frontend/src/components/users/RateDialog.jsx

import { useEffect, useState } from "react";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Rating,
  Typography,
  Box,
  Divider,
} from "@mui/material";

function RateDialog({
  open,
  store,
  onClose,
  onSubmit,
  loading,
}) {
  const [rating, setRating] = useState(0);

  // ============================================
  // SET EXISTING RATING WHEN DIALOG OPENS
  // ============================================

  useEffect(() => {
    if (store) {
      setRating(store.userRating || 0);
    } else {
      setRating(0);
    }
  }, [store]);

  // ============================================
  // CLOSE DIALOG
  // ============================================

  const handleClose = () => {
    // Do not allow closing while submitting
    if (loading) {
      return;
    }

    setRating(0);

    onClose();
  };

  // ============================================
  // SUBMIT RATING
  // ============================================

  const handleSubmit = () => {
    if (!rating || !store) {
      return;
    }

    onSubmit({
      storeId: store.id,
      rating,
    });
  };

  // ============================================
  // CHECK WHETHER THIS IS AN UPDATE
  // ============================================

  const isUpdate = Boolean(
    store?.userRating
  );

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
    >
      {/* ========================================
          TITLE
      ======================================== */}

      <DialogTitle>
        {isUpdate
          ? "Update Rating"
          : "Rate Store"}
      </DialogTitle>

      <Divider />

      {/* ========================================
          CONTENT
      ======================================== */}

      <DialogContent sx={{ pt: 3 }}>
        {store && (
          <>
            {/* Store Name */}
            <Typography
              variant="h6"
              fontWeight="bold"
              mb={1}
            >
              {store.name}
            </Typography>

            {/* Store Address */}
            <Typography
              variant="body2"
              color="text.secondary"
              mb={3}
            >
              {store.address}
            </Typography>

            {/* Rating Section */}
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              gap={1.5}
              py={2}
            >
              <Typography
                variant="body1"
                fontWeight={500}
              >
                {isUpdate
                  ? "Update your rating"
                  : "Select your rating"}
              </Typography>

              {/* Stars */}
              <Rating
                value={rating}
                onChange={(
                  event,
                  newValue
                ) => {
                  setRating(newValue || 0);
                }}
                size="large"
                disabled={loading}
              />

              {/* Selected Rating */}
              {rating > 0 ? (
                <Typography
                  variant="body1"
                  fontWeight={600}
                >
                  {rating} / 5
                </Typography>
              ) : (
                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  Please select a rating
                </Typography>
              )}
            </Box>
          </>
        )}
      </DialogContent>

      {/* ========================================
          ACTION BUTTONS
      ======================================== */}

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button
          onClick={handleClose}
          disabled={loading}
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={!rating || loading}
        >
          {loading
            ? isUpdate
              ? "Updating..."
              : "Submitting..."
            : isUpdate
            ? "Update Rating"
            : "Submit Rating"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default RateDialog;