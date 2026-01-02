// Counter.js
import { useState } from "react";

function Counter({ initialValue = 0 }) {
  const [count, setCount] = useState(initialValue);

  return (
    <div>
      <h2>Contador: {count}</h2>
      <button onClick={() => setCount(count + 1)}>Incrementar</button>
      <button onClick={() => setCount(count - 1)}>Decrementar</button>
      <button onClick={() => setCount(initialValue)}>Reiniciar</button>
    </div>
  );
}

export default Counter;
