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

      {/* Bitcoin */}
      <Box sx={{ mt: 2 }}>
        <Typography variant="subtitle1">Bitcoin (BTC):</Typography>
        <Typography variant="body2" sx={{ wordBreak: "break-all" }}>
          {WALLET_ADDRESSES.bitcoin}
        </Typography>
        <Button
          onClick={() =>
            window.open(
              `https://chart.googleapis.com/chart?chs=200x200&cht=qr&chl=${WALLET_ADDRESSES.bitcoin}`,
              "_blank"
            )
          }
          startIcon={<QrCodeIcon />}
          size="small"
          sx={{ mt: 1 }}
        >
          Show QR Code
        </Button>
      </Box>

      
      </Box>
    </Box>
  );
};

export default SupportMe;