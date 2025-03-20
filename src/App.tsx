import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import MainPage from "./Components/MainPage/MainPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />}></Route>
        {/* <Route path="/" element={<MainPage />}></Route> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
