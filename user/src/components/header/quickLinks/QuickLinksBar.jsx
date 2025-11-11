import { useState } from "react";
import ChevronDown from "../../../assets/icons/chevron_down_small.png";
import ChevronDownDark from "../../../assets/icons/chevron_down.png";
import MenuIcon from "../../../assets/icons/menu.png";
import { Link, useLocation } from "react-router-dom";
import { navItems } from "../../../constants/NavItems";

const courses = [
  { name: "UG", bgColor: "#5F52B7" },
  { name: "PG", bgColor: "#138ED2" },
  { name: "P.H.D", bgColor: "#002147" },
  { name: "Online", bgColor: "#093D81" },
  { name: "Distance", bgColor: "#000000" }
];

export const QuickLinksBar = () => {
  const location = useLocation();
  const [hoveredItem, setHoveredItem] = useState(null);
  const [openChildMenus, setOpenChildMenus] = useState({});
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileOpenSubmenus, setMobileOpenSubmenus] = useState({});

  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.includes(path);
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

  const handleSubmenuClick = (e, submenu) => {
    // If submenu has child menus, prevent navigation and only toggle
    if (submenu.childSubmenus) {
      e.preventDefault();
      e.stopPropagation();
      toggleChildMenu(submenu.id);
    }
  };

  const handleMobileSubmenuClick = (e, submenu) => {
    // If submenu has child menus, prevent navigation and only toggle
    if (submenu.childSubmenus) {
      e.preventDefault();
      e.stopPropagation();
      toggleChildMenu(`mobile-${submenu.id}`);
    } else {
      // If no child menus, close the mobile menu
      closeMobileMenu();
    }
  };

  const handleChildSubmenuClick = () => {
    // Close mobile menu when child submenu item is clicked
    closeMobileMenu();
  };

  const isLastNavItem = (index) => {
    return index === navItems.length - 1;
  };

  return (
    <div className="w-full bg-[#001F51] px-4 lg:px-[48px] relative">
      {/* Desktop Menu */}
      <div className="hidden lg:flex w-full items-center justify-center">
        {navItems?.map((item, index) => (
          <div
            key={item.id}
            className="relative"
            onMouseEnter={() => handleDesktopHover(item.id)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <Link
              to={item?.path}
              className={`cursor-pointer flex items-center gap-2 text-[12px] font-[500] px-3 py-4 text-white ${
                isActive(item?.path) ? "bg-[#07739445]" : "bg-transparent"
              } hover:bg-[#07739445] transition-colors duration-200`}
            >
              {item?.title ?? ""}
              {item?.submenus && (
                <img
                  src={ChevronDown}
                  alt="chevron down"
                  className="h-[10px] w-[10px] object-contain"
                />
              )}
            </Link>

            {/* Desktop Submenus Dropdown */}
            {item?.submenus && hoveredItem === item.id && (
              <div
                className={`absolute top-full bg-white shadow-xl min-w-[280px] z-50 rounded-b-md max-h-[500px] overflow-y-auto custom-scrollbar border-b-3 border-[#2F8AA5] ${
                  isLastNavItem(index) ? "right-0" : "left-0"
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
                        to={submenu.path}
                        className="flex-1 px-4 py-3 text-gray-800 hover:text-blue-600 text-sm font-[400]"
                        onClick={(e) => handleSubmenuClick(e, submenu)}
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
                              to={childSubmenu.path}
                              className="block px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded text-sm transition-colors duration-200 mb-1 last:mb-0 border-b border-gray-100 last:border-b-0"
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
        ))}
      </div>

      {/* Mobile Menu */}
      <div className="lg:hidden flex items-center justify-start gap-3 py-2">
        <button onClick={toggleMobileMenu} className="">
          <img src={MenuIcon} alt="menu" className="h-4 w-4 object-contain " />
        </button>
        <div className="text-white font-[500] text-[14px]">Menu</div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-lg z-50 max-h-[80vh] overflow-y-auto custom-scrollbar border-t border-[#2F8AA5]">
          <div className="p-4 w-full flex flex-col items-start">
            <div className="flex gap-2 items-center z-90 mb-2">
              {courses.map((course, index) => (
                <button
                  key={index}
                  className="cursor-pointer text-white h-fit text-[12px] font-[500] px-4 py-2 rounded-full"
                  style={{ backgroundColor: course.bgColor }}
                >
                  {course.name}
                </button>
              ))}
            </div>
            {navItems?.map((item) => (
              <div
                key={item.id}
                className="w-full border-b border-gray-200 last:border-b-0"
              >
                {/* Main Mobile Menu Item */}
                <div className="flex items-center justify-between py-2">
                  <Link
                    to={item.path}
                    className={`flex-1 text-gray-800 text-base font-medium ${
                      isActive(item.path) ? "text-blue-600" : ""
                    }`}
                    onClick={closeMobileMenu}
                  >
                    {item?.title ?? ""}
                  </Link>

                  {item?.submenus && (
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

                {/* Mobile Submenus */}
                {item.submenus && mobileOpenSubmenus[item.id] && (
                  <div className="bg-white rounded-lg p-2 pt-0 mb-2">
                    {item.submenus.map((submenu) => (
                      <div
                        key={submenu.id}
                        className="border-b border-gray-200 last:border-b-0"
                      >
                        {/* Submenu Item */}
                        <div className="flex items-center justify-between py-2">
                          <Link
                            to={submenu.path}
                            className="flex-1 text-gray-700 text-sm "
                            onClick={(e) => handleMobileSubmenuClick(e, submenu)}
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
                            <div className="bg-white rounded ">
                              {submenu.childSubmenus.map((childSubmenu) => (
                                <Link
                                  key={childSubmenu.id}
                                  to={childSubmenu.path}
                                  className="block p-2 text-gray-600 text-[14px] border-b border-gray-100 last:border-b-0"
                                  onClick={handleChildSubmenuClick}
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
            ))}
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