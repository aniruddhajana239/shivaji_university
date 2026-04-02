import { FileListTable } from "./FileListTable"

export const MultipleFileTable = ({ title, content, downloadble, viewable, searchable }) => {

    // The API returns dynamic keys (e.g. "aaple sarkar") each containing table_heading and table_data.
    // After SidebarContentNewsLayout strips layout/menu_title, content is like:
    // { "aaple sarkar": { table_heading: [...], table_data: [...] } }
    //
    // We also support the legacy format: content.sections.tables (array of table objects).

    const getTables = () => {
        // Direct array format: [[{data_type, data}]]
        if (Array.isArray(content) && content.length > 0 && Array.isArray(content[0])) {
            return [{
                key: 'direct_row_array',
                title: title || 'Table Data',
                tableContent: { [title || 'Table']: { table_data: content } },
            }];
        }

        // Legacy format: content.sections.tables
        if (content?.sections?.tables) {
            return content.sections.tables.map((table, index) => ({
                key: index,
                title: table?.title,
                tableContent: table,
            }));
        }

        // New API format: dynamic keys with table_heading and table_data
        if (content && typeof content === 'object') {
            const dynamicKeys = Object.keys(content).filter(
                key => content[key]?.table_heading || content[key]?.table_data
            );

            if (dynamicKeys.length > 0) {
                return dynamicKeys.map((key, index) => ({
                    key: index,
                    title: key,
                    // Wrap in an object with the key so FileListTable can extract it
                    tableContent: { [key]: content[key] },
                }));
            }
        }

        return [];
    };

    const tables = getTables();
    const mainTitle = title || tables[0]?.title;

    return (
        <div className="w-full flex flex-col gap-6 bg-white rounded-[20px] p-6 2xl:p-8 shadow-sm">
            <h3 className="m-0 text-[#001F51] text-[20px] font-[600] 2xl:text-[24px]">{mainTitle}</h3>
            <div className="flex flex-col w-full gap-4">

                {tables.length > 0 ? tables.map((table, index) => (
                    <div key={table.key} className="flex flex-col items-start w-full">
                        {(table?.title && tables.length > 1) && (
                            <p className="mb-4 mt-8 text-[#001F51] text-[18px] font-[600] 2xl:text-[20px]">{table?.title}</p>
                        )}
                        <FileListTable
                            content={table.tableContent}
                            downloadble={downloadble ?? content?.downloadble}
                            viewable={viewable ?? content?.viewable}
                            searchable={searchable ?? content?.searchable}
                            isHeader={table.tableContent?.isHeader}
                            noCard={true}
                        />
                    </div>

                )) : (
                    <div className="text-center py-4 text-gray-500">No table data available</div>
                )}
            </div>
        </div>
    )
}