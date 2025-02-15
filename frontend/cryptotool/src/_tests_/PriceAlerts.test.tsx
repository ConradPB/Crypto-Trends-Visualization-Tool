import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import PriceAlerts from "../components/PriceAlerts";
import { setupStore } from "../store";

describe("PriceAlerts Component", () => {
  it("renders without crashing", () => {
    const store = setupStore({
      alerts: {
        alerts: [],
        history: [],
      },
      crypto: {
        prices: {},
        historicalData: {},
        trendingCoins: [],
        loading: false,
        error: null,
      },
    });

    render(
      <Provider store={store}>
        <PriceAlerts />
      </Provider>
    );

    expect(screen.getByText(/Price Alerts/i)).toBeInTheDocument();
  });
});
