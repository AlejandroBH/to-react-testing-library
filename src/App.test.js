import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

test("renders Vite + React heading", () => {
  render(<App />);
  const heading = screen.getByText(/Vite \+ React/i);
  expect(heading).toBeInTheDocument();
});

test("increments count on button click", async () => {
  const user = userEvent.setup();
  render(<App />);
  const button = screen.getByRole("button", { name: /count is 0/i });
  await user.click(button);
  const updatedButton = screen.getByRole("button", { name: /count is 1/i });
  expect(updatedButton).toBeInTheDocument();
});
