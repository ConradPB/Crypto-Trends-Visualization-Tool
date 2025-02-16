import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import PriceAlerts from "../components/PriceAlerts";
import { setupStore } from "../store";

describe("PriceAlerts Component", () => {
  const mockInitialState = {
    alerts: {
      alerts: [],
      history: [],
      loading: false,
      error: null
    },
    crypto: {
      prices: {},
      historicalData: {},
      trendingCoins: [],
      loading: false,
      error: null
    }
  };

  it("renders without crashing", () => {
    const store = setupStore(mockInitialState);

    render(
      <Provider store={store}>
        <PriceAlerts />
      </Provider>
    );

    expect(screen.getByText(/Price Alerts/i)).toBeInTheDocument();
  });

  it("handles empty alerts array", () => {
    const store = setupStore(mockInitialState);

    render(
      <Provider store={store}>
        <PriceAlerts />
      </Provider>
    );

    expect(screen.getByText(/No active alerts/i)).toBeInTheDocument();
  });
});