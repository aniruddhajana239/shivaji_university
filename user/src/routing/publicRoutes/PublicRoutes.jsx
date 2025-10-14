import React from 'react';
import {Routes,Route} from "react-router-dom";
import HomePage from '../../pages/home/HomePage';
import { AboutUs } from '../../pages/about/AboutUs';
import { Governance } from '../../pages/governance/Governance';
const PublicRoutes = () => {
    return (
        <>
           <Routes>
            <Route path="/" element={<HomePage/>}/> 
            <Route path="/about" element={<AboutUs/>}/> 
            <Route path="/governance" element={<Governance/>}/> 
           </Routes>
        </>
    );
};

export default PublicRoutes;