import React from "react";

const CommonTable = ({ columns, data,isWrappableHeader,withoutHeaderText }) => {
  return (
    <div className="overflow-x-auto w-full">
      <table className="min-w-full table-auto">
        {!withoutHeaderText&&<thead className="bg-[#EDFAFE] text-[#001F51] font-[600] rounded-t-[10px]">
          <tr>
            {columns.map((col, index) => (
              <th
                key={index}
                className={`text-left ${isWrappableHeader?"text-wrap":"text-nowrap"} py-[16px] px-[19px] first:rounded-tl-[10px]
                    last:rounded-tr-[10px] ${isWrappableHeader?"":" last:w-[400px] md:last:w-full"}  text-[14px]`}
              >
                {col?.heading??""}
              </th>
            ))}
          </tr>
        </thead>}
        <tbody className="bg-white">
          {data?data:<tr>! No Data Found</tr>}
        </tbody>
      </table>
    </div>
  );
};

export default CommonTable;
