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
        <Route
          path="/login"
          element={
            <ProtectedRoutes shielded={false}>
              <LoginPage />
            </ProtectedRoutes>
          }
        />

        <Route
          path="/signup"
          element={
            <ProtectedRoutes shielded={false}>
              <SignupPage />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/home"
          element={
            <ProtectedRoutes shielded={true}>
              <HomePage />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/game/:id"
          element={
            <ProtectedRoutes shielded={true}>
              <GamePage />
            </ProtectedRoutes>
          }
        />
        <Route path="/about" element={<AboutPage />}></Route>
        <Route path="*" element={<Navigate to="/login"></Navigate>} />
      </Routes>
    </Router>
  );
}

export default App;
