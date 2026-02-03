import { useState, useEffect } from "react";
import ChevronDown from "../../../assets/icons/chevron_down_small.png";
import ChevronDownDark from "../../../assets/icons/chevron_down.png";
import MenuIcon from "../../../assets/icons/menu.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { headerSelector } from "../../../redux/selectors/settings/Header";
import { headerActions } from "../../../redux/reducer/slice/settings/getHeaderCoursesSlice";
import { menuActions } from "../../../redux/reducer/slice/settings/getMenuListSlice";
import { menusSelector } from "../../../redux/selectors/settings/MenuList";

const courses = [
  { name: "UG", bgColor: "#5F52B7" },
  { name: "PG", bgColor: "#138ED2" },
  { name: "P.H.D", bgColor: "#002147" },
  { name: "Online", bgColor: "#093D81" },
  { name: "Distance", bgColor: "#000000" }
];

export const QuickLinksBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Selectors
  const headerData = useSelector(headerSelector);
  const menuData = useSelector(menusSelector);
  
  // State
  const [hoveredItem, setHoveredItem] = useState(null);
  const [openChildMenus, setOpenChildMenus] = useState({});
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileOpenSubmenus, setMobileOpenSubmenus] = useState({});

  // Fetch data on component mount
  useEffect(() => {
    // Fetch header courses if not available
    if (!headerData?.data?.others || headerData.data.others.length === 0) {
      dispatch(headerActions.getHeaderCouses());
    }
    
    // Fetch menu data if not available
    if (!menuData?.data?.menus || menuData.data.menus.length === 0) {
      dispatch(menuActions.getMenus());
    }
  }, [dispatch, headerData?.data?.others, menuData?.data?.menus]);

  // Helper functions
  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.includes(path);
  };

  // Condition: If parent menu ID === 1, do not show its submenus
  const shouldShowSubmenus = (menuId) => {
    return menuId !== 1;
  };

  const toggleChildMenu = (submenuId) => {
    setOpenChildMenus((prev) => ({
      ...prev,
      [submenuId]: !prev[submenuId],
    }));
  };

  const toggleMobileSubmenu = (itemId) => {
    setMobileOpenSubmenus((prev) => {
      const newState = {};
      // Close all other submenus and toggle the clicked one
      Object.keys(prev).forEach((key) => {
        newState[key] = false;
      });
      newState[itemId] = !prev[itemId];
      return newState;
    });
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    // Reset open submenus when closing mobile menu
    if (mobileMenuOpen) {
      setMobileOpenSubmenus({});
      setOpenChildMenus({});
    }
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setMobileOpenSubmenus({});
    setOpenChildMenus({});
  };

  const handleDesktopHover = (itemId) => {
    setHoveredItem(itemId);
    // Close all child menus when hovering to a new item
    setOpenChildMenus({});
  };

  // Function to add query parameters to URL
  const getUrlWithParams = (basePath, parentId, subMenuId = null, childSubMenuId = null) => {
    const params = new URLSearchParams();
    
    // Add parent menu ID
    if (parentId) {
      params.append('parent_menu_id', parentId);
    }
    
    // Add submenu ID if available
    if (subMenuId) {
      params.append('sub_menu_id', subMenuId);
    }
    
    // Add child submenu ID if available
    if (childSubMenuId) {
      params.append('child_sub_menu_id', childSubMenuId);
    }
    
    // Construct the URL with query parameters
    const queryString = params.toString();
    return queryString ? `${basePath}?${queryString}` : basePath;
  };

  // Handle menu click with URL parameter addition
  const handleMenuClick = (basePath, parentId, subMenuId = null, childSubMenuId = null) => {
    const urlWithParams = getUrlWithParams(basePath, parentId, subMenuId, childSubMenuId);

    
    return urlWithParams;
  };

  const handleSubmenuClick = (e, submenu, parentMenuId) => {
    // If submenu has children, prevent navigation and only toggle
    if (submenu.children && submenu.children.length > 0) {
      e.preventDefault();
      e.stopPropagation();
      toggleChildMenu(submenu.id);
    }
    // Navigation will be handled by the Link component with the updated URL
  };

  const handleMobileSubmenuClick = (e, submenu, parentMenuId) => {
    // If submenu has children, prevent navigation and only toggle
    if (submenu.children && submenu.children.length > 0) {
      e.preventDefault();
      e.stopPropagation();
      toggleChildMenu(`mobile-${submenu.id}`);
    }
    // Navigation will be handled by the Link component with the updated URL
  };

  const handleChildSubmenuClick = (childSubmenu, parentMenuId, subMenuId) => {
    // Close mobile menu when child submenu item is clicked
    closeMobileMenu();
  };

  const isLastNavItem = (index, items) => {
    return index === items.length - 1;
  };

  // Convert API menu data to our component format - PRESERVE ORIGINAL IDs
  const convertApiMenuToNavItems = (apiMenus) => {
    if (!apiMenus || !Array.isArray(apiMenus)) return [];
    
    return apiMenus.map(menu => ({
      id: menu.id.toString(),
      originalId: menu.id, // Keep original ID
      title: menu.name,
      path: getPathFromMenuName(menu.name),
      // Store the original children structure to preserve IDs
      originalChildren: menu.children,
      submenus: menu.children && menu.children.length > 0 ? 
        menu.children.map(child => ({
          id: child.id.toString(),
          originalId: child.id, // Keep original ID
          title: child.name,
          path: getPathFromMenuName(child.name),
          originalChildren: child.children,
          children: child.children, // Keep children for checking
          childSubmenus: child.children && child.children.length > 0 ? 
            child.children.map(grandChild => ({
              id: grandChild.id.toString(),
              originalId: grandChild.id, // Keep original ID
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

  // Use API menu data if available, otherwise use static data (fallback)
  const navItems = menuData?.data?.menus ? 
    convertApiMenuToNavItems(menuData.data.menus) : 
    []; // You can keep your static data as fallback if needed

  // Use header courses for the mobile menu
  const mobileCourses = headerData?.data?.others?.slice(0, 5) || courses;

  // Loading state
  const isLoading = menuData?.isFetching || headerData?.isFetching;

  return (
    <div className="w-full bg-[#001F51] px-4 lg:px-[48px] relative quick-links-bar">
      {/* Desktop Menu */}
      <div className="hidden lg:flex w-full items-center justify-center">
        {isLoading ? (
          // Desktop menu skeleton
          [...Array(8)].map((_, index) => (
            <div key={index} className="relative animate-pulse">
              <div className="flex items-center gap-2 text-[12px] font-[500] px-3 py-4">
                <div className="h-4 bg-gray-600 rounded w-16"></div>
                <div className="h-3 w-3 bg-gray-500 rounded-full"></div>
              </div>
            </div>
          ))
        ) : navItems?.length > 0 ? (
          navItems.map((item, index) => (
            <div
              key={item.id}
              className="relative"
              onMouseEnter={() => handleDesktopHover(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <Link
                to={handleMenuClick(item?.path, item.originalId)}
                className={`cursor-pointer flex items-center gap-2 text-[12px] font-[500] px-3 py-4 text-white ${
                  isActive(item?.path) ? "bg-[#07739445]" : "bg-transparent"
                } hover:bg-[#07739445] transition-colors duration-200`}
              >
                {item?.title ?? ""}
                {/* Only show chevron if submenus exist AND parent menu ID is not 1 */}
                {item?.submenus && shouldShowSubmenus(item.originalId) && (
                  <img
                    src={ChevronDown}
                    alt="chevron down"
                    className="h-[10px] w-[10px] object-contain"
                  />
                )}
              </Link>

              {/* Desktop Submenus Dropdown - Only show if parent menu ID is not 1 */}
              {item?.submenus && hoveredItem === item.id && shouldShowSubmenus(item.originalId) && (
                <div
                  className={`absolute top-full bg-white shadow-xl min-w-[280px] z-50 rounded-b-md max-h-[500px] overflow-y-auto custom-scrollbar border-b-3 border-[#2F8AA5] ${
                    isLastNavItem(index, navItems) ? "right-0" : "left-0"
                  }`}
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  {item.submenus.map((submenu) => (
                    <div
                      key={submenu.id}
                      className="border-b border-gray-200 last:border-b-0"
                    >
                      <div className="flex items-center justify-between hover:bg-gray-50 transition-colors">
                        <Link
                          to={handleMenuClick(submenu.path, item.originalId, submenu.originalId)}
                          className="flex-1 px-4 py-3 text-gray-800 hover:text-blue-600 text-sm font-[400]"
                          onClick={(e) => handleSubmenuClick(e, submenu, item.originalId)}
                        >
                          {submenu.title}
                        </Link>

                        {submenu.childSubmenus && (
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              toggleChildMenu(submenu.id);
                            }}
                            className="px-3 py-3 text-gray-500 hover:text-gray-700 transition-colors cursor-pointer"
                          >
                            <img
                              src={ChevronDownDark}
                              alt="toggle child menu"
                              className={`h-[12px] w-[12px] object-contain transform ${
                                openChildMenus[submenu.id] ? "rotate-180" : ""
                              } transition-transform duration-200`}
                            />
                          </button>
                        )}
                      </div>

                      {submenu.childSubmenus && openChildMenus[submenu.id] && (
                        <div className="bg-white border-t border-gray-200">
                          <div className="px-2 py-2">
                            {submenu.childSubmenus.map((childSubmenu) => (
                              <Link
                                key={childSubmenu.id}
                                to={handleMenuClick(childSubmenu.path, item.originalId, submenu.originalId, childSubmenu.originalId)}
                                className="block px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded text-sm transition-colors duration-200 mb-1 last:mb-0 border-b border-gray-100 last:border-b-0"
                                onClick={() => handleChildSubmenuClick(childSubmenu, item.originalId, submenu.originalId)}
                              >
                                {childSubmenu.title}
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        ) : (
          // Fallback if no data
          <div className="text-white text-sm py-4">No menu data available</div>
        )}
      </div>

      {/* Mobile Menu Header */}
      <div className="lg:hidden flex items-center justify-start gap-3 py-2">
        <button onClick={toggleMobileMenu} className="">
          <img src={MenuIcon} alt="menu" className="h-4 w-4 object-contain" />
        </button>
        <div className="text-white font-[500] text-[14px]">Menu</div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-lg z-50 max-h-[80vh] overflow-y-auto custom-scrollbar border-t border-[#2F8AA5]">
          <div className="p-4 w-full flex flex-col items-start">
            {/* Courses in mobile menu */}
            {isLoading ? (
              <div className="flex gap-2 items-center z-90 mb-2 animate-pulse">
                {[...Array(5)].map((_, index) => (
                  <div
                    key={index}
                    className="h-8 w-12 bg-gray-200 rounded-full"
                  ></div>
                ))}
              </div>
            ) : (
              <div className="flex gap-2 items-center z-90 mb-2">
                {mobileCourses.map((course, index) => (
                  <button
                    key={index}
                    className="cursor-pointer text-white h-fit text-[12px] font-[500] px-4 py-2 rounded-full"
                    style={{ 
                      backgroundColor: course.bgColor || 
                      (headerData?.data?.others?.[index] ? 
                        ["#5F52B7", "#138ED2", "#002147", "#093D81", "#000000"][index] || "#5F52B7" 
                        : "#5F52B7") 
                    }}
                  >
                    {course.name || course.title || `Course ${index + 1}`}
                  </button>
                ))}
              </div>
            )}

            {/* Mobile menu items */}
            {isLoading ? (
              // Mobile menu skeleton
              [...Array(6)].map((_, index) => (
                <div key={index} className="w-full border-b border-gray-200 last:border-b-0 py-3 animate-pulse">
                  <div className="flex items-center justify-between">
                    <div className="h-5 bg-gray-200 rounded w-32"></div>
                    <div className="h-4 w-4 bg-gray-200 rounded-full"></div>
                  </div>
                </div>
              ))
            ) : navItems?.length > 0 ? (
              navItems?.map((item) => (
                <div
                  key={item.id}
                  className="w-full border-b border-gray-200 last:border-b-0"
                >
                  {/* Main Mobile Menu Item */}
                  <div className="flex items-center justify-between py-2">
                    <Link
                      to={handleMenuClick(item.path, item.originalId)}
                      className={`flex-1 text-gray-800 text-base font-medium ${
                        isActive(item.path) ? "text-blue-600" : ""
                      }`}
                      onClick={closeMobileMenu}
                    >
                      {item?.title ?? ""}
                    </Link>

                    {/* Only show toggle button if submenus exist AND parent menu ID is not 1 */}
                    {item?.submenus && shouldShowSubmenus(item.originalId) && (
                      <button
                        onClick={() => toggleMobileSubmenu(item.id)}
                        className="text-gray-500"
                      >
                        <img
                          src={ChevronDownDark}
                          alt="toggle menu"
                          className={`h-4 w-4 object-contain transform ${
                            mobileOpenSubmenus[item.id] ? "rotate-180" : ""
                          } transition-transform duration-200`}
                        />
                      </button>
                    )}
                  </div>

                  {/* Mobile Submenus - Only show if parent menu ID is not 1 */}
                  {item.submenus && mobileOpenSubmenus[item.id] && shouldShowSubmenus(item.originalId) && (
                    <div className="bg-white rounded-lg p-2 pt-0 mb-2">
                      {item.submenus.map((submenu) => (
                        <div
                          key={submenu.id}
                          className="border-b border-gray-200 last:border-b-0"
                        >
                          {/* Submenu Item */}
                          <div className="flex items-center justify-between py-2">
                            <Link
                              to={handleMenuClick(submenu.path, item.originalId, submenu.originalId)}
                              className="flex-1 text-gray-700 text-sm"
                              onClick={(e) => {
                                handleMobileSubmenuClick(e, submenu, item.originalId);
                                if (!submenu.children || submenu.children.length === 0) {
                                  closeMobileMenu();
                                }
                              }}
                            >
                              {submenu.title}
                            </Link>

                            {submenu.childSubmenus && (
                              <button
                                onClick={() =>
                                  toggleChildMenu(`mobile-${submenu.id}`)
                                }
                                className="text-gray-400"
                              >
                                <img
                                  src={ChevronDownDark}
                                  alt="toggle submenu"
                                  className={`h-3 w-3 object-contain transform ${
                                    openChildMenus[`mobile-${submenu.id}`]
                                      ? "rotate-180"
                                      : ""
                                  } transition-transform duration-200`}
                                />
                              </button>
                            )}
                          </div>

                          {/* Mobile Child Submenus */}
                          {submenu.childSubmenus &&
                            openChildMenus[`mobile-${submenu.id}`] && (
                              <div className="bg-white rounded">
                                {submenu.childSubmenus.map((childSubmenu) => (
                                  <Link
                                    key={childSubmenu.id}
                                    to={handleMenuClick(childSubmenu.path, item.originalId, submenu.originalId, childSubmenu.originalId)}
                                    className="block p-2 text-gray-600 text-[14px] border-b border-gray-100 last:border-b-0"
                                    onClick={() => handleChildSubmenuClick(childSubmenu, item.originalId, submenu.originalId)}
                                  >
                                    {childSubmenu.title}
                                  </Link>
                                ))}
                              </div>
                            )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="text-gray-500 text-sm py-4">No menu items available</div>
            )}
          </div>
        </div>
      )}

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-bottom-right-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #2F8AA5;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #25677bff;
        }
        .custom-scrollbar::-webkit-scrollbar-button {
          display: none;
        }
      `}</style>
    </div>
  );
};