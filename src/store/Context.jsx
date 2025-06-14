import { useContext, createContext, useReducer } from "react";

const Context = createContext(null);

const initialState = { contacts: [], updated: false };

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_CONTACTS":
      return { ...state, contacts: action.payload, updated: false };

    case "ADD_CONTACT":
      return { ...state, updated: true };

    case "DELETE_CONTACT":
      return {
        ...state,
        contacts: state.contacts.filter(contact => contact.id !== action.payload)
      };

    case "UPDATE_CONTACT":
      return { ...state, updated: true };

    default:
      return state;
  }
};

export const ContextProvider = ({ children }) => {
  const [store, dispatch] = useReducer(reducer, initialState);

  return (
    <Context.Provider value={{ store, dispatch }}>
      {children}
    </Context.Provider>
  );
};

export const useGlobalReducer = () => useContext(Context);