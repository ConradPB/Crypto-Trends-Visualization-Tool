import { setupStore } from "../store";
import { fetchCryptoPrices } from "../features/cryptoSlice";
import axiosInstance from "../api/axiosInstance";

jest.mock("../api/axiosInstance");

describe("fetchCryptoPrices", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch crypto prices successfully", async () => {
    const mockData = { bitcoin: { usd: 20000 } };
    (axiosInstance.get as jest.Mock).mockResolvedValue({ data: mockData });

    const store = setupStore();
    await store.dispatch(fetchCryptoPrices("bitcoin"));

    const state = store.getState().crypto;
    expect(state.prices).toEqual(mockData);
    expect(state.loading).toBe(false);
    expect(state.error).toBe(null);
  });

  it("should handle errors when fetching crypto prices", async () => {
    const mockError = {
      response: { data: "API Error" },
    };
    (axiosInstance.get as jest.Mock).mockRejectedValue(mockError);

    const store = setupStore();
    await store.dispatch(fetchCryptoPrices("bitcoin"));

    const state = store.getState().crypto;
    expect(state.loading).toBe(false);
    expect(state.error).toBe("API Error");
  });
});
