import CommonTable from "../../components/tables/CommonTable";

export const SimpleTable = ({ title, content, isWrappableHeader, autoWidth }) => {
    // Get the first key from content object
    const contentKey = content ? Object.keys(content)?.[0] : null;
    const tableContent = content?.[contentKey];
    
    // Get table data
    const tableData = tableContent?.table_data;
    const tableHeading = tableContent?.table_heading;
    
    // Transform table_heading to columns format - use simple accessors
    const columns = tableHeading?.map((heading, index) => {
        const headingTitle = heading?.title || '';
        const isLinkColumn = headingTitle.toLowerCase().includes('link');
        const isDateColumn = index === 0 && headingTitle.toLowerCase().includes('date');
        
        return {
            heading: isLinkColumn ? '' : headingTitle, // Empty string for Link columns
            accessor: `col_${index}`, // Simple accessor: col_0, col_1, etc.
            isLinkColumn: isLinkColumn,
            isFirstColumnDate: isDateColumn
        };
    });
    
    // Transform table_data to rows format
    const rows = tableData?.map((item, index) => {
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
        const dataObj = item?.data || {};
        const dataValues = Object.values(dataObj);
        
        columns?.forEach((column, colIndex) => {
            rowData[column.accessor] = dataValues[colIndex] || '';
        });
        
        return rowData;
    });

    const isReactElements = Array.isArray(rows) && rows.length > 0 && rows[0]?.type === "tr";

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

    // Helper render function for special types
    const renderCellValue = (column, value, row) => {
        const { type, by, prevTexts, isLinkColumn, accessor } = column;
        const cellType = row[`${accessor}_type`];

        // Specific button labels based on data_type
        const isUrl = typeof value === 'string' && (value.startsWith('http://') || value.startsWith('https://'));
        
        // Priority to cellType if it exists
        const isSpecialType = cellType 
            ? (cellType === "file" || cellType === "link") 
            : (isLinkColumn || isUrl);

        if (isSpecialType && value) {
            let buttonLabel = "View";
            if (cellType === "link") buttonLabel = "Click Here";

            return (
                <a
                    href={value}
                    className="text-[#2F8AA5] w-full flex items-center justify-end underline whitespace-nowrap text-[12px] 2xl:text-[16px]"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {buttonLabel}
                </a>
            );
        }

        // --- Case 1: Ordered List ---
        if (type === "order-list") {
            if (Array.isArray(value)) {
                const listStyle = by === "number" ? "decimal" : by === "alpha" ? "lower-alpha" : "none";
                return (
                    <ol
                        className="pl-5 text-[12px] 2xl:text-[14px] align-top"
                        style={{ listStyleType: listStyle }}
                    >
                        {value.map((item, idx) => (
                            <li key={idx} className="text-nowrap">{handleNewLines(item)}</li>
                        ))}
                    </ol>
                );
            }
        }

        // --- Case 2: Unordered List ---
        if (type === "unorder-list") {
            if (Array.isArray(value)) {
                const listStyle = by === "none" ? "none" : "disc";
                return (
                    <ul
                        className="pl-5 text-[12px] 2xl:text-[16px] align-top"
                        style={{ listStyleType: listStyle }}
                    >
                        {value.map((item, idx) => (
                            <li key={idx}>{handleNewLines(item)}</li>
                        ))}
                    </ul>
                );
            }

            // --- Case 2.1: Object + prevTexts (e.g. date.from / date.to) ---
            if (typeof value === "object" && prevTexts?.length) {
                const keys = Object.keys(value);
                return (
                    <ul className="pl-5 text-[14px] 2xl:text-[18px] align-top" style={{ listStyleType: "none" }}>
                        {keys.map((key, idx) => (
                            <li key={idx} className="text-nowrap ">
                                <span>{prevTexts[idx] ?? ""}</span> {handleNewLines(value[key])}
                            </li>
                        ))}
                    </ul>
                );
            }
        }

        // --- Case 3: Default text ---
        return <span className="text-[12px] 2xl:text-[16px] align-top">{handleNewLines(value ?? "")}</span>;
    };

    // Prepare columns with handled newlines in headings
    const preparedColumns = columns?.map(col => ({
        ...col,
        heading: col?.isLinkColumn ? '' : (col?.heading ? handleNewLines(col.heading) : '')
    }));

    // Get first column width based on title
    const getFirstColumnWidth = () => {
        const firstColumn = preparedColumns?.[0];
        if (firstColumn?.isFirstColumnDate) {
            return "!first:w-[150px]"; // Date column width
        }
        return ""; // Default first column width
    };

    const firstColumnWidth = getFirstColumnWidth();

    return (
        <div className="w-full flex flex-col gap-6 bg-white rounded-[20px] p-6 2xl:p-8 shadow-sm">
            <h3 className="m-0 text-[#001F51] text-[20px] font-[600] 2xl:text-[24px]">
                {title}
            </h3>

            {preparedColumns && (
                <CommonTable
                    isWrappableHeader={isWrappableHeader}
                    columns={preparedColumns}
                    data={
                        isReactElements
                            ? rows // directly pass <tr> rows
                            : rows?.map((row, rowIndex) => (
                                <tr
                                    key={rowIndex}
                                    className={`${rowIndex !== rows.length - 1 && "border-b border-[#D8D8D8]"
                                        } text-[#000000] text-[16px] mx-2`}
                                >
                                    {preparedColumns.map((column, colIndex) => {
                                        const accessor = column.accessor;
                                        const cellValue = row[accessor];
                                        const isLinkColumn = column?.isLinkColumn;
                                        const isFirstColumn = colIndex === 0;
                                        
                                        if (accessor === "file") return null;

                                        return (
                                            <td
                                                key={colIndex}
                                                className={`py-2 px-[19px] align-top ${isFirstColumn ? firstColumnWidth : ''} ${accessor === "file_name"
                                                        ? isWrappableHeader
                                                            ? "w-auto"
                                                            : "last:w-[400px] md:last:w-full"
                                                        : isWrappableHeader
                                                            ? "w-auto"
                                                            : autoWidth ? "w-[600px] md:w-[35%]" : "w-[600px] md:w-[45%]"
                                                    } ${isLinkColumn ? 'text-center' : ''}`}
                                            >
                                                {renderCellValue(column, cellValue, row)}
                                            </td>
                                        );
                                    })}
                                </tr>
                            ))
                    }
                />
            )}
        </div>
    );
};