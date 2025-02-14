import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import PriceAlerts from "../components/PriceAlerts";
import { setupStore } from "../store";

describe("PriceAlerts Component", () => {
  it("renders without crashing", () => {
    // Create a mock store with initial state
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

    // Render the component with the mock store
    render(
      <Provider store={store}>
        <PriceAlerts />
      </Provider>
    );

    // Check if the component renders correctly
    expect(screen.getByText(/Price Alerts/i)).toBeInTheDocument();
  });
});
