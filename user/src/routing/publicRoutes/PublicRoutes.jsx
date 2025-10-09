import React from 'react';
import {Routes,Route} from "react-router-dom";
import HomePage from '../../pages/home/HomePage';
import { AboutUs } from '../../pages/about/AboutUs';
const PublicRoutes = () => {
    return (
        <>
           <Routes>
            <Route path="/" element={<HomePage/>}/> 
            <Route path="/about" element={<AboutUs/>}/> 
           </Routes>
        </>
    );
};

export default PublicRoutes;