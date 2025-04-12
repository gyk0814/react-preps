import React from "react";
import useCounterStore from "../stores/counterStore";

const Counter = () => {
  const { number, increment, decrement, value, setValue } = useCounterStore();

  return (
    <div className="counter-box">
      <h1 style={{ marginBottom: "50px" }}>Counter</h1>
      <div className="count">
        <button onClick={decrement}>-{value}</button>
        <h1>{number}</h1>
        <button onClick={increment}>+{value}</button>
      </div>
      <div className="unit">
        <input type="number" id="value" />
        <button>단위 변경하기</button>
      </div>
    </div>
  );
};

export default Counter;
