import React from 'react';
import { Routes, Route } from "react-router-dom";
import HomePage from '../../pages/home/HomePage';
import { SidebarContentNewsLayout } from '../../layouts/SidebarContentNewsLayout';
import { QuickLinks } from '../../pages/quickLinks/QuickLinks';
import { useSelector } from 'react-redux';
import { menusSelector } from '../../redux/selectors/settings/MenuList';
import RippleLoader from '../../components/loaders/RippleLoader';
import SearchResultsPage from '../../pages/search/Search';

// Helper function to convert API menu data to routing format
const convertApiMenusToNavItems = (apiMenus) => {
  if (!apiMenus || !Array.isArray(apiMenus)) return [];
  
  return apiMenus.map(menu => ({
    id: menu.id.toString(),
    originalId: menu.id,
    title: menu.name,
    path: getPathFromMenuName(menu.name),
    submenus: menu.children && menu.children.length > 0 ? 
      menu.children.map(child => ({
        id: child.id.toString(),
        originalId: child.id,
        title: child.name,
        path: getPathFromMenuName(child.name),
        childSubmenus: child.children && child.children.length > 0 ? 
          child.children.map(grandChild => ({
            id: grandChild.id.toString(),
            originalId: grandChild.id,
            title: grandChild.name,
            path: getPathFromMenuName(grandChild.name)
          })) : null
      })) : null
  }));
};

// Helper function to generate path from menu name
const getPathFromMenuName = (name) => {
  if (name === "Home") return "/";
  // Convert name to kebab-case for URL
  return `/${name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`;
};

const PublicRoutes = () => {
  // Get menu data from Redux
  const menuData = useSelector(menusSelector);
  const isLoading = menuData?.isFetching || false;
  
  // Convert API menu data to routing format
  const dynamicNavItems = convertApiMenusToNavItems(menuData?.data?.menus || []);
  
  console.log("📊 PublicRoutes - Menu data from Redux:", {
    isLoading,
    hasData: !!menuData?.data?.menus,
    menuCount: menuData?.data?.menus?.length || 0,
    dynamicNavItemsCount: dynamicNavItems.length
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
       <RippleLoader/>
      </div>
    );
  }

  if (!menuData?.data?.menus || dynamicNavItems.length === 0) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold text-gray-700">No menu data available</h1>
        <p className="mt-4 text-gray-500">Please try refreshing the page</p>
      </div>
    );
  }

  return (
    <>
      <Routes>
        {/* Home Route */}
        <Route path="/" element={<HomePage />} />
        
        {/* Quick Links Route */}
        <Route path="/quick-links" element={<QuickLinks />} />
         <Route path="/search" element={<SearchResultsPage />} />
        
        {/* Dynamic Routes for all navigation items */}
        {dynamicNavItems.map((item) => {
          if (item.path && item.path !== "/") {
            return (
              <Route
                key={item.id}
                path={item.path}
                element={
                  <div className="w-full bg-white py-0">
                    <SidebarContentNewsLayout 
                      navItems={dynamicNavItems} // Pass dynamic navItems
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
        {dynamicNavItems.map((item) => 
          item.submenus?.map((submenu) => (
            <Route
              key={submenu.id}
              path={submenu.path}
              element={
                <div className="w-full bg-white py-0">
                  <SidebarContentNewsLayout 
                    navItems={dynamicNavItems} // Pass dynamic navItems
                    parentPath={item.path} 
                    title={item.title}
                    contentId={submenu.originalId} // Pass originalId as contentId
                  />
                </div>
              }
            />
          ))
        )}

        {/* Child submenu routes */}
        {dynamicNavItems.map((item) => 
          item.submenus?.map((submenu) => 
            submenu.childSubmenus?.map((child) => (
              <Route
                key={child.id}
                path={child.path}
                element={
                  <div className="w-full bg-white py-0">
                    <SidebarContentNewsLayout 
                      navItems={dynamicNavItems} // Pass dynamic navItems
                      parentPath={item.path} 
                      title={item.title}
                      contentId={child.originalId} // Pass originalId as contentId
                    />
                  </div>
                }
              />
            ))
          )
        )}
        
        {/* 404 Route */}
        <Route path="*" element={
          <div className="w-full bg-white py-60">
            <div className="container mx-auto px-4 text-center">
              <h1 className="text-3xl font-bold text-[#001F51]">404 - Page Not Found</h1>
              <p className="mt-4">Path: {window.location.pathname}</p>
              <p className="mt-2">Query: {window.location.search}</p>
              <p className="mt-4 text-sm text-gray-500">
                Available routes: {dynamicNavItems.map(item => item.path).join(', ')}
              </p>
            </div>
          </div>
        } />
      </Routes>
    </>
  );
};

export default PublicRoutes;