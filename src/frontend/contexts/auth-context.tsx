import {
  createContext,
  useContext,
  useEffect,
  useState,
  useReducer,
  ReactNode,
} from "react";
import { auth } from "../firebase.config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  User,
  UserCredential,
} from "firebase/auth";

type Auth = {
  email: string;
  password: string;
  errorMsg: string;
};

type Action =
  | { type: "EMAIL"; payload: string }
  | { type: "PASSWORD"; payload: string }
  | { type: "RESET_FORM" }
  | { type: "CLEAR_AUTH_DATA" }
  | { type: "ERROR"; payload: string }
  | { type: "CLEAR_ERROR" }
  | { type: "TEST_CREDENTIALS" };

type AuthContextType = {
  currentUser: User | null;
  signup: (email: string, password: string) => Promise<UserCredential>;
  signin: (email: string, password: string) => Promise<UserCredential>;
  signout: () => void;
  authState: typeof initialState;
  authDispatch: (action: Action) => void;
};

const initialState: Auth = {
  email: "",
  password: "",
  errorMsg: "",
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);
const useAuth = () => useContext(AuthContext);

type Props = {
  children: ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const [authState, authDispatch] = useReducer(
    authReducerFunction,
    initialState
  );

  function authReducerFunction(authState: Auth, action: Action) {
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
      localStorage.setItem("user", JSON.stringify(user));
    });
    return () => {
      unsubscribe();
      localStorage.clear();
    };
  }, []);

  function signup(email: string, password: string) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function signin(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function signout() {
    return signOut(auth);
  }
  return (
    <AuthContext.Provider
      value={{
        currentUser,
        signup,
        signin,
        signout,
        authState,
        authDispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { useAuth, AuthProvider };
