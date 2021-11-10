import "./App.css";
import Menu from "./shared/components/Menu";
import ProtectedRoutes from "./shared/components/ProtectedRoutes";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import HomePage from "./components/Home/HomePage";
import GamePage from "./components/Game/GamePage";
import SignupPage from "./components/Signup/SignupPage";
import LoginPage from "./components/Login/LoginPage";
import AboutPage from "./components/About/AboutPage";
function App() {
  return (
    <Router>
      <Menu />
      <Routes>
        <ProtectedRoutes shielded={false} path="/login">
          <LoginPage />
        </ProtectedRoutes>
        <ProtectedRoutes shielded={false} path="/signup">
          <SignupPage />
        </ProtectedRoutes>
        <ProtectedRoutes shielded={true} path="/home">
          <HomePage />
        </ProtectedRoutes>

        <ProtectedRoutes shielded={true} path="/game">
          <GamePage />
        </ProtectedRoutes>
        <Route path="/about">
          <AboutPage />
        </Route>
        <Route path="*">
          <Navigate to="/login"></Navigate>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
