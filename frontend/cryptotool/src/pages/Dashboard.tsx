import { Link } from 'react-router-dom';
import { Button, Typography, Box } from '@mui/material';

const Dashboard = () => {
    return (
        <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Typography variant="h4" gutterBottom>
                Welcome to Crypto Trends Visualization Tool!
            </Typography>
            <Box>
                <Button
                    variant="contained"
                    color="primary"
                    sx={{ m: 1 }}
                    component={Link}
                    to="/crypto"
                >
                    View Crypto Prices
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    sx={{ m: 1 }}
                    component={Link}
                    to="/historical"
                >
                    View Historical Data
                </Button>
            </Box>
        </Box>
    );
};

export default Dashboard;

