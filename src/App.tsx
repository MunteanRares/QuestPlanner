import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import MainPage from "./Components/MainPage/MainPage";
import PlannerPage from "./Components/PlannerPage/PlannerPage";
import useValidateToken from "./hooks/useValidateToken";
import LoginLogoutPage from "./Components/LoginLogoutPage";
import { useState, useEffect } from "react";
import ProfilePage from "./Components/ProfilePage/ProfilePage";
import PrivateRoutes from "./Components/PrivateRoutes";
import { LuRotateCwSquare } from "react-icons/lu";

function App() {
  const [token, setToken] = useState(localStorage.getItem("jwtToken") || "");
  const { data: isTokenValid } = useValidateToken();

  // useEffect(() => {
  //   const handleStorageChange = () => {
  //     setToken(localStorage.getItem("jwtToken") || "");
  //   };

  //   console.log(isTokenValid.valid);

  //   window.addEventListener("storage", handleStorageChange);
  //   return () => window.removeEventListener("storage", handleStorageChange);
  // }, [isTokenValid]);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<MainPage />} />
          <Route path="/:city/:placeId" element={<PlannerPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>

        <Route
          path="/register"
          element={
            isTokenValid?.valid ? (
              <Navigate to="/" />
            ) : (
              <LoginLogoutPage type="register" text="Register" />
            )
          }
        />

        <Route
          path="/login"
          element={
            isTokenValid?.valid ? (
              <Navigate to="/" />
            ) : (
              <LoginLogoutPage type="login" text="Login" />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
