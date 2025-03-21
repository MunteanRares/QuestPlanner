import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import MainPage from "./Components/MainPage/MainPage";
import PlannerPage from "./Components/PlannerPage/PlannerPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/:city/:placeId" element={<PlannerPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
