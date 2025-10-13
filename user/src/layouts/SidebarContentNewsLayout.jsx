import { useState, useMemo, useCallback } from "react";
import { LeftSidebarNavigation } from "../components/navigation/LeftSidebarNavigation";
import { RightSidebarNavigation } from "../components/navigation/RightSidebarNavigation";
import { SimpleBreadCrumb } from "../components/breadcrumb/SimpleBreadcrumb";
import { aboutUsContents } from "../constants/AboutUs";
//TO DO - create seperate file for these import and  create layoutComponents object and export
import { FormalComposite } from "../blocks/composite/FormalComposite";
import { PersonalFigure } from "../blocks/single/PersonalFigure";
import { ImageGrid } from "../blocks/grid/ImageGrid";
import NewsPaperComposite from "../blocks/composite/NewsPaperComposite";
import CityComposite from "../blocks/composite/CityComposite";
import ContactComposite from "../blocks/composite/ContactComposite";

const layoutComponents = {
  "formal-composite": FormalComposite,
  "personal-figured": PersonalFigure,
  "image-grid": ImageGrid,
  "news-composite": NewsPaperComposite,
  "city-composite": CityComposite,
  "contact-composite": ContactComposite,
};

export const SidebarContentNewsLayout = ({ navItems, parentPath, title }) => {
  const [activeId, setActiveId] = useState(1);

  const content = useMemo(
    () => aboutUsContents.find((item) => item.content_id === activeId) || {},
    [activeId]
  );
  const activeNavItem = useMemo(
    () => navItems[activeId] || {},
    [navItems, activeId]
  );


  const renderLayout = () => {
    const Component = layoutComponents[content.layout_type];
    return Component ? (
      <Component title={content.title} content={content} />
    ) : null;
  };

  return (
    <div className="w-full bg-white px-6 lg:px-12 py-8 flex flex-col lg:flex-row gap-6">
      {/* Do Left Sidebar Here */}
      <div className="w-full lg:w-1/5">
        <LeftSidebarNavigation
          title="Related Pages"
          navItems={navItems}
          activeId={activeId}
          handleClick={useCallback((id) => setActiveId(id), [])}
        />
      </div>

      {/* Do Main Content Here */}
      <div className="w-full lg:w-3/5 flex flex-col gap-4">
        <SimpleBreadCrumb
          parent={{ title, path: parentPath }}
          current={content.title || ""}
        />
        {renderLayout()}
      </div>

      {/* Do Right Sidebar Here */}
      <div className="w-full lg:w-1/4">
        <RightSidebarNavigation
          title="Updates/News"
          listItems={activeNavItem?.updates || []}
        />
      </div>
    </div>
  );
};
