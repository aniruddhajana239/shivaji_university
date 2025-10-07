import { BrowserRouter as Router} from "react-router-dom";
import { useEffect } from "react";
import { Header } from "../sections/common/header/Header";
import Footer from "../sections/common/footer/Footer";
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
  return (
    <div className="min-h-screen  w-full flex flex-col">
      <Header />
      <div className="flex-grow">
        <PublicRoutes />
      </div>
      <Footer />
    </div>
  );
};

export default BaseRouting;
