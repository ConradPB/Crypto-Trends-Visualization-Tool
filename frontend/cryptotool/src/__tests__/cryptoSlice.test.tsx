import { setupStore } from "../store";
import { fetchCryptoPrices } from "../features/cryptoSlice";
import axiosInstance from "../api/axiosInstance";

// Mock axios instance
jest.mock("../api/axiosInstance");

describe("fetchCryptoPrices Thunk", () => {
  it("should fetch crypto prices successfully and update the state", async () => {
    const mockData = { bitcoin: { usd: 20000 } };

    // Mock successful API response
    (axiosInstance.get as jest.Mock).mockResolvedValueOnce({ data: mockData });

    // Create store
    const store = setupStore();

    // Dispatch the thunk
    await store.dispatch(fetchCryptoPrices("bitcoin"));

    // Get the updated state
    const state = store.getState().crypto;

    // Assertions
    expect(state.prices).toEqual(mockData);
    expect(state.loading).toBe(false);
    expect(state.error).toBeNull(); // Ensure no error
  });

  it("should handle API errors correctly", async () => {
    const errorMessage = "API Error";

    // Mock API rejection
    (axiosInstance.get as jest.Mock).mockRejectedValueOnce({
      response: { data: errorMessage },
    });

    // Create store
    const store = setupStore();

    // Dispatch the thunk
    await store.dispatch(fetchCryptoPrices("bitcoin"));

    // Get the updated state
    const state = store.getState().crypto;

    // Assertions
    expect(state.loading).toBe(false);
    expect(state.error).toEqual(errorMessage); // Ensure error is set properly
  });
});
