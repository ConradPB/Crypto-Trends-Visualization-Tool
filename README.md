# Crypto-Trends-Visualization-Tool

A web-based application that provides real-time and historical cryptocurrency market data through interactive visualizations.

# Backend

## Description

The backend for Crypto Trends Visualizer provides RESTful APIs to fetch real-time cryptocurrency data, including prices, historical data, trending coins, and market information. The project is built with Node.js, Express, and TypeScript, leveraging external APIs for cryptocurrency data.

## Features

- **Get Crypto Prices:** Fetch real-time prices for specific cryptocurrencies.
- **Get Historical Data:** Retrieve historical price and market data for cryptocurrencies.

- **Get Trending Coins:** List trending cryptocurrencies based on CoinGecko's metrics.
- **Get Market Data:** Fetch market data for cryptocurrencies, including ranking, market cap, and more.
- **Rate Limiting:** Prevent API abuse with configurable rate limits.
- **Caching:** Optimize performance with in-memory caching for frequently accessed data.
- **Error Logging:** Centralized error handling and logging for easier debugging.

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express
- **Language:** TypeScript
- **Middleware:**
  - Rate Limiting: express-rate-limit
  - Caching: node-cache
- **HTTP Client:** Axios
- **Validation:** Joi
- **Environment Variables:** dotenv

## Installation

1. Clone the repository:

```javascript
git clone https://github.com/ConradPB/Crypto-Trends-Visualization-Tool.git

cd Crypto-Trends-Visualization-Tool
```

2. Install dependencies:

`pnpm install`

3. Set up environment variables:

Create a .env file in the root directory and add the following variables:

```javascript
PORT = 5000;
COINGECKO_API_KEY = your_api_key_here;
```

4. Build the project:

`pnpm build`

5. Run the server:

`pnpm start`

6. For development, use:

`pnpm dev`

## API Endpoints

### Base URL

`http://localhost:5000/api/crypto`

### Endpoints

1. Get Crypto Prices

- **URL:** /prices
- **Method:** GET
- **Query Params:**
  - ids: Comma-separated cryptocurrency IDs (default: bitcoin,ethereum)
  - vs_currencies: Comma-separated fiat currencies (default: usd)

Example:

`GET /api/crypto/prices?ids=bitcoin,ethereum&vs_currencies=usd`

2. Get Historical Data

- **URL:** /historical
- **Method:** GET
- **Query Params**
  - id: Cryptocurrency ID (default: bitcoin)
  - days: Number of past days to fetch data for (default: 7)
  - interval: Data interval (default: daily)

Example:

`GET /api/crypto/historical?id=bitcoin&days=30&interval=daily`

3. Get Trending Coins

- **URL:** /trending
- **Method:** GET

Example:

`GET /api/crypto/trending`

4. Get Market Data

- **URL:** /markets
- **Method:** GET
- **Query Params:**
  - vs_currency: Fiat currency (default: usd)
  - order: Sorting order (default: market_cap_desc)
  - per_page: Number of results per page (default: 10)
  - page: Page number (default: 1)
  - sparkline: Include sparkline data (default: false)

Example:

`GET /api/crypto/markets?vs_currency=usd&order=market_cap_desc&page=1`

## Middleware

- **Validation:** Ensures all incoming requests have the correct structure and parameters.
- **Rate Limiting:** Prevents excessive API requests.
- **Caching:** Speeds up frequent requests by storing results in memory.

## Error Handling

Centralized error handling ensures consistent error responses:

```javascript
{
  "error": "Internal server error",
  "message": "Error details here"
}
```

## Logging

Logs all incoming requests and errors for easier debugging. The logs include:

- Request method and URL.
- Error stack traces when applicable.

## Testing

To run endpoint tests, execute:

`pnpm test:endpoints`

## Deployment

Ensure the following for deployment:

- Proper environment variables are set.
- Use a process manager like PM2 or Docker.
- Enable HTTPS in production.

## License

This project is licensed under the ISC License.
