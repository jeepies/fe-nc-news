import { Routes, Route } from "react-router-dom";

import Index from "./routes/Index";
import Navbar from "./components/Navbar";
import Article from "./routes/Article";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";

function App() {
  // const router = createBrowserRouter([
  //   { path: "/", element: <Index /> },
  //   { path: "/article/:id", element: <Article /> },
  // ]);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/article/:id" element={<Article />} />
      </Routes>
      <ToastContainer position="bottom-right" theme="colored" />
    </>
  );
}

export default App;
