import axios from 'axios';

const BASE_URL = 'http://localhost:7000/api/crypto';

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

        console.log('\nTesting /historical endpoint:');
        const historicalResponse = await axios.get(`${BASE_URL}/historical`, {
            params: {
                id: 'bitcoin',
                days: '7',
                interval: 'daily'
            }
        });
        console.log('Historical response:', historicalResponse.data);

        console.log('\nTesting /trending endpoint:');
        const trendingResponse = await axios.get(`${BASE_URL}/trending`);
        console.log('Trending response:', trendingResponse.data);

        console.log('\nTesting /markets endpoint:');
        const marketsResponse = await axios.get(`${BASE_URL}/markets`, {
            params: {
                page: 1,
                per_page: 10,
                sparkline: true
            }
        });
        console.log('Markets response:', marketsResponse.data);

        // Test validation errors
        console.log('\nTesting validation errors:');
        try {
            await axios.get(`${BASE_URL}/prices`, {
                params: {
                    ids: 'INVALID_UPPERCASE',
                    vs_currencies: '123'
                }
            });
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                console.log('Expected validation error:', error.response.data);
            } else {
                console.log('Unexpected error:', error);
            }
        }

    }  catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Test failed with Axios error:');
            console.error('Error message:', error.message);
            console.error('Response data:', error.response?.data);
            console.error('Response status:', error.response?.status);
            console.error('Response headers:', error.response?.headers);
        } else {
            console.error('Test failed with unknown error:', error);
        }
    }

};

// Run tests
testEndpoints();