import React, { useState } from "react";
import TemperatureInput from "./components/TemperatureInput";
import BoilingVerdict from "./components/BoilingVerdict";
import "./App.css";

function toCelsius(f) {
  return ((f - 32) * 5) / 9;
}

function toFahrenheit(c) {
  return (c * 9) / 5 + 32;
}

function tryConvert(value, convert) {
  const input = parseFloat(value);
  if (Number.isNaN(input)) return "";
  const output = convert(input);
  return String(Math.round(output * 100) / 100);
}

export default function App() {
  const [temperature, setTemperature] = useState("");
  const [scale, setScale] = useState("c");

  function handleCelsiusChange(temp) {
    setScale("c");
    setTemperature(temp);
  }

  function handleFahrenheitChange(temp) {
    setScale("f");
    setTemperature(temp);
  }

  const celsius =
    scale === "f" ? tryConvert(temperature, toCelsius) : temperature;
  const fahrenheit =
    scale === "c" ? tryConvert(temperature, toFahrenheit) : temperature;

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>🌡 Temperature Converter</h2>
      <TemperatureInput
        scale="c"
        temperature={celsius}
        onTemperatureChange={handleCelsiusChange}
      />
      <TemperatureInput
        scale="f"
        temperature={fahrenheit}
        onTemperatureChange={handleFahrenheitChange}
      />
      <BoilingVerdict celsius={parseFloat(celsius)} />
    </div>
  );
}
