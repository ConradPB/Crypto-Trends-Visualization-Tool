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

`git clone https://github.com/ConradPB/Crypto-Trends-Visualization-Tool.git
cd Crypto-Trends-Visualization-Tool`

2. Install dependencies:

`pnpm install`

3. Set up environment variables:

Create a .env file in the root directory and add the following variables:

```javascript
PORT=5000
COINGECKO_API_KEY=your_api_key_here

4. Build the project:

`pnpm build`

5. Run the server:


`pnpm start`

6. For development, use:

`pnpm dev`

API Endpoints



### Base URL
bash
Copy code
http://localhost:5000/api/crypto
Endpoints
Get Crypto Prices

URL: /prices
Method: GET
Query Params:
ids: Comma-separated cryptocurrency IDs (default: bitcoin,ethereum)
vs_currencies: Comma-separated fiat currencies (default: usd)
Example:
bash
Copy code
GET /api/crypto/prices?ids=bitcoin,ethereum&vs_currencies=usd
Get Historical Data

URL: /historical
Method: GET
Query Params:
id: Cryptocurrency ID (default: bitcoin)
days: Number of past days to fetch data for (default: 7)
interval: Data interval (default: daily)
Example:
bash
Copy code
GET /api/crypto/historical?id=bitcoin&days=30&interval=daily
Get Trending Coins

URL: /trending
Method: GET
Example:
bash
Copy code
GET /api/crypto/trending
Get Market Data

URL: /markets
Method: GET
Query Params:
vs_currency: Fiat currency (default: usd)
order: Sorting order (default: market_cap_desc)
per_page: Number of results per page (default: 10)
page: Page number (default: 1)
sparkline: Include sparkline data (default: false)
Example:
sql
Copy code
GET /api/crypto/markets?vs_currency=usd&order=market_cap_desc&page=1
```
