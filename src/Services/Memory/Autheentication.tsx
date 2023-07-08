import React, { createContext, useReducer, ReactNode  } from "react";

const initialState = {
  token: "",
  authenticated: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "put": {
      const newState = {
        token: action.token,
        authenticated: true,
      };
      return newState;
    }
    case "logout": {
      const newState = {
        token: null,
        authenticated: false,
      };
      return newState;
    }
    default:
      throw new Error();
  }
}
export let ContextAuth = createContext(null);

interface MemoryAuthProps {
  children: ReactNode;
}

function MemoryAuth({ children }: MemoryAuthProps){
  const value = useReducer(reducer, initialState);
  return <ContextAuth.Provider value={value}>{children}</ContextAuth.Provider>;
}

export default MemoryAuth;
