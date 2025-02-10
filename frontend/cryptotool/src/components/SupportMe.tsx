// src/components/SupportMe.tsx
import React from "react";
import { Box, Typography, Button } from "@mui/material";
import QrCodeIcon from "@mui/icons-material/QrCode";
import { WALLET_ADDRESSES } from "../config/walletConfig";

const SupportMe = () => {
  return (
    <Box
      sx={{
        textAlign: "center",
        p: 4,
        mt: 6,
        backgroundColor: "background.paper",
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <Typography variant="h5" gutterBottom>
        Buy Me a Coffee ☕
      </Typography>
      <Typography variant="body1" color="text.secondary" gutterBottom>
        If you find this app helpful, consider sending a tip!
      </Typography>

      
  );
};

export default SupportMe;