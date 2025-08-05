import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./components/layouts/MainLayout";
import AppRoutes from "./routes/Index";
import SignUpPage from "@/features/auth/Signin";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignUpPage />} />
        <Route
          path="/*"
          element={
            <MainLayout>
              <AppRoutes />
            </MainLayout>
          }
        />
      </Routes>
    </Router>
  );
}
