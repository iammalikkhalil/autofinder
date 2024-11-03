import React, { createContext, useReducer } from 'react';

export const UserContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...action.payload };
    case 'LOGOUT':
      return {};
    default:
      return state;
  }
};

export const UserContextProvider = ({ children }) => {
  const [user, dispatch] = useReducer(reducer, {});

  return (
    <UserContext.Provider value={{ user, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};
