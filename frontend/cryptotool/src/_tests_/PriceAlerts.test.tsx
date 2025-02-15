import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import PriceAlerts from "../components/PriceAlerts";
import { setupStore } from "../store";

// Mock the entire alertChecker module
jest.mock("../utils/alertChecker", () => ({
  checkAlerts: jest.fn(),
  AlertCheck: jest.fn(),
}));

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
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders without crashing", async () => {
    const store = setupStore(mockInitialState);

    render(
      <Provider store={store}>
        <PriceAlerts />
      </Provider>
    );

    // Wait for component to render
    const titleElement = await screen.findByText(/Price Alerts/i);
    expect(titleElement).toBeInTheDocument();
  });
});
