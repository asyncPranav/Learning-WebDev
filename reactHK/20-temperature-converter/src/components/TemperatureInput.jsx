import React from "react";

export default function TemperatureInput({
  scale,
  temperature,
  onTemperatureChange,
}) {
  const label = scale === "c" ? "Celsius" : "Fahrenheit";

  return (
    <div>
      <label>{label}: </label>
      <input
        value={temperature}
        onChange={(e) => onTemperatureChange(e.target.value)}
        placeholder={`Enter ${label}`}
      />
    </div>
  );
}
