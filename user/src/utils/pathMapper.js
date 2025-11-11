// utils/pathMapper.js
import { navItems } from "../constants/NavItems";

// Extract all paths from navItems structure
export const getAllPathsFromNavItems = () => {
  const pathMap = {};
  
  const extractPaths = (items) => {
    items.forEach(item => {
      // Map main items
      if (item.id && item.path) {
        pathMap[item.id] = item.path;
      }
      
      // Map submenus
      if (item.submenus) {
        item.submenus.forEach(submenu => {
          if (submenu.id && submenu.path) {
            pathMap[submenu.id] = submenu.path;
          }
          
          // Map child submenus with content_id
          if (submenu.childSubmenus) {
            submenu.childSubmenus.forEach(child => {
              if (child.id && child.path) {
                pathMap[child.id] = child.path;
              }
              if (child.content_id && child.path) {
                pathMap[child.content_id] = child.path;
              }
            });
          }
          
          // Map submenu content_id
          if (submenu.content_id && submenu.path) {
            pathMap[submenu.content_id] = submenu.path;
          }
        });
      }
    });
  };
  
  extractPaths(navItems);
  return pathMap;
};

// Helper function to get path for any content ID
export const getPathForContentId = (contentId) => {
  const pathMap = getAllPathsFromNavItems();
  return pathMap[contentId] || null;
};