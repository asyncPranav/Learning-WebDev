import { useNavigate } from "react-router-dom";

const Home = () => {
  // Function to navigate to About page
  // This will cause a full page reload
  /*   
    const goToAbout = () => {
      window.location.href = '/about';
    }
  */

  // Using useNavigate hook from react-router-dom for navigation without full page reloads
  // This allows for smoother transitions and better user experience
  const navigate = useNavigate();
  const goToAbout = () => {
    navigate("/about");
  };

  return (
    <div>
      <h1>Welcome to the Home Page</h1>

      {/* Button to navigate to About page using useNavigate hook */}
      <button onClick={goToAbout}>Go to About</button>
    </div>
  );
};

export default Home;
