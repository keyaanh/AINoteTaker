import { Suspense } from "react";
import { useRoutes, Routes, Route, useLocation } from "react-router-dom";
import routes from "tempo-routes";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LandingPage from "./components/LandingPage";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import Dashboard from "./components/Dashboard";
import PricingPage from "./components/PricingPage";
import FAQPage from "./components/FAQPage";

function App() {
  const location = useLocation();
  const isDashboard = location.pathname === "/dashboard";
  const showNavAndFooter = !isDashboard;

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <>
        {showNavAndFooter && <Navbar />}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/faq" element={<FAQPage />} />
        </Routes>
        {showNavAndFooter && <Footer />}
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </>
    </Suspense>
  );
}

export default App;
