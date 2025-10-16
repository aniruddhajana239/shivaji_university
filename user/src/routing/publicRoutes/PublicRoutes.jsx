import React, { useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
import HomePage from '../../pages/home/HomePage';
import { SidebarContentNewsLayout } from '../../layouts/SidebarContentNewsLayout';
import { navItems } from '../../constants/NavItems';

const PublicRoutes = () => {
    // Filter navItems to get only routes that have both contents and sidebarItems
    const sidebarRoutes = navItems.filter(item => 
        item?.contents && item?.sidebarItems && item?.path !== "/" // Exclude home
    );
useEffect(()=>{console.log("sidebar routes::",sidebarRoutes)},[sidebarRoutes])
    // Get all valid paths from navItems for 404 handling
    // const validPaths = navItems.map(item => item.path);

    return (
        <>
            <Routes>
                {/* Home Route - Always available */}
                <Route path="/" element={<HomePage />} />
                
                {/* Dynamic Routes for pages with sidebar content */}
                {sidebarRoutes?.map((item) => (
                    <Route
                        key={item?.id}
                        path={item?.path}
                        element={
                            <div className="w-full bg-white py-0">
                                <SidebarContentNewsLayout 
                                    contentList={item?.contents??[]} 
                                    navItems={item?.sidebarItems??[]} 
                                    parentPath={item?.path} 
                                    title={item?.title} 
                                />
                            </div>
                        }
                    />
                ))}
                
                {/* 404 Route for all invalid paths */}
                <Route path="*" element={
                    <div className="w-full bg-white py-60">
                        <div className="container mx-auto px-4 text-center">
                            <h1 className="text-3xl font-bold text-[#001F51]">404 - Page Not Found</h1>
                            <p className="mt-4">The page you're looking for doesn't exist.</p>
                        </div>
                    </div>
                } />
            </Routes>
        </>
    );
};

export default PublicRoutes;