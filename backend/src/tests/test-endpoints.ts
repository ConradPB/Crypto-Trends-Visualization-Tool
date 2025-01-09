import axios from 'axios';

const BASE_URL = 'http://localhost:7000/api/crypto';

const healthCheck = async () => {
    try {
        const response = await axios.get(BASE_URL.replace('/api/crypto', '/'));
        console.log('Health check passed:', response.status);
    } catch (error) {
        console.error('Health check failed. Is the server running?');
        process.exit(1); // Exit the script early if the server isn't reachable
    }
};

const testEndpoints = async () => {
    try {
        console.log('Testing /prices endpoint:');
        const pricesResponse = await axios.get(`${BASE_URL}/prices`, {
            params: {
                ids: 'bitcoin,ethereum',
                vs_currencies: 'usd'
            }
        });
        console.log('Prices response:', pricesResponse.data);
        // Add other tests here
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Test failed with Axios error:');
            console.error('Error message:', error.message);
            console.error('Response data:', error.response?.data);
            console.error('Response status:', error.response?.status);
        } else {
            console.error('Test failed with unknown error:', error);
        }
    }
};

const main = async () => {
    await healthCheck();
    await testEndpoints();
};

main(); // Invoke the async function
