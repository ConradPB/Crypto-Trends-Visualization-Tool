import axios from 'axios';

const BASE_URL = 'https://api.coingecko.com/api/v3';

export const fetchCryptoPrices = async (ids: string, vsCurrencies: string) => {
    try {
        const response = await axios.get(`${BASE_URL}/simple/price`, {
            params: { ids, vs_currencies: vsCurrencies },
        });
        return response.data;
    } catch (error) {
        throw new Error(`Failed to fetch crypto prices: ${error}`);
    }
};