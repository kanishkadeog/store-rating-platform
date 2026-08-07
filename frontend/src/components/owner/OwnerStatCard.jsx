//store-rating-platform/frontend/src/components/owner/OwnerStatCard.jsx

import {
  Card,
  CardContent,
  Typography,
} from "@mui/material";

function OwnerStatCard({
  title,
  value,
}) {
  return (
    <Card elevation={3}>
      <CardContent>
        <Typography
          color="text.secondary"
        >
          {title}
        </Typography>

        <Typography
          variant="h4"
          fontWeight="bold"
          mt={1}
        >
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default OwnerStatCard;