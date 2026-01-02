// Counter.test.js
import { render, screen, fireEvent } from "@testing-library/react";
import Counter from "../components/Counter";

describe("Counter", () => {
  test("muestra valor inicial correctamente", () => {
    render(<Counter initialValue={5} />);

    expect(screen.getByText("Contador: 5")).toBeInTheDocument();
  });

  test("incrementa contador al hacer click en botón", () => {
    render(<Counter />);

    const button = screen.getByRole("button", { name: /incrementar/i });
    fireEvent.click(button);

    expect(screen.getByText("Contador: 1")).toBeInTheDocument();
  });

  test("decrementa contador al hacer click en botón", () => {
    render(<Counter initialValue={5} />);

    const button = screen.getByRole("button", { name: /decrementar/i });
    fireEvent.click(button);

    expect(screen.getByText("Contador: 4")).toBeInTheDocument();
  });

  test("reinicia contador a valor inicial", () => {
    render(<Counter initialValue={10} />);

    // Incrementar primero
    fireEvent.click(screen.getByRole("button", { name: /incrementar/i }));

    // Luego reiniciar
    fireEvent.click(screen.getByRole("button", { name: /reiniciar/i }));

    expect(screen.getByText("Contador: 10")).toBeInTheDocument();
  });
});
