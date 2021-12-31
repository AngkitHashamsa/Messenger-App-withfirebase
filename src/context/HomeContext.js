import React, { useState, useContext, useEffect } from "react";

const HomeContext = React.createContext();

export const HomeProvider = ({ children }) => {
  const [profileImages, setProfileImages] = useState("");

  useEffect(() => {}, [profileImages]);

  return (
    <HomeContext.Provider value={{ profileImages, setProfileImages }}>
      {children}
    </HomeContext.Provider>
  );
};

export const useHomeProvider = () => {
  return useContext(HomeContext);
};
