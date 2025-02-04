import { Link } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

const Dashboard = () => {
  const theme = useTheme();

  return (
    <Box sx={{ display: "flex" }}>
      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: 240,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 240,
            boxSizing: "border-box",
            backgroundColor:
              theme.palette.mode === "dark" ? "#1e1e1e" : "#ffffff",
          },
        }}
      >
        <List>
          <ListItem button component={Link} to="/crypto">
            <ListItemText primary="Crypto Prices" />
          </ListItem>
          <ListItem button component={Link} to="/trending">
            <ListItemText primary="Trending Coins" />
          </ListItem>
          <ListItem button component={Link} to="/historical">
            <ListItemText primary="Historical Data" />
          </ListItem>
          <ListItem button component={Link} to="/alerts">
            <ListItemText primary="Price Alerts" />
          </ListItem>
          <ListItem button component={Link} to="/alerts-history">
            <ListItemText primary="Alert History" />
          </ListItem>
        </List>
      </Drawer>

      {/* Main Content */}
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h3" gutterBottom>
          Welcome to Crypto Trends Visualization Tool!
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Explore the latest prices, trending coins, and historical data in the
          cryptocurrency market.
        </Typography>
      </Box>
    </Box>
  );
};

export default Dashboard;
