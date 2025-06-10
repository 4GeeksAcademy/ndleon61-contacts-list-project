import { createContext, useContext, useReducer } from "react";

const GlobalContext = createContext();

const initialState = {
  contacts: [],
  selectedAgenda: "david_leon"
};

function reducer(state, action) {
  switch (action.type) {
    case "set_contacts":
      return { ...state, contacts: action.payload };

    case "add_contact":
      return { ...state, contacts: [...state.contacts, action.payload] };

    case "delete_contact":
      return {
        ...state,
        contacts: state.contacts.filter((c) => c.id !== action.payload)
      };

    case "update_contact":
      return {
        ...state,
        contacts: state.contacts.map((c) =>
          c.id === action.payload.id ? action.payload : c
        )
      };

    default:
      throw new Error("Unknown action: " + action.type);
  }
}

export const StoreProvider = ({ children }) => {
  const [store, dispatch] = useReducer(reducer, initialState);

  return (
    <GlobalContext.Provider value={{ store, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default function useGlobalStore() {
  return useContext(GlobalContext);
}