// LoginForm.test.js
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoginForm from "../components/LoginForm";

describe("LoginForm", () => {
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    mockOnSubmit.mockClear();
  });

  test("muestra errores de validación para campos vacíos", async () => {
    const user = userEvent.setup();
    render(<LoginForm onSubmit={mockOnSubmit} />);

    await user.click(screen.getByRole("button", { name: /iniciar sesión/i }));
    expect(screen.getByText("Email requerido")).toBeInTheDocument();
    expect(screen.getByText("Contraseña requerida")).toBeInTheDocument();
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  test("llama onSubmit con datos válidos", async () => {
    const user = userEvent.setup();
    render(<LoginForm onSubmit={mockOnSubmit} />);

    await user.type(screen.getByLabelText(/email/i), "usuario@ejemplo.com");
    await user.type(screen.getByLabelText(/contraseña/i), "password123");
    await user.click(screen.getByRole("button", { name: /iniciar sesión/i }));

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        email: "usuario@ejemplo.com",
        password: "password123",
      });
    });

    expect(screen.queryByText("Email requerido")).not.toBeInTheDocument();
    expect(screen.queryByText("Contraseña requerida")).not.toBeInTheDocument();
  });

  test("limpia errores al corregir campos", async () => {
    const user = userEvent.setup();
    render(<LoginForm onSubmit={mockOnSubmit} />);

    // Enviar formulario vacío
    await user.click(screen.getByRole("button", { name: /iniciar sesión/i }));

    // Verificar errores
    expect(screen.getByText("Email requerido")).toBeInTheDocument();

    // Corregir campo
    await user.type(screen.getByLabelText(/email/i), "usuario@ejemplo.com");

    // Enviar nuevamente
    await user.click(screen.getByRole("button", { name: /iniciar sesión/i }));

    // Error debería desaparecer (solo falta password)
    expect(screen.queryByText("Email requerido")).not.toBeInTheDocument();
    expect(screen.getByText("Contraseña requerida")).toBeInTheDocument();
  });
});
