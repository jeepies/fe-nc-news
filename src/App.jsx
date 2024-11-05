import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";

import Navbar from "./components/Navbar";

import Index from "./routes/Index";
import Article from "./routes/Article";
import Topics from "./routes/Topics"
import Articles from "./routes/Articles";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/article/:id" element={<Article />} />
        <Route path="/topics" element={<Topics/>}/>
        <Route path="/articles" element={<Articles/>}/>
      </Routes>
      <ToastContainer position="bottom-right" theme="colored" />
    </>
  );
}

export default App;
