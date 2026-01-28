import React from "react";
import ReactDOM from "react-dom/client";

// React element
const heading = <h1 id="heading">h1 heading using JSX</h1>;
const root = ReactDOM.createRoot(document.getElementById("root"));
// rendering a react element
root.render(heading);

// React components
// 1. Class based components - OLD WAY
// 2. Functional components - NEW WAY

// ✅ Functional component

function HeadingComponent() {
  return <h1 id="heading">This is a heading from functional component</h1>;
}

// const HeadingComponent = () => {
//   return <h1 id="heading">This is a heading from functional component</h1>;
// }

// const HeadingComponent = () => (
//   <h1 id="heading">This is a heading from functional component</h1>
// );

// const HeadingComponent = () => <h1 id="heading">This is a heading from functional component</h1>;

const root2 = ReactDOM.createRoot(document.getElementById("root2"));
// rendering a react component
root2.render(<HeadingComponent />);




// Component Composition : rendering a component inside another component
const TitleComponent = () => <h1>This is title component</h1>;

const BodyComponent = () => (
  <div id="container">
    <TitleComponent />
    <TitleComponent></TitleComponent>
    {TitleComponent()}
    <h1>This is body component</h1>
  </div>
);
const root3 = ReactDOM.createRoot(document.getElementById("root3"));
root3.render(<BodyComponent />);

// Summary of concepts covered:
// React is a JavaScript library for building user interfaces
// React uses a syntax called JSX (JavaScript XML) to describe the UI
// we can render an element inside another element using JSX - {} syntax 
// we can render a component inside another component using JSX - <ComponentName /> syntax
// we can also render an element inside another component using JSX - {} syntax
// we can also render a component inside another element using JSX - <ComponentName /> syntax
// we can also call a component as a function inside another component - ComponentName() syntax
// we should prefer using <ComponentName /> syntax for rendering components inside other components
// we should prefer using {} syntax for rendering elements inside components
// we should avoid using ComponentName() syntax for rendering components inside other components
// JSX is just a syntax sugar for React.createElement() function
// React.createElement() function takes three arguments - type, props, children
// React.createElement() returns a React element
// ReactDOM.render() is used to render a React element or component to the DOM
// In React 18, we use ReactDOM.createRoot() and root.render() instead of ReactDOM.render()
// React components should start with a capital letter
// React components can be functional or class based
// Functional components are preferred over class based components
// Components can be composed together to build complex UIs
// JSX allows us to write HTML like syntax in JavaScript
// JSX expressions are wrapped in curly braces {}
// JSX can contain JavaScript expressions inside {}
// JSX must have a single parent element
// we can use fragments <> </> to wrap multiple elements without adding extra nodes to the DOM
// JSX attributes are written in camelCase
// class -> className
// for -> htmlFor
// style -> {{key: 'value'}}
// Self closing tags must end with a slash <img />
// Comments in JSX are written as {/* comment */}
// JSX is not mandatory to use React, but it is highly recommended
// JSX makes the code more readable and easier to write
// JSX is transpiled to JavaScript using Babel
// JSX allows us to create React elements and components in a declarative way
// JSX improves the developer experience when working with React
// Using JSX is a common practice in React development.
// React follows a component-based architecture
// Components are reusable and can be composed together
// React promotes the use of functional programming concepts
// React has a unidirectional data flow
// React uses a virtual DOM to optimize rendering performance
// React has a strong community and ecosystem
// React is maintained by Facebook and a community of developers
// React is widely used for building web applications