import React, { useState } from "react";
import ArrowDown from "../../assets/icons/arrow_down_dark.png";
import SearchIcon from "../../assets/icons/search.png";
import CommonTable from "../../components/tables/CommonTable";

export const FileListTable = ({ title, content, data, downloadble, viewable, searchable, isHeader, noCard }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [appliedQuery, setAppliedQuery] = useState("");

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

    // Get table data from content structure
    const getTableData = () => {
        if (!content) return null;

        // Get the first key (since content is an object with dynamic keys)
        const contentKey = Object.keys(content)?.[0];
        const tableContent = content?.[contentKey];

        if (!tableContent) return null;

        // Transform table_heading to columns format, or auto-generate if missing
        const hasHeading = Array.isArray(tableContent?.table_heading) && tableContent.table_heading.length > 0;
        const headingSource = hasHeading
            ? tableContent.table_heading
            : (tableContent?.table_data?.[0]?.map((_, i) => ({ title: `Column ${i + 1}` })) || []);

        const columns = headingSource.map((heading, index) => {
            const headingTitle = heading?.title?.toLowerCase() || '';
            const isLinkHeading = headingTitle === 'file' || headingTitle === 'pdf' || headingTitle?.includes('url') || headingTitle?.includes('link') || headingTitle?.includes('click');
            let accessor = '';

            if (headingTitle?.includes('sr') || headingTitle?.includes('no')) {
                accessor = 'srno';
            } else if (headingTitle?.includes('date')) {
                accessor = 'date';
            } else if (headingTitle?.includes('pdf')) {
                accessor = 'file_title';
            } else {
                accessor = headingTitle?.replace(/[^a-z0-9]/g, '_')?.replace(/^_+|_+$/g, '') || `col_${index}`;
            }

            return {
                heading: heading?.title || `Column ${index + 1}`,
                accessor: accessor,
                isLink: isLinkHeading
            };
        });

        // Transform table_data to rows format
        const rows = tableContent?.table_data?.map((item, index) => {
            // New format: table_data is an array of arrays of objects [[{data_type, data}]]
            if (Array.isArray(item)) {
                const rowData = {
                    srno: (index + 1).toString(),
                };

                item.forEach((cell, cellIndex) => {
                    const column = columns[cellIndex];
                    if (column) {
                        const accessor = column.accessor;
                        rowData[accessor] = cell?.data ?? '';
                        rowData[`${accessor}_type`] = cell?.data_type ?? '';
                    }
                });
                return rowData;
            }

            // Legacy format: item is an object with a data property
            const pdfFile = item?.data?.pdf;
            const hasPdf = pdfFile && pdfFile !== 'null' && pdfFile !== '';

            const rowData = {
                serial_no: item?.data?.srno || (index + 1).toString(),
                srno: item?.data?.srno || (index + 1).toString(),
                date: item?.data?.date || '',
                file_title: hasPdf ? pdfFile : 'No PDF available',
                file: hasPdf ? `${item?.image_path}${pdfFile}` : null
            };

            if (item?.data && typeof item.data === 'object') {
                Object.entries(item.data).forEach(([key, value]) => {
                    const normalizedKey = key?.toLowerCase()?.replace(/[^a-z0-9]/g, '_');
                    if (!(normalizedKey in rowData)) {
                        const isUrl = typeof value === 'string' && (
                            value.startsWith('http://') || value.startsWith('https://')
                        );
                        rowData[normalizedKey] = value ?? '';
                        if (isUrl && !rowData.file) {
                            rowData.file = value;
                            rowData.file_title = value;
                        }
                    }
                });
            }

            return rowData;
        });

        return {
            columns: columns || [],
            rows: rows || [],
            hasHeading: hasHeading
        };
    };


    const tableData = getTableData();

    // Transform columns to ensure proper format for CommonTable
    const transformedColumns = tableData?.columns?.map(column => {
        if (typeof column === 'object' && column.heading && column.accessor) {
            return column;
        }

        if (typeof column === 'string') {
            return {
                heading: column,
                accessor: column.toLowerCase().replace(/[^a-z0-9]/g, '_')
            };
        }

        return column;
    });

    // Filter rows based on search query
    const filteredRows = tableData?.rows?.filter(row => {
        if (!appliedQuery) return true;

        return Object.entries(row).some(([key, value]) => {
            // Skip file links, metadata, and columns specifically marked as links
            if (key === 'file' || key.endsWith('_type') || key === 'file_title' || key === 'srno') return false;

            const col = transformedColumns?.find(c => c.accessor === key);
            if (col?.isLink) return false;

            return String(value || "").toLowerCase().includes(appliedQuery.toLowerCase());
        });
    });

    return (
        <div className={`w-full flex flex-col gap-6 ${!noCard ? "bg-white rounded-[20px] p-6 2xl:p-8 shadow-sm" : "p-0"}`}>

            {/* Header: Title & Search Bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                {title && (
                    <h3 className="m-0 text-[#001F51] text-[20px] font-[600] 2xl:text-[24px]">
                        {title}
                    </h3>
                )}

                {searchable && (
                    <div className="flex items-stretch w-full h-[36px] md:w-auto border border-[#D8D8D8] rounded-[6px] overflow-hidden ml-auto">
                        <input
                            type="text"
                            placeholder="Search here..."
                            className="px-4 w-full md:w-[200px] 2xl:w-[250px] text-[14px] 2xl:text-[16px] outline-none"
                            value={searchQuery}
                            onChange={(e) => {
                                const val = e.target.value;
                                setSearchQuery(val);
                                if (val === "") setAppliedQuery("");
                            }}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') setAppliedQuery(searchQuery);
                            }}
                        />
                        <button
                            onClick={() => setAppliedQuery(searchQuery)}
                            className="bg-[#077394] aspect-[2/2] rounded-[6px] h-full flex items-center justify-center cursor-pointer transition-colors duration-200"
                            aria-label="Search"
                        >
                            <img
                                src={SearchIcon}
                                alt="Search"
                                className="h-[18px] w-[18px] 2xl:h-[22px] 2xl:w-[22px] object-contain "
                            />
                        </button>
                    </div>
                )}
            </div>

            {/* Table */}
            <div className={`overflow-x-auto ${!noCard ? "rounded-[10px] shadow-sm" : ""}`}>
                <CommonTable
                    isHeader={isHeader ?? tableData?.hasHeading ?? true}
                    columns={transformedColumns}
                    data={
                        filteredRows && filteredRows.length > 0 ? (
                            filteredRows.map((row, rowIndex) => {
                                return (
                                    <tr
                                        key={rowIndex}
                                        className={`${rowIndex !== filteredRows.length - 1 && "border-b border-[#D8D8D8]"} text-[#000000] text-[16px]`}
                                    >
                                        {transformedColumns?.map((column, colIndex) => {
                                            const accessor = column?.accessor;
                                            const cellValue = row[accessor];
                                            const cellType = row[`${accessor}_type`];
                                            const isUrlValue = typeof cellValue === 'string' && (cellValue?.startsWith('http://') || cellValue?.startsWith('https://'));

                                            // Priority to cellType if it exists
                                            const isLinkColumn = (cellType === "file" || cellType === "link" || cellType === "url")
                                                ? true
                                                : (accessor === "file_title" || column?.isLink || isUrlValue);

                                            // Specific button labels
                                            let buttonLabel = "View";
                                            if (cellType === "link" || cellType === "url") buttonLabel = "Click Here";

                                            const displayText = (isUrlValue && isLinkColumn) ? "" : (cellValue ?? "");
                                            const hasText = displayText !== "" && displayText !== "null" && displayText !== "undefined";

                                            // For specialized types, we might want to hide the download button
                                            const showDownload = downloadble && cellType !== "file" && cellType !== "link";
                                            const hasFile = row?.file || (cellType === "file" && isUrlValue);

                                            return (
                                                <td
                                                    key={colIndex}
                                                    className={`py-2 px-[19px] ${isHeader === false && "pl-0"} ${accessor === "serial_no" || accessor === "srno" ? "first:w-[150px]" : "first:w-[300px]"}  ${isLinkColumn
                                                        ? "last:w-[400px] md:last:w-full"
                                                        : "w-[400px] md:w-[32%]"
                                                        }`}
                                                >

                                                    {!isLinkColumn ? (
                                                        <span className="text-[14px] 2xl:text-[18px] text-nowrap">{displayText}</span>
                                                    ) : (
                                                        <div className={`flex ${hasText ? "justify-between" : "justify-start gap-4"} items-center w-full`}>
                                                            {hasText && (
                                                                <div className="flex flex-col max-w-[85%]">
                                                                    <p className={`text-[#000000] truncate`}>
                                                                        {displayText}
                                                                    </p>
                                                                </div>
                                                            )}

                                                            <div className="flex items-center gap-8">
                                                                {(cellType === "file" || cellType === "link" || (viewable && hasFile)) && (
                                                                    <button
                                                                        onClick={() => isUrlValue ? handleOpenInNewTab(cellValue) : (hasFile && handleOpenInNewTab(row["file"]))}
                                                                        disabled={!isUrlValue && !hasFile}
                                                                        className={`${(!isUrlValue && !hasFile)
                                                                            ? "text-gray-300 cursor-not-allowed"
                                                                            : "cursor-pointer text-[#2F8AA5] underline"
                                                                            } text-[14px] 2xl:text-[18px] font-medium transition-all duration-200`}
                                                                    >
                                                                        {buttonLabel}
                                                                    </button>
                                                                )}

                                                                {(showDownload && hasFile) && (
                                                                    <button
                                                                        onClick={() => hasFile && handleDownload(row["file"], row["file_title"])}
                                                                        disabled={!hasFile}
                                                                        className={`cursor-pointer h-[20px] lg:h-[30px] w-[20px] lg:w-[30px] rounded-full flex items-center ml-4 justify-center ${!hasFile
                                                                            ? "bg-gray-200 cursor-not-allowed"
                                                                            : "bg-[#C0F0FF] hover:bg-[#a0e0ff]"
                                                                            }`}
                                                                    >
                                                                        <img
                                                                            src={ArrowDown}
                                                                            className={`h-[8px] lg:h-[14px] w-[8px] lg:w-[14px] object-cover ${!hasFile ? "opacity-50" : ""}`}
                                                                            alt="Download"
                                                                        />
                                                                    </button>
                                                                )}
                                                            </div>
                                                        </div>
                                                    )}
                                                </td>
                                            );
                                        })}
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td
                                    colSpan={transformedColumns?.length || 1}
                                    className="py-10 text-center text-gray-500 font-medium"
                                >
                                    No data found
                                </td>
                            </tr>
                        )
                    }
                />
            </div>
        </div>
    );
};