import React, { createContext, useContext, useState } from 'react';

// Create a context for issues
const IssuesContext = createContext();

export const useIssues = () => {
  return useContext(IssuesContext);
};

export const IssuesProvider = ({ children }) => {
  const [issues, setIssues] = useState([]);

  const addIssue = (issue) => {
    setIssues((prevIssues) => [...prevIssues, issue]);
  };

  return (
    <IssuesContext.Provider value={{ issues, addIssue }}>
      {children}
    </IssuesContext.Provider>
  );
};
