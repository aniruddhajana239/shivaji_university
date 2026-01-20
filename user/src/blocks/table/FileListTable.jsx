import ArrowDown from "../../assets/icons/arrow_down_dark.png";
import CommonTable from "../../components/tables/CommonTable";

export const FileListTable = ({ title, content, data, downloadble, viewable, searchable, isHeader }) => {
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

        // Transform table_heading to columns format
        const columns = tableContent?.table_heading?.map((heading, index) => {
            // Map heading titles to appropriate accessors
            const headingTitle = heading?.title?.toLowerCase();
            let accessor = '';

            if (headingTitle?.includes('sr') || headingTitle?.includes('no')) {
                accessor = 'srno';
            } else if (headingTitle?.includes('date')) {
                accessor = 'date';
            } else if (headingTitle?.includes('pdf')) {
                accessor = 'file_title';
            } else {
                accessor = headingTitle?.replace(/[^a-z0-9]/g, '_') || `col_${index}`;
            }

            return {
                heading: heading?.title || `Column ${index + 1}`,
                accessor: accessor
            };
        });

        // Add file column for PDF links if PDF column exists
        if (columns?.some(col => col?.accessor === 'file_title')) {
            columns.push({
                heading: '',
                accessor: 'file'
            });
        }

        // Transform table_data to rows format
        const rows = tableContent?.table_data?.map((item, index) => {
            const pdfFile = item?.data?.pdf;
            const hasPdf = pdfFile && pdfFile !== 'null' && pdfFile !== '';

            const rowData = {
                serial_no: item?.data?.srno || (index + 1).toString(),
                srno: item?.data?.srno || (index + 1).toString(),
                date: item?.data?.date || '',
                file_title: hasPdf ? pdfFile : 'No PDF available',
                file: hasPdf ? `${item?.image_path}${pdfFile}` : null
            };
            return rowData;
        });

        return {
            columns: columns || [],
            rows: rows || []
        };
    };

    const tableData = getTableData();

    // Transform columns to ensure proper format for CommonTable
    const transformedColumns = tableData?.columns?.map(column => {
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
        <div className={`w-full flex flex-col gap-6 bg-white rounded-[20px] p-6 2xl:p-8 shadow-sm`}>
            {/* Title */}
            {title && (
                <div>
                    <h3 className="m-0 text-[#001F51] text-[20px] font-[600] 2xl:text-[24px]">
                        {title}
                    </h3>
                </div>
            )}

            {/* Table */}
            <div className={`rounded-[10px] overflow-x-auto shadow-sm`}>
                <CommonTable
                    isHeader={isHeader ?? true}
                    columns={transformedColumns}
                    data={
                        tableData?.rows?.map((row, rowIndex) => {
                            const hasFile = row?.file !== null && row?.file !== '' && (row?.file?.includes('.pdf') || row?.file?.includes('.docx'));

                            return (
                                <tr
                                    key={rowIndex}
                                    className={`${rowIndex !== tableData?.rows?.length - 1 && "border-b border-[#D8D8D8]"} text-[#000000] text-[16px]`}
                                >
                                    {transformedColumns?.map((column, colIndex) => {
                                        const accessor = column?.accessor;
                                        const cellValue = row[accessor];

                                        return accessor !== "file" ? (
                                            <td
                                                key={colIndex}
                                                className={`py-2 px-[19px] ${isHeader === false && "pl-0"} ${accessor === "serial_no" || accessor === "srno" ? "first:w-[150px]" : "first:w-[300px]"}  ${accessor === "file_title"
                                                    ? "last:w-[400px] md:last:w-full"
                                                    : "w-[400px] md:w-[32%]"
                                                    }`}
                                            >
                                                {accessor !== "file_title" ? (
                                                    <span className="text-[14px] 2xl:text-[18px] text-nowrap">{cellValue ?? ""}</span>
                                                ) : (
                                                    <div className="flex justify-between items-center w-full">
                                                        <div className="flex flex-col max-w-[85%]">
                                                            <p className={`text-[#000000] underline`}>
                                                                {cellValue ?? ""}
                                                            </p>
                                                        </div>
                                                        <div className="flex items-center gap-8">
                                                            {viewable && (
                                                                <button
                                                                    onClick={() => hasFile && handleOpenInNewTab(row["file"])}
                                                                    disabled={!hasFile}
                                                                    className={`cursor-pointer text-[14px] 2xl:text-[18px] ${!hasFile
                                                                        ? "text-gray-400 cursor-not-allowed no-underline"
                                                                        : "text-[#2F8AA5] underline"
                                                                        }`}
                                                                >
                                                                    {"view"}
                                                                </button>
                                                            )}

                                                            {downloadble && (
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
                                        ) : null;
                                    })}
                                </tr>
                            );
                        })
                    }
                />
            </div>
        </div>
    );
};