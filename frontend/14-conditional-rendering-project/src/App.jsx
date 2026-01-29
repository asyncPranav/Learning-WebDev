import { useState } from "react";
import Login from "./components/Login";
import Loader from "./components/Loader";
import Dashboard from "./components/Dashboard";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setIsLoggedIn(true);
    }, 2000);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  if (loading) return <Loader />
  
  return (
    <div>
      {
        isLoggedIn ? <Dashboard handleLogout={handleLogout} />  : <Login handleLogin={handleLogin} />
      }
    </div>
  );
};

export default App;
