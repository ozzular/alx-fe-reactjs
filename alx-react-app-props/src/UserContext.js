import { createContext } from 'react';

// Create the context with a default value of null
// This will hold our user data that any component can access
const UserContext = createContext(null);

export default UserContext;
