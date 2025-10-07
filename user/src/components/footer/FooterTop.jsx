import React from "react";
import ChevronRightIcon from "../../assets/icons/chevron_right.png";
import { Link } from "react-router-dom";

const FooterTop = () => {
  const footerData = [
    {
      links: [
        "Quick Links",
        "Placement Cell",
        "Students’ Council Election",
        "Madhyamvidhya / Media Spectrum",
        "Special Cell",
      ],
    },
    {
      links: [
        "Compiled online literature on Chhatrapati Shivaji Maharaj",
        "Intranet",
        "Online Receipt Portal",
        "University Publications",
        "विद्यार्थी गीत",
      ],
    },
    {
      links: [
        "Photo Gallery",
        "Right To Services",
        "Grievance Redressal",
        "Other Tenders / Quotations",
        "विद्यार्थी गीत लिंकेजन",
      ],
    },
    {
      links: [
        "Right to Information",
        "Recruitments",
        "Mobile Apps",
        "Archive",
        "Anti Ragging Information",
      ],
    },
  ];

  return (
    <div className="w-full bg-[#3B3B3B] text-[#FFFFFF] p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-8 w-full px-6">
        {footerData.map((column, colIndex) => (
          <div
            key={colIndex}
            className={`space-y-4 ${
              colIndex !== footerData.length - 1
                ? "border-r border-[#5C5C5C]"
                : ""
            }`}
          >
            <ul className="text-sm text-[#CCCCCC]">
              {column.links.map((item, i) => (
                <li
                  key={i}
                  className={`flex items-center gap-2 hover:text-white cursor-pointer py-2 border-b border-[#5C5C5C] last:border-none`}
                >
                  <Link to="#" className="flex items-center gap-2">
                    <img
                      src={ChevronRightIcon}
                      alt="icon"
                      className="w-[6.75px] h-[11.67px]"
                    />
                    <span className="text-[16px] font-[400]">{item}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FooterTop;
