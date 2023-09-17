import { Route, Routes } from "react-router-dom";
import "./App.css";

//views
import Home from "./view/Home";

function App() {
  return (
    <Routes>

      <Route path="/" element={<Home/>}/>

    </Routes>
  )
}

export default App
