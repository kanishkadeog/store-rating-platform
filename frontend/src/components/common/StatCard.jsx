//store-rating-platform/frontend/src/components/common/StatCard.jsx

import { Card, CardContent, Typography, Box } from "@mui/material";

function StatCard({ title, value, icon, color }) {
  return (
    <Card
      elevation={3}
      sx={{
        borderRadius: 3,
        transition: "0.3s",
        "&:hover": {
          transform: "translateY(-5px)",
        },
      }}
    >
      <CardContent>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box>
            <Typography
              variant="body2"
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
          </Box>

          <Box
            sx={{
              color,
              fontSize: 45,
            }}
          >
            {icon}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

export default StatCard;