import React from "react";
import useCounterStore from "../stores/counterStore";

const Counter = () => {
  const { number, increment, decrement, value, setValue, reset } =
    useCounterStore();
  const submit = (e) => {
    e.preventDefault();
    setValue(Number(e.target[0].value));
  };

  return (
    <div className="counter-box">
      <h1 className="gradient-text" style={{ marginBottom: "30px" }}>
        COUNTER
      </h1>
      <div className="count">
        <button onClick={decrement}>-{value}</button>
        <h1>{number}</h1>
        <button onClick={increment}>+{value}</button>
      </div>
      <div className="setting">
        <form onSubmit={submit}>
          <input type="number" id="input" min="1" placeholder={value} />
          <input className="btn" type="submit" value={"단위 변경하기"} />
        </form>
        <img
          src="https://endlessicons.com/wp-content/uploads/2012/11/reset-icon.png"
          alt="reset"
          onClick={reset}
        />
      </div>
    </div>
  );
};

export default Counter;
