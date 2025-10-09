import { Link } from "react-router-dom";

export const SimpleBreadCrumb = ({parent,current}) => {
    return (
        <div className="w-full flex items-center gap-2 text-[14px] 2xl:text-[16px] text-[#001F42] font-[500]">
            <Link to='/'>Home {">>"}</Link>
            <Link to={parent?.path??"#"} className="text-[#001F51] -ml-2">{parent?.title??""} {current&&":"}</Link>
            <span className="text-[#000000] font-[500]">{current??""}</span>
        </div>
    );
}