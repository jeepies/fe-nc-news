import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Index from "./routes/Index";
import Navbar from "./components/Navbar";
import Article from "./routes/Article";

function App() {
  const router = createBrowserRouter([
    { path: "/", element: <Index /> },
    { path: "/article/:id", element: <Article /> },
  ]);

  return (
    <>
      <Navbar />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
