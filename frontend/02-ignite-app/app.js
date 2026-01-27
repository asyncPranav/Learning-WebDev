import React from "react";    // error : Browser scripts cannot have imports or exports.
import ReactDOM from "react-dom/client";  // error : Browser scripts cannot have imports or exports.

const root = ReactDOM.createRoot(document.getElementById("root"));
const heading = React.createElement(
  "h1",
  { id: "heading" },
  "Hello from React + Parcel!"
);

root.render(heading);

