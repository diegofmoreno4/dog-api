import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import Nav from "./components/Nav/Nav";
import Home from "./components/Home/Home";
import Detail from "./components/Detail/Detail";
import Form from "./components/Form/Form";
import Landing from "./components/Landing/Landing";

function App() {
  const location = useLocation();
  const noNavRoutes = ["/"];
  const hideNav = noNavRoutes.includes(location.pathname);

  return (
    <div className="App">
      {!hideNav && <Nav />}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/dogs/:id" element={<Detail />} />
        <Route path="/form" element={<Form />} />
      </Routes>
    </div>
  );
}

export default App;
