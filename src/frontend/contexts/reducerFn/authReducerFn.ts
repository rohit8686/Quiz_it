import { Action, Auth } from "../auth-context";

export function authReducerFunction(authState: Auth, action: Action) {
    switch (action.type) {
      case "EMAIL":
        return { ...authState, email: action.payload };
      case "PASSWORD":
        return { ...authState, password: action.payload };
      case "RESET_FORM":
        return { ...authState, email: "", password: "" };
    //   case "CLEAR_AUTH_DATA":
    //     return { ...initialState };
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