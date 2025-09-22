import { useState } from "react";

function Counter({ title }) {
  const [count, setCount] = useState(0);
  return (
    <div style={{ margin: "10px 0" }}>
      <h3>{title}</h3>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
    </div>
  );
}
export default Counter;
