import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [visible, setVisible] = useState(false);

  function toggleVisible(){
    setVisible((v) => !v);
  }

  return (
    <div className="appContainer">
      {visible ? (
        <ProfileCard
          userImage={reactLogo}
          userName="Pranav singh chandel"
          userBio="Self taught programmer and developer"
        />
      ) : null}
      <Button visible={visible} toggleVisible={toggleVisible} />
    </div>
  );
}

function ProfileCard({ userImage, userName, userBio }) {
  return (
    <div className="cardContainer">
      <div className="imgContainer">
        <img src={userImage} alt="reactLogo" className="logo" />
      </div>
      <div className="info">
        <p>
          <b>{userName}</b>
        </p>
        <p>{userBio}</p>
      </div>
    </div>
  );
}

function Button({ visible, toggleVisible }) {
  return (
    <button onClick={toggleVisible}>
      {visible ? "Hide Profile" : "Show Profile"}
    </button>
  );
}

export default App;
