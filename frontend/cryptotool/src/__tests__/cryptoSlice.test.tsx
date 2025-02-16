import { setupStore } from "../store";
import { fetchCryptoPrices } from "../features/cryptoSlice";
import axiosInstance from "../api/axiosInstance";

jest.mock("../api/axiosInstance");
const mockedAxios = axiosInstance as jest.Mocked<typeof axiosInstance>;

describe("fetchCryptoPrices", () => {
  it("should fetch crypto prices successfully", async () => {
    const mockData = { bitcoin: { usd: 20000 } };
    mockedAxios.get.mockResolvedValue({ data: mockData });

    const store = setupStore();
    await store.dispatch(fetchCryptoPrices("bitcoin"));

    const state = store.getState().crypto;
    expect(state.prices).toEqual(mockData);
    expect(state.loading).toBe(false);
  });

  it("should handle errors when fetching crypto prices", async () => {
    mockedAxios.get.mockRejectedValue({
      response: { data: "API Error" },
    });

    const store = setupStore();
    await store.dispatch(fetchCryptoPrices("bitcoin"));

    const state = store.getState().crypto;
    expect(state.loading).toBe(false);
    expect(state.error).toBe("API Error");
  });
});
