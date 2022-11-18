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
import { authReducerFunction } from "./reducerFn/authReducerFn";

export type Auth = {
  email: string;
  password: string;
  errorMsg: string;
};

export type Action =
  | { type: "EMAIL"; payload: string }
  | { type: "PASSWORD"; payload: string }
  | { type: "RESET_FORM" }
  // | { type: "CLEAR_AUTH_DATA" }
  | { type: "ERROR"; payload: string }
  | { type: "CLEAR_ERROR" }
  | { type: "TEST_CREDENTIALS" }
  | { type: "DEFAULT" };

export type AuthContextType = {
  currentUser: User | null;
  signup: (email: string, password: string) => Promise<UserCredential>;
  signin: (email: string, password: string) => Promise<UserCredential>;
  signout: () => void;
  authState: typeof initialState;
  authDispatch: (action: Action) => void;
};

export const initialState = {
  email: "",
  password: "",
  errorMsg: "",
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);
const useAuth = () => useContext(AuthContext);

type Props = {
  children: ReactNode;
};

export function signup(email: string, password: string) {
  return createUserWithEmailAndPassword(auth, email, password);
}

export function signin(email: string, password: string) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function signout() {
  return signOut(auth);
}

const AuthProvider = ({ children }: Props) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const [authState, authDispatch] = useReducer(
    authReducerFunction,
    initialState
  );

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
