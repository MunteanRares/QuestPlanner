import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {
  let auth = { token: localStorage.getItem("jwtToken") };
  return auth.token ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
