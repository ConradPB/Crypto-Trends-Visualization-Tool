import { Link } from "react-router-dom";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Drawer,
  IconButton,
} from "@mui/material";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@mui/material/styles";

const Dashboard = () => {
  const theme = useTheme();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Define button colors based on the theme
  const buttonColors = {
    crypto: "#ff8a65",
    trending: "#4db6ac",
    historical: "#7986cb",
    alerts: theme.palette.mode === "dark" ? "#9c27b0" : "#ba68c8",
    history: theme.palette.mode === "dark" ? "#9c27b0" : "#ba68c8",
    support: "#fbc02d",
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <Drawer
        anchor="left"
        open={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        sx={{
          "& .MuiDrawer-paper": {
            width: 240,
            background: theme.palette.mode === "dark" ? "#1e1e1e" : "#ffffff",
            color: theme.palette.text.primary,
            borderRight: `1px solid ${theme.palette.divider}`,
          },
        }}
      >
        <List>
          {[
            {
              text: "Crypto Prices",
              path: "/crypto",
              color: buttonColors.crypto,
            },
            {
              text: "Trending Coins",
              path: "/trending",
              color: buttonColors.trending,
            },
            {
              text: "Historical Data",
              path: "/historical",
              color: buttonColors.historical,
            },
            {
              text: "Price Alerts",
              path: "/alerts",
              color: buttonColors.alerts,
            },
            {
              text: "Alert History",
              path: "/alerts-history",
              color: buttonColors.history,
            },
            {
              text: "Support Me",
              path: "/support-me",
              color: buttonColors.support,
            },
          ].map((item) => (
            <ListItem
              key={item.text}
              component={Link}
              to={item.path}
              onClick={() => setIsSidebarOpen(false)}
              sx={{
                textDecoration: "none",
                color: "#fff",
                backgroundColor: item.color,
                borderRadius: 2,
                margin: "0.5rem 1rem",
                transition: "transform 0.2s",
                "&:hover": {
                  transform: "scale(1.05)",
                  backgroundColor: item.color,
                },
              }}
            >
              <ListItemText primary={item.text} sx={{ textAlign: "center" }} />
            </ListItem>
          ))}
        </List>

        {/* Footer in Sidebar */}
        <Box
          sx={{
            mt: "auto",
            p: 2,
            textAlign: "center",
            borderTop: `1px solid ${theme.palette.divider}`,
          }}
        >
          <Typography variant="body2" color="textSecondary">
            Powered by CoinGecko API
          </Typography>
        </Box>
      </Drawer>

      {/* Main Content */}
      <Box sx={{ flexGrow: 1, p: 3 }}>
        {/* Header with Sidebar Toggle */}
        <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => setIsSidebarOpen(true)}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            Welcome to Crypto Trends Visualization Tool!
          </Typography>
        </Box>

        {/* Subtitle */}
        <Typography
          variant="subtitle1"
          gutterBottom
          sx={{ fontStyle: "italic", mb: 4 }}
        >
          Explore the latest prices, trending coins, historical data, and set up
          price alerts in the cryptocurrency market.
        </Typography>
      </Box>
    </Box>
  );
};

export default Dashboard;
