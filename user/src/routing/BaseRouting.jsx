import { BrowserRouter as Router} from "react-router-dom";
import { useEffect } from "react";
import { Header } from "../sections/common/header/Header";
import Footer from "../sections/common/footer/Footer";
import PublicRoutes from "./publicRoutes/PublicRoutes";
import { useDispatch, useSelector } from "react-redux";
import { settingsSelector } from "../redux/selectors/settings/Settings";
import { settingsActions } from "../redux/reducer/slice/settings/settingsSlice";
import { HomeSelector } from "../redux/selectors/home/HomeSelector";
 

const BaseRouting = () => {
  const HomeData=useSelector(HomeSelector)
  useEffect(()=>{console.log("Home Data In Base Routing:",HomeData)})
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <Router basename="/">
      <Layout HomeData={HomeData}/>
    </Router>
  );
};

const Layout = ({HomeData}) => {
  const settingsData = useSelector(settingsSelector)
    const dispatch = useDispatch()
    useEffect(() => {
      if (Object?.keys(settingsData?.data)?.length===0) {
        dispatch(settingsActions?.getHeader())
      }
    }, [])
  return (
    <div className="min-h-screen  w-full flex flex-col">
      <Header loading={settingsData?.isFetching} data={settingsData?.data??{}}/>
      <div className="flex-grow">
        <PublicRoutes />
      </div>
      <Footer HomeData={HomeData??{}}/>
    </div>
  );
};

export default BaseRouting;
