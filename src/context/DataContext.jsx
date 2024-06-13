import { createContext, useReducer } from "react";

export const dataContext = createContext();

const DataContextProvider = ({ children }) => {
  const INIT_STATE = {};

  const reducer = (state = INIT_STATE, action) => {
    switch (key) {
      case value:
        break;

      default:
        break;
    }
  };

  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  return (
    <dataContext.Provider value={{ state }}>{children}</dataContext.Provider>
  );
};

export default DataContextProvider;
