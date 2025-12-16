import { useEffect } from "react";
import ArrowDown from "../../assets/icons/arrow_down_dark.png";
import CommonTable from "../../components/tables/CommonTable";

export const FileListTable = ({ title, content, downloadble, viewable, searchable, isHeader }) => {
    const handleDownload = (file, fileName) => {
        if (!file) return;

        const link = document.createElement('a');
        link.href = file;
        link.download = fileName || 'document.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleOpenInNewTab = (file) => {
        if (!file) return;
        window.open(file, '_blank');
    };

    // Get the table configuration based on content structure
    const getTableConfig = () => {
        if (content?.sections) {
            // If content has sections property
            return {
                isHeader: content?.sections?.isHeader ?? true,
                title: content?.sections?.title,
                shadow: content?.sections?.shadow,
                columns: content?.sections?.columns,
                rows: content?.sections?.rows
            };
        } else {
            // If content is directly the table object
            return {
                isHeader: content.isHeader ?? true,
                title: content?.title,
                shadow: content?.shadow,
                columns: content?.columns,
                rows: content?.rows
            };
        }
    };

    const tableConfig = getTableConfig();

    // Transform columns to ensure proper format
    const transformedColumns = tableConfig?.columns?.map(column => {
        if (typeof column === 'object' && column.heading && column.accessor) {
            return column; // Already in correct format
        }
        
        // If column is a string, create basic object structure
        if (typeof column === 'string') {
            return {
                heading: column,
                accessor: column.toLowerCase().replace(/[^a-z0-9]/g, '_')
            };
        }
        
        return column;
    });


    return (
        <div className={`w-full flex flex-col gap-6 bg-white rounded-[20px] ${content?.rows?"":"p-6 2xl:p-8"} ${tableConfig.shadow===false ? "":"shadow-md "}`}>
            {/* Use table title if available, otherwise use component title */}
            {title&& (
                <div>
                    <h3 className="m-0 text-[#001F51] text-[20px] font-[600] 2xl:text-[24px]">
                        {title??""}
                    </h3>
                </div>
            )}

            <div className={`rounded-[10px] overflow-x-auto ${tableConfig?.shadow===false ? "":"shadow-md"}`}>
                <CommonTable
                    isHeader={tableConfig.isHeader??true}
                    columns={transformedColumns}
                    data={
                        tableConfig?.rows?.map((row, rowIndex) => (
                            <tr
                                key={rowIndex}
                                className={`${rowIndex !== tableConfig?.rows?.length - 1 && "border-b border-[#D8D8D8]"} text-[#000000] text-[16px]`}
                            >
                                {transformedColumns?.map((column, colIndex) => {
                                    const accessor = column?.accessor;
                                    const cellValue = row[accessor];

                                    return accessor !== "file" ? (
                                        <td
                                            key={colIndex}
                                            className={`py-2 px-[19px] ${isHeader===false&&"pl-0"} ${accessor === "serial_no" ? "first:w-[150px]" : "first:w-[300px]"}  ${accessor === "file_title"
                                                ? "last:w-[400px] md:last:w-full"
                                                : "w-[400px] md:w-[32%]"
                                                }`}
                                        >
                                            {accessor !== "file_title" ? (
                                                <span className="text-[14px] 2xl:text-[18px] text-nowrap">{cellValue ?? ""}</span>
                                            ) : (
                                                <div className="flex justify-between items-center w-full">
                                                    {column?.linkable ? (
                                                        <a
                                                            href={row["file"] || "#"}
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                if (!row["file"]) return;
                                                                handleOpenInNewTab(row["file"]);
                                                            }}
                                                            className={`cursor-pointer max-w-[85%] ${!row["file"]
                                                                ? "text-gray-300 cursor-not-allowed"
                                                                : "text-[#000000] underline"
                                                                }`}
                                                        >
                                                            {cellValue ?? ""}
                                                        </a>
                                                    ) : (
                                                        <div className="flex flex-col max-w-[85%]">
                                                            {row?.bold_heading&&<strong className="mb-2 flex-wrap pr-[50px]">{row?.bold_heading?? ""}</strong>}
                                                        <p>{cellValue ?? ""}</p>
                                                        </div>
                                                    )}
                                                    <div className="flex items-center gap-8">
                                                        {viewable && (
                                                            <a
                                                                href={row["file"] || "#"}
                                                                onClick={(e) => {
                                                                    e.preventDefault();
                                                                    if (!row["file"]) return;
                                                                    handleOpenInNewTab(row["file"]);
                                                                }}
                                                                className={`cursor-pointer text-[14px] 2xl:text-[18px] ${!row["file"]
                                                                    ? "text-gray-300 cursor-not-allowed"
                                                                    : "text-[#2F8AA5] underline"
                                                                    }`}
                                                            >
                                                                {"view"}
                                                            </a>
                                                        )}

                                                        {downloadble && (
                                                            <button
                                                                onClick={() =>
                                                                    handleDownload(
                                                                        row["file"],
                                                                        row["file_title"]
                                                                    )
                                                                }
                                                                disabled={!row["file"]}
                                                                className={`cursor-pointer h-[20px] lg:h-[30px] w-[20px] lg:w-[30px] rounded-full flex items-center ml-4 justify-center ${!row["file"]
                                                                    ? "bg-gray-200 cursor-not-allowed"
                                                                    : "bg-[#C0F0FF] hover:bg-[#a0e0ff]"
                                                                    }`}
                                                            >
                                                                <img
                                                                    src={ArrowDown}
                                                                    className="h-[8px] lg:h-[14px] w-[8px] lg:w-[14px] object-cover"
                                                                    alt="Download"
                                                                />
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                            )}
                                        </td>
                                    ) : null;
                                })}
                            </tr>
                        ))
                    }
                />
            </div>
        </div>
    );
};