import { FileListTable } from "./FileListTable"

export const MultipleFileTable = ({ title, content }) => {
    return (
        <div className="w-full flex flex-col gap-6 bg-white rounded-[20px] p-6 2xl:p-8 shadow-sm">
            <h3 className="m-0 text-[#001F51] text-[20px] font-[600] 2xl:text-[24px]">{title}</h3>
            <div className="flex flex-col items-center w-full gap-2">
                {content && content?.sections?.tables && content?.sections?.tables?.map((table, index) => (
                    <div key={index} className="flex flex-col items-start w-full">
                        {table?.title && <p className="my-[35px] text-[#001F51] text-[18px] font-[600] 2xl:text-[20px]">{table?.title}</p>}
                        <FileListTable 
                            content={table}
                            downloadble={content.downloadble}
                            viewable={content.viewable}
                            searchable={content.searchable}
                            isHeader={table.isHeader}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}