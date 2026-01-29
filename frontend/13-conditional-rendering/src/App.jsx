import React from "react";
import "./App.css";

// Using If-Else Statement
const CheckLogin = () => {
  const isLoggedIn = true;
  let message;
  if (isLoggedIn) {
    message = <h1>Welcome back! - using if-else</h1>;
  } else {
    message = <h1>Please sign up - using if-else.</h1>;
  }
  return message;
};

// Using Ternary Operator
const CheckLoginShort = () => {
  const isLoggedIn = false;
  return isLoggedIn ? <h1>Welcome back! - using ternary operator</h1> : <h1>Please sign up. - using ternary operator.</h1>;
};

// If we wanna render something if true only and nothing if false - then we can use && operator
const CheckLoginAndOperator = () => {
  const isLoggedIn = true;
  return isLoggedIn && <h1>Welcome back! - using && operator</h1>;
}

// Using css to hide/show elements i.e conditional class names
const CheckLoginWithCSS = () => {
  const isLoggedIn = true;
  return (
    <div>
      <h1 className={isLoggedIn ? "visible" : "hidden"}>Welcome back! - using CSS </h1>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis voluptatem reprehenderit deleniti? Maiores dolor praesentium ex vero inventore illo ea!</p>
    </div>
  )
};

// Conditional rendering the whole component
const isAdmin = true;
const AdminPanel = () => {
  return <h2>Admin Panel: Manage your application here.</h2>;
}
const UserPanel = () => {
  return <h2>User Panel: View your dashboard here.</h2>;
}

const App = () => {
  return (
    <div>
      <CheckLogin />
      <CheckLoginShort />
      <CheckLoginAndOperator />
      <CheckLoginWithCSS />
      {isAdmin && <AdminPanel />}
      {isAdmin ? <AdminPanel /> : <UserPanel />}
    </div>
  );
};

export default App;
