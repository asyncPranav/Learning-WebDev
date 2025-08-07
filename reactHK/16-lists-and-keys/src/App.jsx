import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const users = [
    {
      userImage: reactLogo,
      userName: "Pranav singh chandel",
      userRole: "Student",
    },
    {
      userImage: viteLogo,
      userName: "Ashutosh tripathi",
      userRole: "Frontend developer",
    },
    {
      userImage: reactLogo,
      userName: "Raunak mirza",
      userRole: "Fullstack developer",
    },
    {
      userImage: viteLogo,
      userName: "Nandhu ",
      userRole: "Part time developer",
    },
  ];

  return (
    <div>
      <h1>User list app</h1>
      <div className="cardContainer">
        {users.map((userObj, index) => {
          return (
            <Card
              key={index}
              userImage={userObj.userImage}
              userName={userObj.userName}
              userRole={userObj.userRole}
            />
          );
        })}
      </div>
    </div>
  );
}

function Card({ userImage, userName, userRole }) {
  return (
    <div className="userCard">
      <div className="userImage">
        <img src={userImage} alt={`${userName}'s avatar`} />
      </div>
      <div className="userInfo">
        <p>
          <b>{userName}</b>
        </p>
        <p>{userRole}</p>
      </div>
    </div>
  );
}

export default App;
