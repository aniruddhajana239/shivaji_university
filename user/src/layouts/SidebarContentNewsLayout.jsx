import { useState, useMemo, useCallback } from "react";
import { LeftSidebarNavigation } from "../components/navigation/LeftSidebarNavigation";
import { RightSidebarNavigation } from "../components/navigation/RightSidebarNavigation";
import { SimpleBreadCrumb } from "../components/breadcrumb/SimpleBreadcrumb";

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
  "bullet-list": CommonBulletList,
  "paragraph-image": HistoryComposite,
  "CollapsableImageGrid": CollapsableImageGrid,
  "governance-contact-composite":GovernanceContactComposite,
};

export const SidebarContentNewsLayout = ({ navItems, parentPath, title, contentList }) => {
  const [activeId, setActiveId] = useState(1);

  const content = useMemo(
    () => contentList?.find((item) => item.content_id === activeId) || {},
    [activeId, contentList]
  );

  const activeNavItem = useMemo(
    () => navItems[activeId] || {},
    [navItems, activeId]
  );

  const handleClick = useCallback((id) => {
    setActiveId(id);
  }, []);

  const renderLayout = () => {
    if (!content || Object.keys(content).length === 0) return null;
    
    const Component = layoutComponents[content.layout_type];
    
    if (!Component) return null;

    // Handle special props for specific components
    const additionalProps = {};
    
    if (content.layout_type === "simple-table") {
      additionalProps.autoWidth = content?.isAutoWidth;
      additionalProps.isWrappableHeader = content?.wrappable;
    }

    return (
      <Component 
        title={content.title} 
        content={content} 
        viewable={content?.viewable??false}
        downloadble={content?.downloadble??false}
        searchable={content?.searchable??false}
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
          activeId={activeId}
          handleClick={handleClick}
        />
      </div>

      {/* Main Content */}
      <div className="w-full lg:w-3/5 flex flex-col gap-4">
        <SimpleBreadCrumb
          parent={{ title, path: parentPath }}
          current={content.title || ""}
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