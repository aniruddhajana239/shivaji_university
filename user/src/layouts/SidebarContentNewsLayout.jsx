import { useState, useMemo, useCallback, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LeftSidebarNavigation } from "../components/navigation/LeftSidebarNavigation";
import { RightSidebarNavigation } from "../components/navigation/RightSidebarNavigation";
import { SimpleBreadCrumb } from "../components/breadcrumb/SimpleBreadCrumb";

// Layout Components (your existing imports)
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
  "pdf_list": PDFList,
  "simple-table": SimpleTable,
  "multiple-table": MultipleTable,
  "multiple-file-table": MultipleFileTable,
  "bullet-list": CommonBulletList,
  "paragraph-image": HistoryComposite,
  "mixed-composite": MixedComposite,
  "collapsable-image-grid": CollapsableImageGrid,
  "governance-contact-composite": GovernanceContactComposite,
  "paragraph": NccComposite,
  "studentlogin": StudentLoginComposite,
  "multiple-list-cards": MultipleListsCards,
  "form-composite": FormComposite
};

export const SidebarContentNewsLayout = ({ 
  navItems, 
  parentPath, 
  title, 
  contentList, 
  contentId 
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activePath, setActivePath] = useState(location.pathname);

  // Function to find contentId from current path
  const findContentIdFromPath = useCallback((path) => {
    console.log("🔍 Finding contentId for path:", path);
    
    // First, check if this path matches any sidebar item directly
    const sidebarItem = navItems.find(item => item.path === path);
    if (sidebarItem) {
      console.log("✅ Found sidebar item with path:", sidebarItem.id);
      return sidebarItem.id; // Use sidebar item ID as content_id
    }
    
    // If not found in sidebar, check in navigation structure
    for (const navItem of navItems) {
      if (navItem.submenus) {
        for (const submenu of navItem.submenus) {
          if (submenu.path === path && submenu.content_id) {
            console.log("✅ Found contentId in submenu:", submenu.content_id);
            return submenu.content_id;
          }
          if (submenu.childSubmenus) {
            for (const child of submenu.childSubmenus) {
              if (child.path === path && child.content_id) {
                console.log("✅ Found contentId in child submenu:", child.content_id);
                return child.content_id;
              }
            }
          }
        }
      }
    }
    
    console.log("❌ No contentId found for path:", path);
    return null;
  }, [navItems]);

  // Function to find content by contentId
  const findContentByContentId = useCallback((contentId) => {
    if (!contentId) return null;
    
    const foundContent = contentList.find(item => 
      item.id === contentId || item.content_id === contentId
    );
    
    if (foundContent) {
      console.log("📄 Found content:", foundContent.title);
    } else {
      console.log("❌ No content found for contentId:", contentId);
    }
    
    return foundContent;
  }, [contentList]);

  // Find the correct content based on current path
  const content = useMemo(() => {
    console.log("🎯 Looking for content for path:", location.pathname);
    
    // Find contentId from current path
    const pathBasedContentId = findContentIdFromPath(location.pathname);
    
    if (pathBasedContentId) {
      const foundContent = findContentByContentId(pathBasedContentId);
      if (foundContent) {
        console.log("✅ Found content by path:", foundContent.title);
        return foundContent;
      }
    }
    
    // Fallback: If contentId is provided via props, use it
    if (contentId) {
      const foundContent = findContentByContentId(contentId);
      if (foundContent) {
        console.log("✅ Found content by contentId prop:", foundContent.title);
        return foundContent;
      }
    }
    
    // Final fallback: Use first content
    const firstContent = contentList[0];
    if (firstContent) {
      console.log("🔄 Using first content as fallback:", firstContent.title);
    } else {
      console.log("❌ No content available");
    }
    return firstContent;
  }, [contentList, contentId, location.pathname, findContentIdFromPath, findContentByContentId]);

  // Find active nav item based on current path
  const activeNavItem = useMemo(() => {
    // Find the sidebar item that matches the current path
    const foundItem = navItems.find(item => item.path === activePath);
    
    if (foundItem) {
      console.log("📊 Found active nav item by path:", foundItem.itemText);
      return foundItem;
    }
    
    console.log("📊 No matching nav item found for path:", activePath);
    return navItems[0] || {};
  }, [navItems, activePath]);

  // Set active path when location changes
  useEffect(() => {
    console.log("📍 Location changed, setting active path:", location.pathname);
    setActivePath(location.pathname);
  }, [location.pathname]);

  // Handle sidebar item click - DIRECT PATH NAVIGATION
  const handleSidebarClick = useCallback((path) => {
    console.log("🖱️ Sidebar clicked, navigating to path:", path);
    
    if (path) {
      setActivePath(path);
      navigate(path);
    } else {
      console.log("❌ No path provided for navigation");
    }
  }, [navigate]);

  // Debug useEffect to see what's happening
  useEffect(() => {
    console.log("=== 🐛 DEBUG INFO ===");
    console.log("📍 Current location:", location.pathname);
    console.log("🎯 Active Path:", activePath);
    console.log("📄 Content:", content?.title);
    console.log("📋 NavItems count:", navItems?.length);
    console.log("📚 ContentList count:", contentList?.length);
    console.log("====================");
  }, [location.pathname, activePath, content, navItems, contentList]);

  const renderLayout = () => {
    if (!content) {
      return (
        <div className="text-center py-8">
          <p className="text-gray-500">No content available for this section.</p>
        </div>
      );
    }
    
    const Component = layoutComponents[content.layout_type];
    
    if (!Component) {
      return (
        <div className="text-center py-8">
          <p className="text-gray-500">Content type not supported: {content.layout_type}</p>
        </div>
      );
    }

    const additionalProps = {};
    if (content.layout_type === "simple-table") {
      additionalProps.autoWidth = content?.isAutoWidth;
      additionalProps.isWrappableHeader = content?.wrappable;
    }

    return (
      <Component 
        title={content.title} 
        content={content} 
        viewable={content?.viewable ?? false}
        downloadble={content?.downloadble ?? false}
        searchable={content?.searchable ?? false}
        {...additionalProps}
      />
    );
  };

  return (
    <div className="w-full bg-white px-6 lg:px-12 py-8 flex flex-col lg:flex-row gap-6">
      {/* Left Sidebar */}
      <div className="w-full lg:w-1/5">
        <LeftSidebarNavigation
          title="Related Pages"
          navItems={navItems}
          activePath={activePath}
          handleClick={handleSidebarClick}
        />
      </div>

      {/* Main Content */}
      <div className="w-full lg:w-3/5 flex flex-col gap-4">
        <SimpleBreadCrumb 
          parent={{ title: title, path: parentPath }}
          current={content?.title || ""}
        />
        {renderLayout()}
      </div>

      {/* Right Sidebar */}
      <div className="w-full lg:w-1/4">
        <RightSidebarNavigation
          title="Updates/News"
          listItems={activeNavItem?.updates || []}
        />
      </div>
    </div>
  );
};