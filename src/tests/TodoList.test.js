import { render, screen, fireEvent } from "@testing-library/react";
import TodoList from "../components/TodoList";

describe("TodoList Component", () => {
  test("renderiza correctamente el estado inicial", () => {
    render(<TodoList />);
    expect(screen.getByText("Lista de Tareas")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Nueva tarea")).toBeInTheDocument();
    expect(screen.getByText("Agregar")).toBeInTheDocument();
  });

  test("agrega una nueva tarea", () => {
    render(<TodoList />);
    const input = screen.getByPlaceholderText("Nueva tarea");
    const button = screen.getByText("Agregar");

    fireEvent.change(input, { target: { value: "Aprender Testing" } });
    fireEvent.click(button);

    expect(screen.getByText("Aprender Testing")).toBeInTheDocument();
    expect(input.value).toBe("");
  });

  test("marca una tarea como completada", () => {
    render(<TodoList />);
    const input = screen.getByPlaceholderText("Nueva tarea");
    const button = screen.getByText("Agregar");

    fireEvent.change(input, { target: { value: "Tarea incompleta" } });
    fireEvent.click(button);

    const tarea = screen.getByText("Tarea incompleta");
    expect(tarea.parentElement).toHaveStyle("text-decoration: none");

    fireEvent.click(tarea);
    expect(tarea.parentElement).toHaveStyle("text-decoration: line-through");
  });

  test("elimina una tarea", () => {
    render(<TodoList />);
    const input = screen.getByPlaceholderText("Nueva tarea");
    const addButton = screen.getByText("Agregar");

    fireEvent.change(input, { target: { value: "Tarea a eliminar" } });
    fireEvent.click(addButton);

    const deleteButton = screen.getByText("Eliminar");
    fireEvent.click(deleteButton);

    expect(screen.queryByText("Tarea a eliminar")).not.toBeInTheDocument();
  });

  test("filtra tareas por estado (Activas/Completadas)", () => {
    render(<TodoList />);
    const input = screen.getByPlaceholderText("Nueva tarea");
    const addButton = screen.getByText("Agregar");

    // Agregar tarea activa
    fireEvent.change(input, { target: { value: "Tarea Activa" } });
    fireEvent.click(addButton);

    // Agregar tarea completada
    fireEvent.change(input, { target: { value: "Tarea Completada" } });
    fireEvent.click(addButton);
    fireEvent.click(screen.getByText("Tarea Completada"));

    // Filtro Activas
    fireEvent.click(screen.getByText("Activas"));
    expect(screen.getByText("Tarea Activa")).toBeInTheDocument();
    expect(screen.queryByText("Tarea Completada")).not.toBeInTheDocument();

    // Filtro Completadas
    fireEvent.click(screen.getByText("Completadas"));
    expect(screen.queryByText("Tarea Activa")).not.toBeInTheDocument();
    expect(screen.getByText("Tarea Completada")).toBeInTheDocument();

    // Filtro Todas
    fireEvent.click(screen.getByText("Todas"));
    expect(screen.getByText("Tarea Activa")).toBeInTheDocument();
    expect(screen.getByText("Tarea Completada")).toBeInTheDocument();
  });
});
