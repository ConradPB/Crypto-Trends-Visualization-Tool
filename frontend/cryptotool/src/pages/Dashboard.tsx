import { Link } from 'react-router-dom';
import { Button, Typography, Box, Grid } from '@mui/material';

const Dashboard = () => {
    return (
      <Box sx={{ textAlign: 'center', mt: 6 }}>
        <Typography variant="h3" gutterBottom>
          Welcome to Crypto Trends Visualization Tool!
        </Typography>
        <Typography variant="subtitle1" color="textSecondary" gutterBottom>
          Stay updated with the latest trends and historical data in the cryptocurrency market.
        </Typography>
        <Grid container justifyContent="center" spacing={3} sx={{ mt: 4 }}>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              size="large"
              sx={{ px: 4, py: 2 }}
              component={Link}
              to="/crypto"
            >
              View Crypto Prices
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              sx={{ px: 4, py: 2 }}
              component={Link}
              to="/trending"
            >
              View Trending Coins
            </Button>
          </Grid>
        </Grid>
      </Box>
    );
  };
  
export default Dashboard;

