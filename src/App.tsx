import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import MainPage from "./Components/MainPage/MainPage";
import PlannerPage from "./Components/PlannerPage/PlannerPage";
import useValidateToken from "./hooks/useValidateToken";
import LoginLogoutPage from "./Components/LoginLogoutPage";
import { useState, useEffect } from "react";

function App() {
  const [token, setToken] = useState(localStorage.getItem("jwtToken") || "");
  const { data: isTokenValid } = useValidateToken();

  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem("jwtToken") || "");
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            isTokenValid?.valid ? (
              <MainPage />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/login"
          element={
            isTokenValid?.valid ? (
              <Navigate to="/" replace />
            ) : (
              <LoginLogoutPage text="Login" />
            )
          }
        />
        <Route path="/:city/:placeId" element={<PlannerPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
