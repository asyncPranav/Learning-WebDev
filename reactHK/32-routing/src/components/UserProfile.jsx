import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const {id} = useParams(); // get user id from url
  const navigate = useNavigate();

  return (
    <div>
      <h1>User Profile - ID {id}</h1>
      <button onClick={() => navigate('/users')}>Back to users list</button>
    </div>
  )
}

export default UserProfile
