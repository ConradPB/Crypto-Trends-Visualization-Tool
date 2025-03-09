# Crypto-Trends-Visualization-Tool

Welcome to the **Crypto Trends Visualization Tool**, a React-based application designed to provide real-time cryptocurrency data, price alerts, historical trends, and more.Through interactive visualizations,this tool empowers users to stay informed about the dynamic cryptocurrency market with an intuitive and responsive interface.

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

## Live Backend link

 [Backend API](https://crypto-tool-aaszkvsck-conrad-p-bs-projects.vercel.app/)

 
# 📌 Crypto Trends Visualization Tool - Frontend

**Author**: Conrad P Mbaziira B
**Email** : cpbmbaz57@gmail.com
**GitHub** : https://github.com/ConradPB/Crypto-Trends-Visualization-Tool
**Tech Stack**: React, Redux, Vite, TypeScript, MUI, Recharts, Axios  
**Backend**: Node.js, Express (API Integration)

---

## 🚀 Project Overview

The **Crypto Trends Visualization Tool** provides real-time and historical cryptocurrency price data, trends, and alerts. Users can track price changes, view trending coins, analyze historical data, and set up custom price alerts.

---

## 🎯 Features

✅ **Real-time Cryptocurrency Prices** - Fetches live prices from CoinGecko API.  
✅ **Trending Coins** - Displays top trending cryptocurrencies.  
✅ **Historical Data** - Interactive charts for historical price trends.  
✅ **Price Alerts** - Set custom alerts for price thresholds.  
✅ **Dark/Light Mode** - User-friendly theme toggle.  
✅ **Redux State Management** - Efficient app state handling.

---

## 🏗️ Tech Stack

### **Frontend:**

- **React 18 + TypeScript** - Modern, type-safe development.
- **Redux Toolkit** - Efficient global state management.
- **MUI (Material UI)** - Stylish and responsive UI components.
- **Recharts** - Interactive cryptocurrency price charts.
- **Axios** - API requests to fetch crypto data.
- **Vite** - Fast and optimized development build system.

### **Backend API:**

- **Node.js + Express.js** - Handles API requests.
- **CoinGecko API** - Fetches real-time cryptocurrency data.

---

## ⚡ Installation & Setup

### **1️⃣ Clone the Repository**

```sh
git clone https://github.com/yourusername/crypto-trends-visualization.git
cd crypto-trends-visualization/frontend
```

### **2️⃣ Install Dependencies**

```sh
yarn install
```

### **3️⃣ Start the Development Server**

```sh
yarn dev
```

This runs the app on `http://localhost:5173/`.

### **4️⃣ Run Tests**

```sh
yarn test
```

---

## 🛠 Project Structure

```
frontend/
│── src/
│   ├── api/              # Axios instance for API requests
│   ├── components/       # UI Components (CryptoPrices, HistoricalData, PriceAlerts, etc.)
│   ├── features/         # Redux slices (cryptoSlice.ts, alertsSlice.ts)
│   ├── pages/            # Route pages (Dashboard, TrendingCoins, NotFound)
│   ├── routes/           # React Router configuration
│   ├── store/            # Redux store setup
│   ├── theme/            # Dark and Light theme settings
│   ├── utils/            # Utility functions (alertChecker, soundNotification)
│   ├── App.tsx           # Main application component
│   ├── main.tsx          # React entry point
│── public/               # Static assets
│── package.json          # Project dependencies and scripts
│── vite.config.ts        # Vite configuration
│── tsconfig.json         # TypeScript configuration
│── README.md             # Project documentation
```

---

## 🔧 Environment Variables

Before running the project, configure your `.env` file in the **backend** with:

```sh
COINGECKO_API_KEY=your_api_key
PORT=7000
```

---

## 💡 How to Use

1️⃣ **View Live Prices** - Navigate to the "Crypto Prices" page.  
2️⃣ **Check Trending Coins** - Visit the "Trending Coins" section.  
3️⃣ **Analyze Historical Data** - Select a coin and time range in the "Historical Data" section.  
4️⃣ **Set Price Alerts** - Define conditions (`above` or `below`) for price notifications.  
5️⃣ **Enable Sound Notifications** - Toggle sound alerts for triggered alerts.

---

## 🤝 Contributing

Want to improve this project? Follow these steps:

1. **Fork** the repo.
2. Create a new **feature branch** (`git checkout -b feature-name`).
3. **Commit** changes (`git commit -m "Added new feature"`).
4. **Push** to your fork (`git push origin feature-name`).
5. Open a **Pull Request**.

---

Check out the live Crypto Trends Visualization Tool: [Frontend](https://crypto-trends-kohl.vercel.app/) 

---

## 📜 License

This project is **open-source** under the **MIT License**.
