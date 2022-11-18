import * as auth from "./auth-context";
import { authReducerFunction } from "./reducerFn/authReducerFn";

describe("auth context test", () => {
  it("email", () => {
    const res = authReducerFunction(auth.initialState, {
      type: "EMAIL",
      payload: "rohit@gmail.com",
    });
    expect(res).toEqual({ ...auth.initialState, email: "rohit@gmail.com" });
  });
  it("password", () => {
    const res = authReducerFunction(auth.initialState, {
      type: "PASSWORD",
      payload: "rohit",
    });
    expect(res).toEqual({ ...auth.initialState, password: "rohit" });
  });
  it("reset form", () => {
    const res = authReducerFunction(auth.initialState, {
      type: "RESET_FORM",
    });
    expect(res).toEqual(auth.initialState);
  });
  it("error", () => {
    const res = authReducerFunction(auth.initialState, {
      type: "ERROR",
      payload: "Error! Try again",
    });
    expect(res).toEqual({ ...auth.initialState, errorMsg: "Error! Try again" });
  });
  it("clear error", () => {
    const res = authReducerFunction(auth.initialState, {
      type: "CLEAR_ERROR",
    });
    expect(res).toEqual({ ...auth.initialState, errorMsg: "" });
  });
  it("test credentails", () => {
    const res = authReducerFunction(auth.initialState, {
      type: "TEST_CREDENTIALS",
    });
    expect(res).toEqual({
      ...auth.initialState,
      email: "rohit@gmail.com",
      password: "rohitrohit",
    });
  });
  it("default", () => {
    const res = authReducerFunction(auth.initialState, {
      type: "DEFAULT",
    });
    expect(res).toEqual({
      ...auth.initialState,
    });
  });
});

describe("auth actions", () => {
  it("sign in", () => {
    const fn = jest.spyOn(auth, "signin");
    auth.signin("rohit@gmail.com", "rohitrohit");
    expect(fn).toHaveBeenCalledWith("rohit@gmail.com", "rohitrohit");
  });
  it("sign up", () => {
    const fn = jest.spyOn(auth, "signup");
    auth.signup("rohit@gmail.com", "rohitrohit");
    expect(fn).toHaveBeenCalledWith("rohit@gmail.com", "rohitrohit");
  });
  it("logout", () => {
    const fn = jest.spyOn(auth, "signout");
    auth.signout();
    expect(fn).toHaveBeenCalled();
  });
});
