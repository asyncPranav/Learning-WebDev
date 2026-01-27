import React from "react";
import ReactDOM from "react-dom/client";

// React element ( React.createElement() ) => Object
const heading = React.createElement(
  "h1",
  { id: "heading" },
  "This is h1 heading",
);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(heading);

// JSX : It is not part of react, jsx is different from react. We can write react without jsx, but jsx made dev life easy that's why we use jsx
// JSX is not html in javascript, JSX is different, is is html or xml like syntax
// JSX is neither javascript nor html, js engines can't understand jsx
// JSX is transpiled by parcel(BABEL) before it reaches js engine 
const jsxHeading = <h1 id="heading">h1 heading using JSX</h1>;
root.render(jsxHeading);

// We have create same element using react and jsx
// JSX is different from react
// Both output are same : because behind the scene jsx use react to create react element
// JSX => Babel transpile it to React.createElement => JS object => HTML Element => UI 
console.log(heading);
console.log(jsxHeading);

