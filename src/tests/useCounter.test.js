// useCounter.test.js
import { renderHook, act } from "@testing-library/react";
import { useCounter } from "../components/useCounter";

describe("useCounter", () => {
  test("inicializa con valor por defecto", () => {
    const { result } = renderHook(() => useCounter());

    expect(result.current.count).toBe(0);
    expect(result.current.isEven).toBe(true);
  });

  test("inicializa con valor personalizado", () => {
    const { result } = renderHook(() => useCounter(5));

    expect(result.current.count).toBe(5);
    expect(result.current.isEven).toBe(false);
  });

  test("incrementa contador", () => {
    const { result } = renderHook(() => useCounter());

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
    expect(result.current.isEven).toBe(false);
  });

  test("decrementa contador", () => {
    const { result } = renderHook(() => useCounter(5));

    act(() => {
      result.current.decrement();
    });

    expect(result.current.count).toBe(4);
    expect(result.current.isEven).toBe(true);
  });

  test("reinicia contador", () => {
    const { result } = renderHook(() => useCounter(10));

    act(() => {
      result.current.increment();
      result.current.reset();
    });

    expect(result.current.count).toBe(10);
  });
});
