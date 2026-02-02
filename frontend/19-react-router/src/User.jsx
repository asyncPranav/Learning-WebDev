import { useParams } from "react-router-dom";

const User = () => {
  console.log(useParams());
  const { id } = useParams();

  return (
    <div>
      <h1>User Page</h1>
      User ID: {id}
    </div>
  );
};

export default User;
