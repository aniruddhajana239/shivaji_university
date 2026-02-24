import ChevronRight from "../../assets/icons/chevron_right_dark.png";
import { useNavigate, useLocation } from "react-router-dom";

export const LeftSidebarNavigation = ({ activePath, handleClick, title, navItems, courses, serviceItems }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Detect which course/service is currently active from URL
  const currentMenuId = (() => {
    const params = new URLSearchParams(location.search);
    const id = params.get('menu_id');
    return id && id !== 'undefined' ? id : null;
  })();

  // Handle item click - pass both path and menuId
  const handleItemClick = (item) => {
    if (item?.path && item?.originalId) {
      const params = new URLSearchParams();
      params.set('menu_id', item.originalId);
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
      handleClick(item.path);
    }
  };

  // Generate URL path from name — same logic as QuickLinksBar
  const getPathFromName = (name) => {
    if (!name) return '/';
    return `/${name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`;
  };

  // Shared smart navigation for home_header courses and home_box services
  const handleSmartClick = (item) => {
    if (item?.extend_to === true) {
      const path = getPathFromName(item?.name);
      navigate(`${path}?menu_id=${item?.id}`);
    } else if (item?.external_link && item.external_link !== "") {
      window.open(item.external_link, '_blank', 'noopener,noreferrer');
    } else if (item?.file && item.file !== "") {
      window.open(item.file, '_blank', 'noopener,noreferrer');
    }
  };

  const hasCourses = courses && Array.isArray(courses) && courses.length > 0;
  const hasServiceItems = serviceItems && Array.isArray(serviceItems) && serviceItems.length > 0;
  const hasPortalItems = portalItems && Array.isArray(portalItems) && portalItems.length > 0;
  const hasNavItems = navItems && navItems.length > 0;

  // Reusable active-item list renderer for courses/services
  const renderSmartList = (items) =>
    items.map((item) => {
      const isActive = !!currentMenuId && String(item?.id) === currentMenuId;
      return (
        <li
          key={item?.id}
          onClick={() => handleSmartClick(item)}
          className={`cursor-pointer w-full text-left flex-shrink-0 text-[14px] py-1 rounded-[10px] flex items-center gap-1
            ${isActive ? 'font-[600] text-[#001F51]' : 'font-[400] text-[#000000]'}`}
        >
          {isActive && (
            <div className="w-5 h-5 rounded-full bg-[#C0F0FF] flex justify-center items-center flex-shrink-0">
              <img src={ChevronRight} alt="chevron right" className="h-2.5 w-2.5 object-contain" />
            </div>
          )}
          {item?.name ?? ""}
        </li>
      );
    });

  return (
    <div className="w-full flex flex-col gap-4 rounded-[20px]">

      {/* Courses Section (home_header) */}
      {hasCourses && (
        <div className="w-full flex flex-col gap-3 p-4 rounded-[20px] bg-[#EDFAFE]">
          <h3 className="m-0 p-0 text-[#001F51] text-[18px] font-[600]">Courses</h3>
          <ul className="w-full flex flex-col gap-1">
            {renderSmartList(courses)}
          </ul>
        </div>
      )}

      {/* University Services Section (home_box) */}
      {hasServiceItems && (
        <div className="w-full flex flex-col gap-3 p-4 rounded-[20px] bg-[#EDFAFE]">
          <h3 className="m-0 p-0 text-[#001F51] text-[18px] font-[600]">University Services</h3>
          <ul className="w-full flex flex-col gap-1">
            {renderSmartList(serviceItems)}
          </ul>
        </div>
      )}

      {/* University Portal Section (home_university_portal) */}
      {hasPortalItems && (
        <div className="w-full flex flex-col gap-3 p-4 rounded-[20px] bg-[#EDFAFE]">
          <h3 className="m-0 p-0 text-[#001F51] text-[18px] font-[600]">University Portal</h3>
          <ul className="w-full flex flex-col gap-1">
            {renderSmartList(portalItems)}
          </ul>
        </div>
      )}

      {/* Related Pages Section — only shown when there are items */}
      {hasNavItems && (
        <div className="w-full flex flex-col gap-3 p-4 rounded-[20px] bg-[#EEFBFF]">
          <h3 className="m-0 p-0 text-[#001F51] text-[18px] font-[600]">{title ?? ""}</h3>
          <ul className="w-full flex flex-col gap-1">
            {navItems.map((item) => {
              const isActive = activePath === item?.path;
              return (
                <li
                  key={item?.id || item?.originalId}
                  onClick={() => handleItemClick(item)}
                  className={`cursor-pointer w-full text-left flex-shrink-0 text-[#000000] text-[14px] py-1 rounded-[10px]
                    ${isActive ? 'font-[600] flex items-center gap-1' : 'font-[400]'}`}
                >
                  {isActive && (
                    <div className="w-5 h-5 rounded-full bg-[#C0F0FF] flex justify-center items-center flex-shrink-0">
                      <img src={ChevronRight} alt="chevron right" className="h-2.5 w-2.5 object-contain" />
                    </div>
                  )}
                  {item?.itemText || item?.title || `Menu ${item?.id}`}
                </li>
              );
            })}
          </ul>
        </div>
      )}

    </div>
  );
};