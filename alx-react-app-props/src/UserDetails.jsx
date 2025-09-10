import { useContext } from 'react';
import UserContext from './UserContext';

function UserDetails() {
  // Directly access userData from context - no props needed!
  const userData = useContext(UserContext);

  return (
    <div>
      <p>Name: {userData.name}</p>
      <p>Email: {userData.email}</p>
    </div>
  );
}

export default UserDetails;
