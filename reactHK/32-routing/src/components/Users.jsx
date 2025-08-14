import React from "react";
import { Link, Outlet } from "react-router-dom";

const Users = () => {
  const users = [
    { id: 1, name: "Pranav" },
    { id: 2, name: "Ayush" },
    { id: 3, name: "Mukund" },
  ];
  return (
    <div>
      <h1>Users Page</h1>
      <ul>
        {users.map((item) => {
          return (
            <li key={item.id}>
              <Link to={`${item.id}`}>{`${item.name}`}</Link>
            </li>
          );
        })}
      </ul>
      <Outlet />
    </div>
  );
};

export default Users;
