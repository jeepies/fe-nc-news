import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";

import Navbar from "./components/Navbar";

import Index from "./route_components/Index";
import Article from "./route_components/Article";
import Topics from "./route_components/Topics";
import Articles from "./route_components/Articles";
import PageNotFound from "./route_components/PageNotFound";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="*" element={<PageNotFound />} />
        <Route path="/" element={<Index />} />
        <Route path="/article/:id" element={<Article />} />
        <Route path="/topics" element={<Topics />} />
        <Route path="/articles" element={<Articles />} />
      </Routes>
      <ToastContainer position="bottom-right" theme="colored" />
    </>
  );
}

export default App;
