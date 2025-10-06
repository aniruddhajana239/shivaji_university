import React from 'react';
import {Routes,Route} from "react-router-dom";
import HomePage from '../../pages/home/HomePage';


const PublicRoutes = () => {
    return (
        <>
           <Routes>
            <Route path="/" element={<HomePage/>}></Route>
           </Routes> 
        </>
    );
};

export default PublicRoutes;