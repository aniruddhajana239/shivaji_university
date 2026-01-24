import { useState, useEffect, useCallback, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { LeftSidebarNavigation } from "../components/navigation/LeftSidebarNavigation";
import { RightSidebarNavigation } from "../components/navigation/RightSidebarNavigation";
import { SimpleBreadCrumb } from "../components/breadcrumb/SimpleBreadCrumb";
import { ContentApi } from "../api/content/ContentApi";
import RippleLoader from "../components/loaders/RippleLoader";
import { menusSelector } from "../redux/selectors/settings/MenuList";

// Layout Components
import { FormalComposite } from "../blocks/composite/FormalComposite";
import { PersonalFigure } from "../blocks/single/PersonalFigure";
import { ImageGrid } from "../blocks/grid/ImageGrid";
import NewsPaperComposite from "../blocks/composite/NewsPaperComposite";
import CityComposite from "../blocks/composite/CityComposite";
import ContactComposite from "../blocks/composite/ContactComposite";
import { FileListTable } from "../blocks/table/FileListTable";
import { Comment } from "../blocks/single/Comment";
import { PDFList } from "../blocks/lists/PDFLists";
import { SimpleTable } from "../blocks/table/SimpleTable";
import { MultipleTable } from "../blocks/table/MultipleTable";
import { CommonBulletList } from "../blocks/lists/CommonBulletList";
import HistoryComposite from "../blocks/composite/HistoryComposite";
import CollapsableImageGrid from "../blocks/grid/CollapsableImageGrid";
import GovernanceContactComposite from "../blocks/composite/GovernanceContactComposite";
import NccComposite from "../blocks/composite/NccComposite";
import StudentLoginComposite from "../blocks/composite/StudentLoginComposite";
import { MultipleFileTable } from "../blocks/table/MultipleFileTable";
import { MultipleListsCards } from "../blocks/cards/MultipleListsCards";
import { MixedComposite } from "../blocks/composite/MixedComposite";
import { FormComposite } from "../blocks/composite/FormComposite";

const layoutComponents = {
  "formal-composite": FormalComposite,
  "personal-figured": PersonalFigure,
  "image-grid": ImageGrid,
  "news-composite": NewsPaperComposite,
  "city-composite": CityComposite,
  "contact-composite": ContactComposite,
  "searchbar-table": FileListTable,
  "comment": Comment,
  "pdf-list": PDFList,
  "simple-table": SimpleTable,
  "multiple-table": MultipleTable,
  "multiple-file-table": MultipleFileTable,
  "bullet-list": CommonBulletList,
  "paragraph-image": HistoryComposite,
  "mixed-composite": MixedComposite,
  "collapsable-image-grid": CollapsableImageGrid,
  "governance-contact-composite": GovernanceContactComposite,
  "paragraph": NccComposite,
  "login": StudentLoginComposite,
  "multiple-list-cards": MultipleListsCards,
  "form-composite": FormComposite
};

// Helper function to flatten all menus into a single array
const flattenAllMenus = (apiMenus) => {
  if (!apiMenus || !Array.isArray(apiMenus)) return [];

  const allItems = [];

  apiMenus.forEach(menu => {
    // Add parent menu
    // allItems.push({
    //   id: menu.id.toString(),
    //   originalId: menu.id,
    //   title: menu.name,
    //   path: getPathFromMenuName(menu.name),
    //   type: 'parent'
    // });

    // Add submenus
    if (menu.children && menu.children.length > 0) {
      menu.children.forEach(child => {
        allItems.push({
          id: child.id.toString(),
          originalId: child.id,
          title: child.name,
          path: getPathFromMenuName(child.name),
          parentId: menu.id,
          type: 'submenu'
        });

        // Add child submenus
        if (child.children && child.children.length > 0) {
          child.children.forEach(grandChild => {
            allItems.push({
              id: grandChild.id.toString(),
              originalId: grandChild.id,
              title: grandChild.name,
              path: getPathFromMenuName(grandChild.name),
              parentId: child.id,
              grandParentId: menu.id,
              type: 'child'
            });
          });
        }
      });
    }
  });

  return allItems;
};

// Helper function to generate path from menu name
const getPathFromMenuName = (name) => {
  if (name === "Home") return "/";
  return `/${name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`;
};

export const SidebarContentNewsLayout = ({
  navItems,
  parentPath,
  title,
  contentId
}) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Get menu data from Redux
  const menuData = useSelector(menusSelector);

  const [activePath, setActivePath] = useState(location.pathname);
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Flatten all menus into single array for left sidebar
  // const allMenuItems = useMemo(() => {
  //   if (!menuData?.data?.menus) return [];
  //   return flattenAllMenus(menuData.data.menus);
  // }, [menuData?.data?.menus]);

  // Get parent_menu_id from URL params
  const getParentMenuIdFromUrl = useCallback(() => {
    if (location.search) {
      const params = new URLSearchParams(location.search);
      const parentMenuId = params.get('parent_menu_id');
      if (parentMenuId) {
        console.log("🔍 Found parent_menu_id in URL:", parentMenuId);
        return parseInt(parentMenuId);
      }
    }
    return null;
  }, [location.search]);

  // Get filtered menu items based on parent_menu_id
  const filteredMenuItems = useMemo(() => {
    const parentMenuId = getParentMenuIdFromUrl();

    if (!menuData?.data?.menus) return [];

    if (!parentMenuId) {
      // If no parent_menu_id, return all items
      return flattenAllMenus(menuData.data.menus);
    }

    // Find the specific parent menu
    const parentMenu = menuData.data.menus.find(menu => menu.id === parentMenuId);
    if (!parentMenu) return [];

    // Only return items under this parent
    return flattenAllMenus([parentMenu]);

  }, [menuData?.data?.menus, getParentMenuIdFromUrl]);

  // console.log("📋 Flattened menu items for sidebar:", allMenuItems.length);

  // Function to get menu ID from URL or props
  const getMenuId = useCallback(() => {

    // Try to get from URL query parameters first
    if (location.search) {
      const params = new URLSearchParams(location.search);
      const menuId = params.get('menu_id') ||
        params.get('child_sub_menu_id') ||
        params.get('sub_menu_id') ||
        params.get('parent_menu_id');

      if (menuId) {
        console.log("✅ Found menu ID in URL:", menuId);
        return parseInt(menuId);
      }
    }

    // If no URL params, try to find from navItems by path
    if (navItems && navItems.length > 0) {
      const cleanPath = location.pathname.split('?')[0];
      console.log("🔍 Looking for menu in navItems for path:", cleanPath);

      // Check main items
      const mainItem = navItems.find(item => item.path === cleanPath);
      if (mainItem && mainItem.originalId) {
        console.log("✅ Found menu ID in main navItems:", mainItem.originalId);
        return mainItem.originalId;
      }

      // Check submenus
      for (const item of navItems) {
        if (item.submenus) {
          const submenu = item.submenus.find(sub => sub.path === cleanPath);
          if (submenu && submenu.originalId) {
            console.log("✅ Found menu ID in submenu:", submenu.originalId);
            return submenu.originalId;
          }

          // Check child submenus
          for (const sub of item.submenus) {
            if (sub.childSubmenus) {
              const child = sub.childSubmenus.find(ch => ch.path === cleanPath);
              if (child && child.originalId) {
                console.log("✅ Found menu ID in child submenu:", child.originalId);
                return child.originalId;
              }
            }
          }
        }
      }
    }

    // Last resort: use contentId from props
    if (contentId) {
      console.log("✅ Using contentId from props:", contentId);
      return parseInt(contentId);
    }

    console.log("❌ Could not find any menu ID");
    return null;
  }, [location.pathname, location.search, navItems, contentId]);

  // Fetch content
  const fetchContent = useCallback(async () => {
    const menuId = getMenuId();

    console.log("📡 Fetching content for menuId:", menuId);

    if (!menuId) {
      console.log("❌ No menu ID, skipping fetch");
      setError("No menu ID found");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
  const response = await ContentApi.getContentDetails({ menu_id: menuId });

  console.log("✅ API Response title:", response?.data?.data?.menu_title);

  if (response?.data?.data) {
    const apiData = response.data.data;

    // clone object safely
    const clonedData = { ...apiData };

    // extract values BEFORE deletion
    const title = clonedData.menu_title;
    const layoutType = clonedData.layout;

    // remove unwanted keys
    delete clonedData.menu_title;
    delete clonedData.layout_type;

    setContent({
      layout_type: layoutType,
      title: title,
      data: clonedData,
    });
  } else {
    setError("No data received from API");
  }
} catch (err) {
  console.error("❌ API Error:", err);
  setError(err.message || "Failed to fetch content");
} finally {
  setLoading(false);
}

  }, [getMenuId, title]);

  // Fetch content on mount and when dependencies change
  useEffect(() => {
    console.log("🔄 useEffect triggered");
    fetchContent();
  }, [fetchContent]);

  // Update active path
  useEffect(() => {
    setActivePath(location.pathname);
  }, [location.pathname]);

  // Handle sidebar click
  const handleSidebarClick = useCallback((path, menuId = null) => {
    console.log("🖱️ Sidebar click:", path, menuId);

    if (menuId) {
      // Simple query parameter approach
      navigate(`${path}?menu_id=${menuId}`);
    } else {
      navigate(path);
    }
  }, [navigate]);

  // Loading component
  const renderLoading = () => (
    <div className="flex justify-center items-center min-h-[400px]">
      <RippleLoader />
    </div>
  );

  // Error component
  const renderError = () => (
    <div className="text-center py-8">
      <p className="text-red-500 font-semibold">Error loading content</p>
      <p className="text-gray-500 mt-2">{error}</p>
      <button
        onClick={() => window.location.reload()}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Retry
      </button>
    </div>
  );


  // Main content render
  const renderContent = () => {
    if (loading) return renderLoading();
    // if (error) return renderError();
    if (!content) return <div className="text-center py-8">No content available</div>;

    const Component = layoutComponents[content.layout_type];
    if (!Component) {
      return (
        <div className="text-center py-8">
          <p className="text-gray-500">! Content Available</p>
        </div>
      );
    }


    return (
      <Component
        title={content?.title}
        downloadble={content?.layout_type==="searchbar-table"}
        content={(({ layout, ...rest }) => rest)(content?.data || {})}
        data={content.data}
      />
    );
  };

  useEffect(() => {
    console?.log?.("📋 SidebarContentNewsLayout content:", content);
  }, [content]);

  return (
    <div className="w-full bg-white px-6 lg:px-12 py-8 flex flex-col lg:flex-row gap-6">


      {/* Left Sidebar - Use flattened allMenuItems instead of navItems */}
      <div className="w-full lg:w-1/5">
        <LeftSidebarNavigation
          title="Related Pages"
          navItems={filteredMenuItems} // Use filtered items
          activePath={activePath}
          handleClick={handleSidebarClick}
        />
      </div>

      {/* Main Content */}
      <div className="w-full lg:w-3/5 flex flex-col gap-4">
      {content&& <SimpleBreadCrumb
          parent={{ title: title, path: parentPath }}
          current={content?.title || "Untitled Page"}
        />}
        {renderContent()}
      </div>

      {/* Right Sidebar */}
      <div className="w-full lg:w-1/4">
        <RightSidebarNavigation
          title="Updates/News"
          listItems={[]}
        />
      </div>
    </div>
  );
};