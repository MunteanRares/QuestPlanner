import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./styles/CustomCalendar.css";
import { Provider } from "./Components/ui/provider";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <Provider>
    <StrictMode>
      <App />
    </StrictMode>
  </Provider>
);
