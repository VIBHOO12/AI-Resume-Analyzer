import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import AIQuestions from "../pages/AIQuestions";
import ResumeHistory from "../pages/ResumeHistory";
import ProtectedRoute
from "../components/ProtectedRoute";

const AppRoutes = () => {

  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>

              <Dashboard />

            </ProtectedRoute>
          }
        />

        <Route
          path="/ai-questions"
          element={
            <ProtectedRoute>

              <AIQuestions />

            </ProtectedRoute>
          }
        />
        <Route
  path="/resume-history"
  element={
    <ProtectedRoute>

      <ResumeHistory />

    </ProtectedRoute>
  }
/>

      </Routes>

    </BrowserRouter>
  );
};

export default AppRoutes;