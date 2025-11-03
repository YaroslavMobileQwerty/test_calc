const { useState } = React;

function formatNumber(value) {
  const [intPart, decPart] = value.split(".");
  const intFormatted = Number(intPart).toLocaleString("en-US");
  return decPart !== undefined ? `${intFormatted}.${decPart}` : intFormatted;
}

function compute(a, b, op) {
  const x = parseFloat(a);
  const y = parseFloat(b);
  if (isNaN(x) || isNaN(y)) return a;
  switch (op) {
    case "+": return String(x + y);
    case "-": return String(x - y);
    case "×": return String(x * y);
    case "÷": return y === 0 ? "Error" : String(x / y);
    default: return a;
  }
}

function percent(current, prev, op) {
  const c = parseFloat(current || "0");
  if (!isFinite(c)) return current;
  if (prev && op && (op === "+" || op === "-")) {
    const p = parseFloat(prev);
    return String((p * c) / 100);
  }
  return String(c / 100);
}

function Calculator() {
  const [display, setDisplay] = useState("0");
  const [prev, setPrev] = useState(null);
  const [op, setOp] = useState(null);
  const [overwrite, setOverwrite] = useState(true);

  const setNumber = (digit) => {
    if (display === "Error") {
      setDisplay(String(digit));
      setOverwrite(false);
      return;
    }
    if (overwrite) {
      setDisplay(String(digit));
      setOverwrite(false);
    } else if (display === "0") {
      setDisplay(String(digit));
    } else {
      setDisplay(display + String(digit));
    }
  };

  const dot = () => {
    if (display.includes(".")) return;
    setDisplay(display + ".");
    setOverwrite(false);
  };

  const clear = () => {
    if (display !== "0" && display !== "Error") {
      setDisplay("0");
      setOverwrite(true);
      return;
    }
    setDisplay("0");
    setPrev(null);
    setOp(null);
    setOverwrite(true);
  };

  const toggleSign = () => {
    if (display === "0" || display === "Error") return;
    setDisplay(display.startsWith("-") ? display.slice(1) : "-" + display);
  };

  const percentHandler = () => {
    const next = percent(display, prev, op);
    setDisplay(next);
    setOverwrite(true);
  };

  const chooseOp = (nextOp) => {
    if (display === "Error") return;
    if (prev == null) {
      setPrev(display);
      setOp(nextOp);
      setOverwrite(true);
      return;
    }
    if (overwrite) {
      setOp(nextOp);
      return;
    }
    const result = compute(prev, display, op);
    setDisplay(result);
    setPrev(result === "Error" ? null : result);
    setOp(result === "Error" ? null : nextOp);
    setOverwrite(true);
  };

  const equals = () => {
    if (op == null || prev == null || overwrite) return;
    const result = compute(prev, display, op);
    setDisplay(result);
    setPrev(null);
    setOp(null);
    setOverwrite(true);
  };

  const isAC = display === "0" || display === "Error";

  const shown = display === "Error" ? "Error" : formatNumber(display);

  return (
    <div className="calculator">
      <div className="display">{shown}</div>
      <div className="pad">
        <div className="btn btn--light" onClick={clear}>{isAC ? "AC" : "C"}</div>
        <div className="btn btn--light" onClick={toggleSign}>+/−</div>
        <div className="btn btn--light" onClick={percentHandler}>%</div>
        <div className="btn btn--accent" onClick={() => chooseOp("÷")}>÷</div>

        <div className="btn" onClick={() => setNumber(7)}>7</div>
        <div className="btn" onClick={() => setNumber(8)}>8</div>
        <div className="btn" onClick={() => setNumber(9)}>9</div>
        <div className="btn btn--accent" onClick={() => chooseOp("×")}>×</div>

        <div className="btn" onClick={() => setNumber(4)}>4</div>
        <div className="btn" onClick={() => setNumber(5)}>5</div>
        <div className="btn" onClick={() => setNumber(6)}>6</div>
        <div className="btn btn--accent" onClick={() => chooseOp("-")}>−</div>

        <div className="btn" onClick={() => setNumber(1)}>1</div>
        <div className="btn" onClick={() => setNumber(2)}>2</div>
        <div className="btn" onClick={() => setNumber(3)}>3</div>
        <div className="btn btn--accent" onClick={() => chooseOp("+")}>+</div>

        <div className="btn btn--wide" onClick={() => setNumber(0)}>0</div>
        <div className="btn" onClick={dot}>.</div>
        <div className="btn btn--accent" onClick={equals}>=</div>
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Calculator />);
