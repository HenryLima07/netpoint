import { Route, Routes } from "react-router-dom";
import "./App.css";

//views
import Home from "./view/Home";
import LoginView from "./view/LoginView";
import SingUpView from "./view/SingUpView";
import CanchaIndView from "./view/CanchaInd.view";

function App() {
  return (
    <Routes>

      <Route path="/" element={<Home/>}/>
      <Route path="/singin" element={<LoginView/>}/>
      <Route path="/singup" element={<SingUpView/>}/>
      <Route path="/cancha" element={<CanchaIndView/>}/>

    </Routes>
  )
}

export default App
