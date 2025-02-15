import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import PriceAlerts from "../components/PriceAlerts";
import { setupStore } from "../store";

const mockInitialState = {
  alerts: {
    alerts: [],
    history: [],
  },
  crypto: {
    prices: {
      bitcoin: { usd: 50000 },
    },
    historicalData: {},
    trendingCoins: [],
    loading: false,
    error: null,
  },
};

describe("PriceAlerts Component", () => {
  it("renders without crashing", () => {
    const store = setupStore(mockInitialState);

    render(
      <Provider store={store}>
        <PriceAlerts />
      </Provider>
    );

    expect(screen.getByText(/Price Alerts/i)).toBeInTheDocument();
  });
});
