import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Index from "./routes/Index";
import Navbar from "./components/Navbar";

function App() {
  const router = createBrowserRouter([{ path: "/", element: <Index /> }]);

  return (
    <>
      <Navbar />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
