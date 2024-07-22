import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import HomePage from "./HomePage";
import Login from "./components/Login";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import { UserContextProvider } from "../context/UserContext";
import Dashboard from "./components/Dashboard";
import ProfileSetUp from "./components/ProfileSetUp";
import UserProfile from "./components/UserProfile";
import ProfileSetUpLogged from "./components/ProfileSetUpLogged";
import UserView from "./components/UserView";

axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <Toaster position="bottom-right" toastOptions={{ duration: 2000 }} />
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/registration" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/profileSet" element={<ProfileSetUp />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/userProfile" element={<UserProfile />}></Route>
          <Route
            path="/profileSetLogged"
            element={<ProfileSetUpLogged />}
          ></Route>
          <Route path="/UserProfileView" element={<UserView />}></Route>
        </Routes>
      </Router>
    </UserContextProvider>
  );
}

export default App;
