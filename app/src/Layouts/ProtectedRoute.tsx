import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootStateReducer } from "../store";

export type ProtectedRouteProps = {
  outlet: JSX.Element;
};
export default function ProtectedRoute({ outlet}: ProtectedRouteProps) {
  const { user: { isLogin } } = useSelector((state: RootStateReducer) => state);

  if(isLogin) {
    return outlet;
  } else {
    return <Navigate to={{ pathname: '/login' }} />;
  }
};