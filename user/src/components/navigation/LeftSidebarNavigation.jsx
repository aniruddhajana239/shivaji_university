import { useEffect } from "react";
import ChevronRight from "../../assets/icons/chevron_right_dark.png";

export const LeftSidebarNavigation = ({ activePath, handleClick, title, navItems }) => {

  // useEffect(() => {
  //    console.log("📋 LeftSidebarNavigation props:", { 
  //      activePath, 
  //      title, 
  //      navItemsCount: navItems?.length,
  //      navItems: navItems
  //    });
  // }, [activePath, title, navItems]);

  // Debug: Check if any items have itemText property
  useEffect(() => {
    if (navItems && navItems.length > 0) {
      const firstItem = navItems[0];
      // console.log("🔍 First navItem properties:", {
      //   id: firstItem?.id,
      //   originalId: firstItem?.originalId,
      //   itemText: firstItem?.itemText,
      //   title: firstItem?.title,
      //   path: firstItem?.path,
      //   type: firstItem?.type,
      //   parentId: firstItem?.parentId,
      //   grandParentId: firstItem?.grandParentId
      // });
    }
  }, [navItems]);

  // Handle item click - pass both path and menuId
  const handleItemClick = (item) => {
    // console.log("🖱️ LeftSidebar item clicked:", {
    //   itemText: item?.itemText,
    //   path: item?.path,
    //   originalId: item?.originalId,
    //   type: item?.type,
    //   parentId: item?.parentId,
    //   grandParentId: item?.grandParentId
    // });
    
    // Pass path and build query parameters based on menu type
    if (item?.path && item?.originalId) {
      // Build query parameters based on menu type
      const params = new URLSearchParams();
      
      // Always include the menu_id for simple identification
      params.set('menu_id', item.originalId);
      
      // Add hierarchy parameters based on menu type
      if (item?.type === 'parent') {
        params.set('parent_menu_id', item.originalId);
      } else if (item?.type === 'submenu' && item?.parentId) {
        params.set('sub_menu_id', item.originalId);
        params.set('parent_menu_id', item.parentId);
      } else if (item?.type === 'child' && item?.parentId && item?.grandParentId) {
        params.set('child_sub_menu_id', item.originalId);
        params.set('sub_menu_id', item.parentId);
        params.set('parent_menu_id', item.grandParentId);
      }
      
      const queryString = params.toString();
      const fullPath = queryString ? `${item.path}?${queryString}` : item.path;
      handleClick(fullPath, item.originalId);
    } else if (item?.path) {
      // Fallback if no originalId
      handleClick(item.path);
    }
  };

  return (
    <div className="w-full flex flex flex-col gap-3 p-4 rounded-[20px] bg-[#EEFBFF]">
      <h3 className="m-0 p-0 text-[#001F51] text-[18px] font-[600]">{title ?? ""}</h3>
      
      {navItems?.length === 0 ? (
        <p className="text-gray-500 text-sm">No related pages found</p>
      ) : (
        <ul className="w-full flex flex-col gap-1">
          {navItems?.map((item) => {
            const isActive = activePath === item?.path;
            
            return (
              <li 
                key={item?.id || item?.originalId} 
                onClick={() => handleItemClick(item)} 
                className={`cursor-pointer w-full text-left flex-shrink-0 text-[#000000] text-[14px] font-[400] py-1 rounded-[10px] ${isActive && 'font-[600] flex items-center gap-1'}`}
              >
                {isActive && (
                  <div className="w-5 h-5 rounded-full bg-[#C0F0FF] flex justify-center items-center flex-shrink-0">
                    <img 
                      src={ChevronRight} 
                      alt="chevron right" 
                      className="h-2.5 w-2.5 object-contain" 
                    />
                  </div>
                )}
                {/* Check for itemText first, fallback to title */}
                {item?.itemText || item?.title || `Menu ${item?.id}`}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};