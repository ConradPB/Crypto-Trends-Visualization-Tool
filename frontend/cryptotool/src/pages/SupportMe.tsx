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

      {/* Ethereum */}
      <Box sx={{ mt: 2 }}>
        <Typography variant="subtitle1">Ethereum (ETH):</Typography>
        <Typography variant="body2" sx={{ wordBreak: "break-all" }}>
          {WALLET_ADDRESSES.ethereum}
        </Typography>
        <Button
          onClick={() =>
            window.open(
              `https://chart.googleapis.com/chart?chs=200x200&cht=qr&chl=${WALLET_ADDRESSES.ethereum}`,
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

      {/* USDT (ERC-20) */}
      <Box sx={{ mt: 2 }}>
        <Typography variant="subtitle1">USDT (ERC-20):</Typography>
        <Typography variant="body2" sx={{ wordBreak: "break-all" }}>
          {WALLET_ADDRESSES.usdt}
        </Typography>
        <Button
          onClick={() =>
            window.open(
              `https://chart.googleapis.com/chart?chs=200x200&cht=qr&chl=${WALLET_ADDRESSES.usdt}`,
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

      {/* XRP */}
      <Box sx={{ mt: 2 }}>
        <Typography variant="subtitle1">XRP:</Typography>
        <Typography variant="body2" sx={{ wordBreak: "break-all" }}>
          {WALLET_ADDRESSES.xrp}
        </Typography>
        <Button
          onClick={() =>
            window.open(
              `https://chart.googleapis.com/chart?chs=200x200&cht=qr&chl=${WALLET_ADDRESSES.xrp}`,
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
  );
};

export default SupportMe;
