import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import PriceAlerts from "../components/PriceAlerts";
import { setupStore } from "../store";

// Mock only the essential dependencies
jest.mock("lucide-react", () => ({
  Bell: () => <div data-testid="bell-icon" />,
  BellOff: () => <div data-testid="bell-off-icon" />,
  Trash2: () => <div data-testid="trash-icon" />,
  Filter: () => <div data-testid="filter-icon" />,
  ArrowUpDown: () => <div data-testid="arrow-updown-icon" />,
}));

jest.mock("../utils/alertChecker", () => ({
  checkAlerts: jest.fn(),
  AlertCheck: jest.fn(),
}));

jest.mock("../utils/soundNotification", () => ({
  SoundNotification: jest.fn().mockImplementation(() => ({
    play: jest.fn(),
  })),
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

  it("renders without crashing", () => {
    const store = setupStore(mockInitialState);

    render(
      <Provider store={store}>
        <PriceAlerts />
      </Provider>
    );

    // Test for the presence of key elements
    expect(screen.getByText(/Price Alerts/i)).toBeInTheDocument();
  });
});
