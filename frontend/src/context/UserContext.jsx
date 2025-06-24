import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(undefined); // undefined = still loading

  // Load user from localStorage on initial mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setUser(null);
    }
  }, []);


  //Function to update user data
  const updateUser = (newUser) => {
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser)); // Save in localStorage
  };

  //Function to clear user data (eg on logout) 
  const clearUser = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token'); // optional, if you store token too
  };

  return (
    <UserContext.Provider value={{ user, updateUser, clearUser }}>     {/* this is used to provide the user data to the context (context means the data that is shared between the components) */}      
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider };
