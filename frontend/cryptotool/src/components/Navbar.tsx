// src/components/Navbar.tsx
import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, IconButton } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";

const Navbar = () => {
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        {/* Home Button */}
        <IconButton
          component={Link}
          to="/"
          color="inherit"
          aria-label="Home"
          sx={{ mr: 2 }}
        >
          <HomeIcon />
        </IconButton>

        {/* App Title */}
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            flexGrow: 1,
            textDecoration: "none",
            color: "inherit",
          }}
        >
          Crypto Trends Tool
        </Typography>

        {/* Optional Links */}
        <Button color="inherit" component={Link} to="/crypto">
          Crypto Prices
        </Button>
        <Button color="inherit" component={Link} to="/trending">
          Trending Coins
        </Button>
        <Button color="inherit" component={Link} to="/historical">
          Historical Data
        </Button>
        <Button color="inherit" component={Link} to="/alerts">
          Price Alerts
        </Button>
        <Button color="inherit" component={Link} to="/alerts-history">
          Alert History
        </Button>
        <Button color="inherit" component={Link} to="/support-me">
          Support Me
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
