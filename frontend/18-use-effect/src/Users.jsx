import { useState, useEffect } from "react";

const Users = () => {
  const [users, setUsers] = useState([]);

  // Fetch users from an API when the component mounts
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);


  // Optional: Set up an interval to refetch users every 100 seconds
  // Use with caution to avoid excessive network requests
  // Used here just for demonstration purposes
  // Real applications might use WebSockets or other methods for real-time updates
  useEffect(() => {
    const intervalId = setInterval(() => {
      fetch("https://jsonplaceholder.typicode.com/users")
        .then((response) => response.json())
        .then((data) => setUsers(data))
        .catch((error) => console.error("Error fetching users:", error));
    }, 100000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <h2>Users List</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} ({user.email})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
