import React from 'react';
import { Routes, Route } from "react-router-dom";
import HomePage from '../../pages/home/HomePage';
import { SidebarContentNewsLayout } from '../../layouts/SidebarContentNewsLayout';
import { navItems } from '../../constants/NavItems';
import { QuickLinks } from '../../pages/quickLinks/QuickLinks';

const PublicRoutes = () => {
    // Filter navItems to get only routes that have both contents and sidebarItems
    const sidebarRoutes = navItems.filter(item => 
        item?.contents && item?.sidebarItems && item?.path !== "/"
    );

    // Function to find content by path
    const findContentForPath = (path) => {
        // First, check main routes
        const mainRoute = navItems.find(item => item.path === path);
        if (mainRoute) {
            return {
                contents: mainRoute.contents,
                sidebarItems: mainRoute.sidebarItems,
                title: mainRoute.title,
                parentPath: mainRoute.path
            };
        }

        // Then check submenus and child submenus
        for (const item of navItems) {
            if (item.submenus) {
                for (const submenu of item.submenus) {
                    if (submenu.path === path) {
                        return {
                            contents: item.contents,
                            sidebarItems: item.sidebarItems,
                            title: item.title,
                            parentPath: item.path,
                            contentId: submenu.content_id
                        };
                    }
                    if (submenu.childSubmenus) {
                        for (const child of submenu.childSubmenus) {
                            if (child.path === path) {
                                return {
                                    contents: item.contents,
                                    sidebarItems: item.sidebarItems,
                                    title: item.title,
                                    parentPath: item.path,
                                    contentId: child.content_id
                                };
                            }
                        }
                    }
                }
            }
        }
        return null;
    };

    return (
        <>
            <Routes>
                {/* Home Route - Always available */}
                <Route path="/" element={<HomePage />} />
                
                {/* Dynamic Routes for all paths */}
                {navItems.map((item) => {
                    // Main route
                    if (item.path && item.path !== "/") {
                        return (
                            <Route
                                key={item.id}
                                path={item.path}
                                element={
                                    <div className="w-full bg-white py-0">
                                        <SidebarContentNewsLayout 
                                            contentList={item.contents || []} 
                                            navItems={item.sidebarItems || []} 
                                            parentPath={item.path} 
                                            title={item.title} 
                                        />
                                    </div>
                                }
                            />
                        );
                    }
                    return null;
                })}

                {/* Submenu routes */}
                {navItems.map((item) => 
                    item.submenus?.map((submenu) => (
                        <Route
                            key={submenu.id}
                            path={submenu.path}
                            element={
                                <div className="w-full bg-white py-0">
                                    <SidebarContentNewsLayout 
                                        contentList={item.contents || []} 
                                        navItems={item.sidebarItems || []} 
                                        parentPath={item.path} 
                                        title={item.title}
                                        contentId={submenu.content_id}
                                    />
                                </div>
                            }
                        />
                    ))
                )}

                {/* Child submenu routes */}
                {navItems.map((item) => 
                    item.submenus?.map((submenu) => 
                        submenu.childSubmenus?.map((child) => (
                            <Route
                                key={child.id}
                                path={child.path}
                                element={
                                    <div className="w-full bg-white py-0">
                                        <SidebarContentNewsLayout 
                                            contentList={item.contents || []} 
                                            navItems={item.sidebarItems || []} 
                                            parentPath={item.path} 
                                            title={item.title}
                                            contentId={child.content_id}
                                        />
                                    </div>
                                }
                            />
                        ))
                    )
                )}
                <Route path="/quick-links" element={<QuickLinks/>}/>
                
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