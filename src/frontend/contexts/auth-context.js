import {
  createContext,
  useContext,
  useEffect,
  useState,
  useReducer,
} from "react";
import { auth } from "../firebase.config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

const AuthContext = createContext({
  currentUser: null,
  signup: () => Promise,
  signin: () => Promise,
  signout: () => Promise,
});

const useAuth = () => useContext(AuthContext);

function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const initialState = {
    email: "",
    password: "",
    errorMsg: "",
  };
  const [authState, authDispatch] = useReducer(
    authReducerFunction,
    initialState
  );

  function authReducerFunction(authState, action) {
    switch (action.type) {
      case "EMAIL":
        return { ...authState, email: action.payload };
      case "PASSWORD":
        return { ...authState, password: action.payload };
      case "RESET_FORM":
        return { ...authState, email: "", password: "" };
      case "CLEAR_AUTH_DATA":
        return { ...initialState };
      case "ERROR":
        return { ...authState, errorMsg: action.payload };
      case "CLEAR_ERROR":
        return { ...authState, errorMsg: "" };
      case "TEST_CREDENTIALS":
        return {
          ...authState,
          email: "rohit@gmail.com",
          password: "rohitrohit",
        };
      default:
        return { ...authState };
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function signin(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function signout() {
    return signOut(auth);
  }
  const value = {
    currentUser,
    signup,
    signin,
    signout,
    authState,
    authDispatch,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export { useAuth, AuthProvider };
