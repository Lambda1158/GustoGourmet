import "./App.css";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage.jsx";
import Home from "./components/Home/Home.jsx";
import CreateRecipe from "./components/CreateRecipe/CreateRecipe";
import Detail from "./components/Detail/Detail.jsx";
function App() {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/post" element={<CreateRecipe />} />
      <Route path="/detail/:id" element={<Detail />} />
      <Route exact path="/" element={<LandingPage />} />
    </Routes>
  );
}

export default App;
