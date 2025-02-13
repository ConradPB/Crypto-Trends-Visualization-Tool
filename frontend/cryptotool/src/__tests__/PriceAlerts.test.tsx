import { render } from "@testing-library/react";
import { screen } from "@testing-library/dom";
import PriceAlerts from "../components/PriceAlerts";
import "@testing-library/jest-dom";

test("renders Price Alerts heading", () => {
  render(<PriceAlerts />);
  const heading = screen.getByText(/Price Alerts/i);
  expect(heading).toBeInTheDocument();
});
