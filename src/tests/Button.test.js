// Button.test.js
import { render } from "@testing-library/react";
import Button from "../components/Button";

describe("Button", () => {
  test("coincide con snapshot", () => {
    const { container } = render(
      <Button variant="primary" size="large">
        Guardar Cambios
      </Button>
    );

    // Crea __snapshots__/Button.test.js.snap
    expect(container.firstChild).toMatchSnapshot();
  });
});
