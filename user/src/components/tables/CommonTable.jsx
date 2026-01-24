import React from "react";

const CommonTable = ({ columns, data, isWrappableHeader, isHeader }) => {
  return (
    <div className="overflow-x-auto w-full shadow-md rounded-[10px]">
      <table className="min-w-full table-auto">
        {isHeader!==false && (
          <thead className="bg-[#EDFAFE] text-[#001F51] font-[600] rounded-t-[10px]">
            <tr>
              {columns.map((col, index) => (
                <th
                  key={index}
                  className={`text-left ${isWrappableHeader ? "text-wrap" : "text-nowrap"} py-[16px] px-[19px] first:rounded-tl-[10px]
                    last:rounded-tr-[10px] ${isWrappableHeader? "" : " last:w-[400px] md:last:w-full"}  text-[12px]`}
                >
                  {col?.heading ?? ""}
                </th>
              ))}
            </tr>
          </thead>
        )}
        <tbody className="bg-white !text-[10px]">
          {data ? (
            data
          ) : (
            <tr>
              <td colSpan={columns.length} className="text-center text-[10px] py-4">
                No Data Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CommonTable;