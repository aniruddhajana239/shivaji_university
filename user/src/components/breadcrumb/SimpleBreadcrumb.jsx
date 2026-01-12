import { useEffect } from "react";
import { Link } from "react-router-dom";

export const SimpleBreadCrumb = ({ parent, current }) => {

  useEffect (() => {
    console.log("Breadcrumb - parent:", parent, "current:", current);
  }, [parent, current]);
  return (
    <div className="w-full flex flex-wrap items-center gap-1 text-[14px] 2xl:text-[16px] text-[#001F42] font-[500] break-words">
      <Link to="/" className="whitespace-nowrap">Home {">>"}</Link>
      {parent && (
        <Link 
          to={parent?.path ?? "#"} 
          className="text-[#001F51] whitespace-nowrap"
        >
          {parent?.title ?? ""} {current && ":"}
        </Link>
      )}
      {current && (
        <span className="text-[#001F51] font-[500] break-all">{current}</span>
      )}
    </div>
  );
};