import { createContext, useState } from "react";
import ChildA from "./components/ChildA";
import "./App.css";

// step-1 : create context
const UserContext = createContext(null);

// step-2 : wrap all those child who wanna consume data in to context provider
// step-3 : pass value

function App() {
  const [user, setUser] = useState({ id: 1, name: "Pranav" });
  return (
    <div>
      <h1>useContext Hook</h1>
      <hr />
      <UserContext.Provider value={user}>
        <ChildA />
      </UserContext.Provider>
    </div>
  );
}

export default App;
export { UserContext };
