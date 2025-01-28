import { Link } from 'react-router-dom';
import { Button, Typography, Box, Stack } from '@mui/material';
import { useTheme } from '@mui/material/styles';


const Dashboard = () => {
  const theme = useTheme(); 

  return (
    <Box
      sx={{
        textAlign: 'center',
        mt: 6,
        px: 2,
        py: 4,
        background: 'linear-gradient(to right, #4facfe, #00f2fe)',
        color: '#fff',
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
        Welcome to Crypto Trends Visualization Tool!
      </Typography>
      <Typography
        variant="subtitle1"
        gutterBottom
        sx={{
          color: 'rgba(255, 255, 255, 0.9)',
          fontStyle: 'italic',
          mb: 4,
        }}
      >
        Explore the latest prices, trending coins, and historical data in the cryptocurrency market.
      </Typography>

      <Stack direction="row" justifyContent="center" spacing={3} sx={{ mt: 4 }}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          sx={{
            px: 5,
            py: 2,
            backgroundColor: '#ff8a65',
            '&:hover': { backgroundColor: '#ff7043' },
          }}
          component={Link}
          to="/crypto"
        >
          View Crypto Prices
        </Button>

        <Button
          variant="contained"
          color="secondary"
          size="large"
          sx={{
            px: 5,
            py: 2,
            backgroundColor: '#4db6ac',
            '&:hover': { backgroundColor: '#26a69a' },
          }}
          component={Link}
          to="/trending"
        >
          View Trending Coins
        </Button>

        <Button
          variant="contained"
          size="large"
          sx={{
            px: 5,
            py: 2,
            backgroundColor: '#7986cb',
            '&:hover': { backgroundColor: '#5c6bc0' },
          }}
          component={Link}
          to="/historical"
        >
          View Historical Data
        </Button>
        <Button
        variant="contained"
        size="large"
        sx={{
          px: 5,
          py: 2,
          backgroundColor: theme.palette.mode === 'dark' ? '#9c27b0' : '#ba68c8',
          '&:hover': { 
            backgroundColor: theme.palette.mode === 'dark' ? '#7b1fa2' : '#ab47bc' 
          },
        }}
        component={Link}
        to="/alerts"
        >
          Price Alerts
          </Button>
          <Button
          variant="contained"
          size="large"
          sx={{
            px: 5,
            py: 2,
            backgroundColor: theme.palette.mode === 'dark' ? '#9c27b0' : '#ba68c8',
            '&:hover': { 
              backgroundColor: theme.palette.mode === 'dark' ? '#7b1fa2' : '#ab47bc' 
            },
          }}
          component={Link}
          to="/alerts-history" // Add this button
        >
          Alert History
        </Button>
      </Stack>
    </Box>
  );
};
n
export default Dashboard;


