import "./App.css";
import { useState } from "react";

function App() {
  // users state lifted to App so it can be passed to Form and displayed below
  // all sublitted users
  const [users, setUsers] = useState([]);

  return (
    <div>

      {/* Form to add new users */}
      <Form users={users} setUsers={setUsers} />

       {/* Displaying user cards */}
      <div className="cardContainer">
        {users.map((userObj, index) => {
          if (userObj.userName && userObj.userRole) {
            
            return (
              <Card
              key={index}
              userName={userObj.userName}
              userRole={userObj.userRole}
              />
            );
          }
        })}
      </div>
    </div>
  );
}

// input user form component
function Form({users, setUsers}) {
  // single user input
  const [user, setUser] = useState({
    userName: "",
    userRole: "",
  });

  // handle change
  function handleChange(e) {
    const { name, value } = e.target;

    setUser((prevUser) => {
      return {
        ...prevUser,
        [name]: value,
      };
    });
  }

  // handle submit
  function handleSubmit(e) {
    e.preventDefault();

    // simple validation
    if (!user.userName || !user.userRole) {
      alert("Both fields are required");
    }

    // add user to the users array
    setUsers((prevUsers) => [...prevUsers, user]);

    // reset the input field
    setUser({
      userName: "",
      userRole: "",
    });
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="formContainer">
        <input
          type="text"
          name="userName"
          value={user.userName}
          onChange={handleChange}
          autoComplete="off"
          placeholder="Enter name"
        />

        <input
          type="text"
          name="userRole"
          value={user.userRole}
          onChange={handleChange}
          autoComplete="off"
          placeholder="Enter role"
        />

        <button type="submit">Add User</button>
        
      </form>
    </div>
  );
}

// user card component
function Card({ userName, userRole }) {
  return (
    <div className="userCard">
      <div className="userImage">
        {/* <img src={`https://picsum.photos/id/${parseInt(Math.random()*100)}/200/200`} alt={`${userName}'s avatar`} /> */}
        <img
          src={`https://api.dicebear.com/7.x/identicon/svg?seed=${userName}`}
          alt={`${userName}'s avatar`}
        />
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
