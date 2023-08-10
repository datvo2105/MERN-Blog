import React, { createContext, useState } from "react";

export const UserContext = createContext({});

export const UserContextProvider = ({ children }) => {
  const [profile, setProfile] = useState({});
  return (
    <React.Fragment>
      <UserContext.Provider value={{ profile, setProfile }}>
        {children}
      </UserContext.Provider>
    </React.Fragment>
  );
};
