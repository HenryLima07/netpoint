import { Route, Routes } from "react-router-dom";
import "./App.css";
import UserActivity from "./component/UserProfile/UserActivities/UserActivity.component";

//views
import Home from "./view/Home";
import LoginView from "./view/LoginView";
import SingUpView from "./view/SingUpView";
import CanchaIndView from "./view/CanchaInd.view";
import CanchaView from "./view/Canchas.view";
import ErrorView from "./view/Error.view";
import UserProfileView from "./view/UserProfile.view";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/singin" element={<LoginView />} />
        <Route path="/singup" element={<SingUpView />} />
        <Route path="/user" element={<UserProfileView />} />
        <Route path="/cancha/:id" element={<CanchaIndView />} />
        <Route path="/cancha/*" element={<CanchaView />} />
        <Route path="/*" element={<ErrorView />} />
      </Routes>
    </>
  );
}

export default App;
