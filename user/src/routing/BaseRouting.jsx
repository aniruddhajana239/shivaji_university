import { BrowserRouter as Router, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Header } from "../sections/common/header/Header";
import Footer from "../components/footer/Footer";
import PublicRoutes from "./publicRoutes/PublicRoutes";
const BaseRouting = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <Router basename="/">
      <Layout />
    </Router>
  );
};

const Layout = () => {
  // const location = useLocation();
  return (
    <div className="min-h-screen w-full flex flex-col">
      <Header />
      <div className="flex-grow">
        <PublicRoutes />
      </div>
      {/* {location.pathname !== "/" && <StickyBar />} */}
      <Footer />
    </div>
  );
};

export default BaseRouting;
