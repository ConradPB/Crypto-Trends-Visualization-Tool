import { fetchCryptoPrices } from "../features/cryptoSlice";
import setupStore from "../store";
import axiosInstance from "../api/axiosInstance";

jest.mock("../api/axiosInstance");

test("fetchCryptoPrices success", async () => {
  const mockData = { bitcoin: { usd: 20000 } };
  axiosInstance.get.mockResolvedValue({ data: mockData });

  const store = setupStore();
  await store.dispatch(fetchCryptoPrices("bitcoin"));

  const state = store.getState().crypto;
  expect(state.prices).toEqual(mockData);
  expect(state.loading).toBe(false);
});
