import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  useTheme,
  alpha,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";

const Navbar = () => {
  const theme = useTheme();
  const location = useLocation();

  // Function to check if the current path matches the link
  const isActive = (path: string) => location.pathname === path;

  return (
    <AppBar
      position="static"
      elevation={0} // Removes shadow
      sx={{
        backgroundColor: alpha(theme.palette.background.paper, 0.95),
        borderBottom: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* Left section with home button and title */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton
            component={Link}
            to="/"
            sx={{
              mr: 2,
              color:
                theme.palette.mode === "light"
                  ? "primary.main"
                  : "primary.light",
            }}
            aria-label="Home"
          >
            <HomeIcon />
          </IconButton>

          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              textDecoration: "none",
              color:
                theme.palette.mode === "light"
                  ? "text.primary"
                  : "text.primary",
              fontWeight: 500,
              letterSpacing: "0.5px",
            }}
          >
            Crypto Trends
          </Typography>
        </Box>

        {/* Navigation links */}
        <Box sx={{ display: "flex", gap: 1 }}>
          {[
            { path: "/crypto", label: "Prices" },
            { path: "/trending", label: "Trending" },
            { path: "/historical", label: "Historical" },
            { path: "/alerts", label: "Alerts" },
            { path: "/alerts-history", label: "History" },
            { path: "/support-me", label: "Support" },
          ].map(({ path, label }) => (
            <Button
              key={path}
              component={Link}
              to={path}
              sx={{
                minWidth: "auto",
                px: 2,
                py: 1,
                color: isActive(path) ? "primary.main" : "text.secondary",
                position: "relative",
                "&:after": {
                  content: '""',
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  width: "100%",
                  height: 2,
                  backgroundColor: "primary.main",
                  opacity: isActive(path) ? 1 : 0,
                  transition: "opacity 0.2s",
                },
                "&:hover": {
                  backgroundColor: alpha(theme.palette.primary.main, 0.08),
                  "&:after": {
                    opacity: 0.5,
                  },
                },
              }}
            >
              {label}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
