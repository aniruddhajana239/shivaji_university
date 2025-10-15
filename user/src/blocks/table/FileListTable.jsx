import { useEffect } from "react";
import ArrowDown from "../../assets/icons/arrow_down_dark.png";
import CommonTable from "../../components/tables/CommonTable";

export const FileListTable = ({ title, content, downloadble, viewable, searchable, withoutHeaderText }) => {
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

    // Transform columns to accessor and heading format
    const transformedColumns = content?.sections?.columns?.map(column => {
        if (typeof column === 'object' && column.heading && column.accessor) {
            return column; // Already in correct format
        }

        // Map string columns to object format
        const columnMap = {
            "Sr. No.": { heading: "Sr. No.", accessor: "serial_no" },
            "Date": { heading: "Date", accessor: "date" },
            "PDF": { heading: "PDF", accessor: "file_title" }
        };

        return columnMap[column] || { heading: column, accessor: column.toLowerCase() };
    });
    useEffect(() => {
        console.log("download:", downloadble, "viewable:", viewable)
    }, [downloadble, viewable])

    return (
        <div className="w-full flex flex-col gap-6 bg-white rounded-[20px] p-6 2xl:p-8 shadow-sm">
            <div>
                <h3 className="m-0 text-[#001F51] text-[20px] font-[600] 2xl:text-[24px]">{title}</h3>
            </div>

            <div className="rounded-[10px] shadow-[md] overflow-x-auto">
                <CommonTable
                withoutHeaderText={withoutHeaderText}
                    columns={transformedColumns}
                    data=
                    {content?.sections?.rows?.map((row, rowIndex) => (
                        <tr
                            key={rowIndex}
                            className={`${rowIndex !== content?.sections?.rows?.length - 1 && "border-b border-[#D8D8D8]"} text-[#000000] text-[16px]`}
                        >
                            {transformedColumns?.map((column, colIndex) => {
                                const accessor = column?.accessor;
                                const cellValue = row[accessor];

                                return accessor !== "file" ? (
                                    <td
                                        key={colIndex}
                                        className={`py-2 px-[19px] ${accessor === "serial_no" ? "first:w-[150px]" : "first:w-[300px]"}  ${accessor === "file_title"
                                            ? "last:w-[400px] md:last:w-full"
                                            : "w-[400px] md:w-[32%]"
                                            }`}
                                    >
                                        {accessor !== "file_title" ? (
                                            <span className="text-[14px] 2xl:text-[18px] text-nowrap">{cellValue ?? ""}</span>
                                        ) : (
                                            <div className="flex justify-between items-center w-full">
                                                {column?.linkable ? (<a
                                                    href={row["file"] || "#"}
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        if (!row["file"]) return;
                                                        handleOpenInNewTab(row["file"]);
                                                    }}
                                                    className={`cursor-pointer ${!row["file"]
                                                        ? "text-gray-300 cursor-not-allowed"
                                                        : "text-[#000000] underline"
                                                        }`}
                                                >
                                                    {cellValue ?? ""}
                                                </a>) :
                                                    (<p>{cellValue ?? ""}</p>)
                                                }
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
                                                            className={`cursor-pointer h-[30px] w-[30px] rounded-full flex items-center justify-center ${!row["file"]
                                                                    ? "bg-gray-200 cursor-not-allowed"
                                                                    : "bg-[#C0F0FF] hover:bg-[#a0e0ff]"
                                                                }`}
                                                        >
                                                            <img
                                                                src={ArrowDown}
                                                                className="h-[14px] w-[14px] object-cover"
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
                    ))}

                />

            </div>
        </div>
    );
};