import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./contexts/User.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <UserProvider value={{ username: "test" }}>
      <App />
    </UserProvider>
  </BrowserRouter>
);
