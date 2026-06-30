import { Suspense, lazy, useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Route, Routes, useLocation } from "react-router-dom";
import AppShell from "./components/AppShell";
import PageLoader from "./components/PageLoader";
import CustomCursor from "./components/CustomCursor";

const HomePage = lazy(() => import("./pages/HomePage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const ServicesPage = lazy(() => import("./pages/ServicesPage"));
const IndustriesPage = lazy(() => import("./pages/IndustriesPage"));
const ProcessPage = lazy(() => import("./pages/ProcessPage"));
const WhyAzionPage = lazy(() => import("./pages/WhyAzionPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));

const routes = [
  { path: "/", element: <HomePage /> },
  { path: "/about", element: <AboutPage /> },
  { path: "/services", element: <ServicesPage /> },
  { path: "/industries", element: <IndustriesPage /> },
  { path: "/process", element: <ProcessPage /> },
  { path: "/why-azion", element: <WhyAzionPage /> },
  { path: "/contact", element: <ContactPage /> },
];

function RouteFallback() {
  return (
    <AppShell>
      <div className="page-shell pt-32">
        <div className="section-shell h-72 animate-pulse bg-brand-alt/70" />
      </div>
    </AppShell>
  );
}

function RouteSwitcher() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<RouteFallback />}>
        <Routes location={location} key={location.pathname}>
          {routes.map((route) => (
            <Route key={route.path} path={route.path} element={<AppShell>{route.element}</AppShell>} />
          ))}
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <CustomCursor />
      <AnimatePresence>{loading ? <PageLoader onComplete={() => setLoading(false)} /> : null}</AnimatePresence>
      <RouteSwitcher />
    </>
  );
}
