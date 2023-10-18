import { Route, Routes } from "react-router-dom";
import "./App.css";

//views
import Home from "./view/Home";
import LoginView from "./view/LoginView";
import SingUpView from "./view/SingUpView";
import CanchaIndView from "./view/CanchaInd.view";
import CanchaView from "./view/Canchas.view";
import ErrorView from "./view/Error.view";

function App() {
  return (
    <Routes>

      <Route path="/" element={<Home/>}/>
      <Route path="/singin" element={<LoginView/>}/>
      <Route path="/singup" element={<SingUpView/>}/>
      <Route path="/cancha/:id" element={<CanchaIndView/>}/>
      <Route path="/cancha/*" element={<CanchaView/>}/>
      <Route path="/*" element={<ErrorView/>}/>

    </Routes>
  )
}

export default App
