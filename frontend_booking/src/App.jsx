import { Route, Routes } from "react-router-dom";
import "./App.css";

//views
import Home from "./view/Home";
import LoginView from "./view/LoginView";

function App() {
  return (
    <Routes>

      <Route path="/" element={<Home/>}/>
      <Route path="/singin" element={<LoginView/>}/>

    </Routes>
  )
}

export default App
