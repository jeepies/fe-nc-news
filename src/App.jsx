import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";

import Index from "./routes/Index";

function App() {
  const router = createBrowserRouter([{ path: "/", element: <Index /> }]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
