import { Middleware } from "redux";

export const AxiosInstance: Middleware = api => next => action => {
    // Do stuff
    console.log("middleware run");
    return next(action);
  };