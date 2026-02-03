import { useLoaderData } from "react-router-dom";

const Profile = () => {
  const user = useLoaderData();
  return (
    <div>
      <h2>Profile Page</h2>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
    </div>
  );
};

export default Profile;
