// src/__tests__/cryptoSlice.test.tsx
import { setupStore } from "../store";
import { fetchCryptoPrices } from "../features/cryptoSlice";
import axiosInstance from "../api/axiosInstance";

jest.mock("../api/axiosInstance");

describe("fetchCryptoPrices", () => {
  it("should fetch crypto prices successfully", async () => {
    const mockData = { bitcoin: { usd: 20000 } };
    (axiosInstance.get as jest.Mock).mockResolvedValue({ data: mockData });

    // Create a mock store using setupStore
    const store = setupStore();

    // Dispatch the async thunk
    await store.dispatch(fetchCryptoPrices("bitcoin"));

    // Access the state after the action is dispatched
    const state = store.getState().crypto;
    expect(state.prices).toEqual(mockData);
    expect(state.loading).toBe(false);
  });

  it("should handle errors when fetching crypto prices", async () => {
    (axiosInstance.get as jest.Mock).mockRejectedValue({
      response: { data: "API Error" },
    });

    // Create a mock store using setupStore
    const store = setupStore();

    // Dispatch the async thunk
    await store.dispatch(fetchCryptoPrices("bitcoin"));

    const state = store.getState().crypto;
    expect(state.loading).toBe(false);
    expect(state.error).toBe("API Error");
  });
});
