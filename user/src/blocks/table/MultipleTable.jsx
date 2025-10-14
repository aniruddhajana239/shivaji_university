import CommonTable from "../../components/tables/CommonTable";

export const MultipleTable = ({ title, content }) => {
    const tables = content?.sections?.tables;

    return (
        <div className="w-full flex flex-col gap-6 bg-white rounded-[20px] p-6 2xl:p-8 shadow-sm">
            {/* Main Title */}
            <h3 className="m-0 text-[#001F51] text-[20px] font-[600] 2xl:text-[24px]">
                {title}
            </h3>

            {/* Multiple Tables */}
            {tables && Array.isArray(tables) && tables.length > 0 ? (
                <div className="w-full flex flex-col items-center">
                    {tables.map((table, index) => (
                        <div key={index} className="w-full flex flex-col bg-[#8C3AAA1A] rounded-[10px] shadow-md items-center mb-6 last:mb-0">
                            {/* Individual Table Title */}
                            {table?.tableTitle && (
                                <h4 className="m-0 text-[#001F51] text-[16px] font-[600] 2xl:text-[20px] py-[12px]">
                                    {table?.tableTitle ?? ""}
                                </h4>
                            )}

                            {/* CommonTable Component */}
                            {table?.sections?.columns && table?.sections?.rows && (
                                <CommonTable
                                    isWrappableHeader={table.isWrappableHeader}
                                    columns={table.sections.columns}
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
                                                    if (accessor === "file") return null;

                                                    const isFirstColumn = colIndex === 0;
                                                    const isLastColumn = colIndex === table.sections.columns.length - 1;

                                                    return (
                                                        <td
                                                            key={colIndex}
                                                            className={`py-2 px-[19px] first:w-[150px] align-top ${isLastRow && isFirstColumn ? "rounded-bl-[10px]" : ""
                                                                } ${isLastRow && isLastColumn ? "rounded-br-[10px]" : ""
                                                                } ${accessor === "file_name"
                                                                    ? table.isWrappableHeader
                                                                        ? "w-auto"
                                                                        : "last:w-[400px] md:last:w-full"
                                                                    : table.isWrappableHeader
                                                                        ? "w-auto"
                                                                        : table.autoWidth ? "w-[600px] md:w-[35%]" : "w-[600px] md:w-[45%]"
                                                                }`}
                                                        >
                                                            <span className="text-[14px] 2xl:text-[18px] align-top">
                                                                {cellValue ?? ""}
                                                            </span>
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