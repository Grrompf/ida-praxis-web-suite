import { lazy, Suspense, useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import SkipLink from "./components/SkipLink";
import Index from "./pages/Index";
import CookieConsent from "./components/CookieConsent";

const Footer = lazy(() => import("./components/Footer"));
const Anfahrt = lazy(() => import("./pages/Anfahrt"));
const Kontakt = lazy(() => import("./pages/Kontakt"));
const Impressum = lazy(() => import("./pages/Impressum"));
const Datenschutz = lazy(() => import("./pages/Datenschutz"));
const NotFound = lazy(() => import("./pages/NotFound"));

const DeferredLoader = ({ children }: { children: React.ReactNode }) => {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if ("requestIdleCallback" in window) {
      const id = requestIdleCallback(() => setReady(true));
      return () => cancelIdleCallback(id);
    }
    const t = setTimeout(() => setReady(true), 50);
    return () => clearTimeout(t);
  }, []);
  return ready ? <>{children}</> : null;
};

const App = () => (
  <BrowserRouter>
    <div className="flex flex-col min-h-screen">
      <SkipLink />
      <Navbar />
      <main id="main-content" className="flex-1" tabIndex={-1}>
        <Suspense fallback={<div className="min-h-screen" />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/anfahrt" element={<Anfahrt />} />
            <Route path="/kontakt" element={<Kontakt />} />
            <Route path="/impressum" element={<Impressum />} />
            <Route path="/datenschutz" element={<Datenschutz />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
      <DeferredLoader>
        <CookieConsent />
      </DeferredLoader>
    </div>
  </BrowserRouter>
);

export default App;
