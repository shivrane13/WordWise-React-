import { createContext, useContext, useReducer } from "react";
import { redirectDocument } from "react-router-dom";

const authContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return { ...state, user: action.payload, isAuthenticated: true };
    case "logout":
      return { ...state, user: null, isAuthenticated: false };
    default:
      throw new Error("Unknown action");
  }
}

const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

function AuthProvider({ children }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );

  function login(email, passwoed) {
    if (email == FAKE_USER.email && passwoed === FAKE_USER.password) {
      dispatch({ type: "login", payload: FAKE_USER });
    }
  }

  function logout(email, passwoed) {
    dispatch({ type: "logout" });
  }
  return (
    <authContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </authContext.Provider>
  );
}

function useAuth() {
  const context = useContext(authContext);
  if (context === undefined)
    throw new Error("AuthContext Was used outside AuthProvider");

  return context;
}

export { AuthProvider, useAuth };
