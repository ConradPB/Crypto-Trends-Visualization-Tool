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
import { Menu as MenuIcon } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";

const Dashboard = () => {
  const theme = useTheme();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <Box sx={{ display: "flex" }}>
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
          },
        }}
      >
        <List>
          <ListItem
            button
            component={Link}
            to="/crypto"
            onClick={() => setIsSidebarOpen(false)}
          >
            <ListItemText primary="Crypto Prices" />
          </ListItem>
          <ListItem
            button
            component={Link}
            to="/trending"
            onClick={() => setIsSidebarOpen(false)}
          >
            <ListItemText primary="Trending Coins" />
          </ListItem>
          <ListItem
            button
            component={Link}
            to="/historical"
            onClick={() => setIsSidebarOpen(false)}
          >
            <ListItemText primary="Historical Data" />
          </ListItem>
          <ListItem
            button
            component={Link}
            to="/alerts"
            onClick={() => setIsSidebarOpen(false)}
          >
            <ListItemText primary="Price Alerts" />
          </ListItem>
          <ListItem
            button
            component={Link}
            to="/alerts-history"
            onClick={() => setIsSidebarOpen(false)}
          >
            <ListItemText primary="Alert History" />
          </ListItem>
        </List>
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

        {/* Action Buttons */}
        <Box
          sx={{
            display: "flex",
            gap: 3,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <Link to="/crypto" style={{ textDecoration: "none" }}>
            <Box
              sx={{
                px: 5,
                py: 2,
                backgroundColor: "#ff8a65",
                color: "#fff",
                borderRadius: 2,
                transition: "transform 0.2s",
                "&:hover": { transform: "scale(1.05)" },
              }}
            >
              View Crypto Prices
            </Box>
          </Link>
          <Link to="/trending" style={{ textDecoration: "none" }}>
            <Box
              sx={{
                px: 5,
                py: 2,
                backgroundColor: "#4db6ac",
                color: "#fff",
                borderRadius: 2,
                transition: "transform 0.2s",
                "&:hover": { transform: "scale(1.05)" },
              }}
            >
              View Trending Coins
            </Box>
          </Link>
          <Link to="/historical" style={{ textDecoration: "none" }}>
            <Box
              sx={{
                px: 5,
                py: 2,
                backgroundColor: "#7986cb",
                color: "#fff",
                borderRadius: 2,
                transition: "transform 0.2s",
                "&:hover": { transform: "scale(1.05)" },
              }}
            >
              View Historical Data
            </Box>
          </Link>
          <Link to="/alerts" style={{ textDecoration: "none" }}>
            <Box
              sx={{
                px: 5,
                py: 2,
                backgroundColor:
                  theme.palette.mode === "dark" ? "#9c27b0" : "#ba68c8",
                color: "#fff",
                borderRadius: 2,
                transition: "transform 0.2s",
                "&:hover": { transform: "scale(1.05)" },
              }}
            >
              Price Alerts
            </Box>
          </Link>
          <Link to="/alerts-history" style={{ textDecoration: "none" }}>
            <Box
              sx={{
                px: 5,
                py: 2,
                backgroundColor:
                  theme.palette.mode === "dark" ? "#9c27b0" : "#ba68c8",
                color: "#fff",
                borderRadius: 2,
                transition: "transform 0.2s",
                "&:hover": { transform: "scale(1.05)" },
              }}
            >
              Alert History
            </Box>
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
