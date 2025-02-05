// components/Footer.tsx
import React from "react";
import { Box, Typography, Link } from "@mui/material";

const Footer = () => {
  return (
    <Box
      sx={{
        mt: 8,
        py: 2,
        textAlign: "center",
        backgroundColor: (theme) =>
          theme.palette.mode === "dark" ? "#1e1e1e" : "#f5f5f5",
        borderTop: (theme) => `1px solid ${theme.palette.divider}`,
      }}
    >
      <Typography variant="body2" color="textSecondary">
        Powered by{" "}
        <Link
          href="https://www.coingecko.com"
          target="_blank"
          rel="noopener noreferrer"
          color="inherit"
          underline="hover"
        >
          CoinGecko API
        </Link>
      </Typography>
    </Box>
  );
};

export default Footer;
