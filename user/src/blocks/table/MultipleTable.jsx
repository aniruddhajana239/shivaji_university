import CommonTable from "../../components/tables/CommonTable";

export const MultipleTable = ({ title, content }) => {
    console.log("content in multiple table :", content);
    
    // Get all sections that have table_data
    const extractTablesFromContent = () => {
        if (!content || typeof content !== 'object') return [];
        
        const tables = [];
        
        Object.entries(content).forEach(([sectionKey, sectionData]) => {
            // Check if this section has table data
            if (sectionData?.table_data && Array.isArray(sectionData.table_data) && 
                sectionData.table_heading && Array.isArray(sectionData.table_heading)) {
                
                tables.push({
                    tableTitle: sectionKey, // Use section key as table title
                    sections: {
                        columns: sectionData.table_heading.map((heading, index) => ({
                            heading: heading?.title || `Column ${index + 1}`,
                            accessor: `col_${index}`
                        })),
                        rows: sectionData.table_data.map((item, index) => {
                            const rowData = {
                                srno: (index + 1).toString()
                            };

                            // New format: array of arrays of objects
                            if (Array.isArray(item)) {
                                item.forEach((cell, cellIndex) => {
                                    const accessor = `col_${cellIndex}`;
                                    rowData[accessor] = cell?.data ?? '';
                                    rowData[`${accessor}_type`] = cell?.data_type ?? '';
                                });
                                return rowData;
                            }

                            // Legacy format: object with data property
                            const dataValues = Object.values(item?.data || {});
                            sectionData.table_heading.forEach((heading, colIndex) => {
                                rowData[`col_${colIndex}`] = dataValues[colIndex] || '';
                            });
                            
                            return rowData;
                        })
                    },
                    isWrappableHeader: false,
                    autoWidth: false
                });
            }
        });
        
        return tables;
    };

    const tables = extractTablesFromContent();
    
    const handleOpenInNewTab = (file) => {
        if (!file) return;
        window.open(file, '_blank');
    };

    // Helper function to handle \n in text
    const handleNewLines = (text) => {
        if (!text || typeof text !== 'string') return text;
        
        return text.split('\\n').map((line, index, array) => (
            <span key={index}>
                {line}
                {index < array.length - 1 && <br />}
            </span>
        ));
    };

    return (
        <div className="w-full flex flex-col gap-6 bg-white rounded-[20px] p-6 2xl:p-8 shadow-sm">
            {/* Main Title */}
            <h3 className="m-0 text-[#001F51] text-[20px] font-[600] 2xl:text-[24px]">
                {title ?? ""}
            </h3>

            {/* Multiple Tables */}
            {tables.length > 0 ? (
                <div className="w-full flex flex-col items-center">
                    {tables.map((table, index) => (
                        <div key={index} className="w-full flex flex-col bg-[#8C3AAA1A] rounded-[10px] shadow-md items-center mb-6 last:mb-0">
                            {/* Individual Table Title */}
                            {table?.tableTitle && (
                                <h4 className="m-0 text-[#001F51] text-[16px] font-[600] 2xl:text-[20px] py-[12px]">
                                    {table.tableTitle}
                                </h4>
                            )}

                            {/* CommonTable Component */}
                            {table?.sections?.columns && table?.sections?.rows && (
                                <CommonTable
                                    isHeader={table.isHeader ?? true}
                                    columns={table.sections.columns.map(col => ({
                                        ...col,
                                        heading: handleNewLines(col.heading)
                                    }))}
                                    data={table.sections.rows.map((row, rowIndex) => {
                                        const isLastRow = rowIndex === table.sections.rows.length - 1;

                                        return (
                                            <tr
                                                key={rowIndex}
                                                className={`${!isLastRow && "border-b border-[#D8D8D8]"
                                                    } text-[#000000] text-[16px] mx-2`}
                                            >
                                                {table.sections.columns.map((column, colIndex) => {
                                                    const accessor = column.accessor;
                                                    const cellValue = row[accessor];
                                                    const cellType = row[`${accessor}_type`];
                                                    
                                                    if (accessor === "file") return null;

                                                    const isFirstColumn = colIndex === 0;
                                                    const isLastColumn = colIndex === table.sections.columns.length - 1;

                                                    const isUrl = typeof cellValue === 'string' && (cellValue.startsWith('http://') || cellValue.startsWith('https://'));
                                                    
                                                    // Priority to cellType if it exists
                                                    const isSpecialType = cellType 
                                                        ? (cellType === "file" || cellType === "link") 
                                                        : (accessor === "file_name" || isUrl);
                                                    
                                                    let buttonLabel = "View";
                                                    if (cellType === "link") buttonLabel = "Click Here";

                                                    return (
                                                        <td
                                                            key={colIndex}
                                                            className={`py-2 px-[19px] first:w-[150px] align-top ${isLastRow && isFirstColumn ? "rounded-bl-[10px]" : ""
                                                                } ${isLastRow && isLastColumn ? "rounded-br-[10px]" : ""
                                                                } ${accessor === "file_name" || isSpecialType
                                                                    ? table.isWrappableHeader
                                                                        ? "w-auto"
                                                                        : "last:w-[400px] md:last:w-full"
                                                                    : table.isWrappableHeader
                                                                        ? "w-auto"
                                                                        : table.autoWidth ? "w-[600px] md:w-[35%]" : "w-[600px] md:w-[45%]"
                                                                }`}
                                                        >
                                                            {!isSpecialType ? (
                                                                <span className="text-[14px] 2xl:text-[18px] align-top">
                                                                    {handleNewLines(cellValue ?? "")}
                                                                </span>
                                                            ) : (
                                                                <div className="flex justify-between items-center w-full">
                                                                    <div className="flex flex-col max-w-[85%]">
                                                                        {/* No text to show if it's just a button */}
                                                                    </div>
                                                                    <button
                                                                        onClick={() => handleOpenInNewTab(cellValue)}
                                                                        className="cursor-pointer text-[#2F8AA5] underline text-[14px] 2xl:text-[18px]"
                                                                    >
                                                                        {buttonLabel}
                                                                    </button>
                                                                </div>
                                                            )}
                                                        </td>
                                                    );
                                                })}
                                            </tr>
                                        );
                                    })}
                                />
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-4 text-gray-500">No tables found</div>
            )}
        </div>
    );
};