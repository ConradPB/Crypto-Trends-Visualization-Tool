jest.mock("@mui/material", () => require("../__mocks__/mui-mocks.ts"));
jest.mock("lucide-react");
jest.mock("../utils/alertChecker");
jest.mock("../utils/soundNotification");

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

    expect(screen.getByText(/Price Alerts/i)).toBeInTheDocument();
  });
});
