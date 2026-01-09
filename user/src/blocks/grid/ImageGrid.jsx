import { useEffect } from "react"

export const ImageGrid = ({ content }) => {
    useEffect(() => {
        console?.log?.("📋 ImageGrid content:", content);
    }, [content]);

    // Get the first key from content object
    const contentKey = Object?.keys?.(content)?.[0] || "";
    const gridData = content?.[contentKey] || [];

    return (
        <div className="w-full flex flex-col gap-6 bg-white rounded-[20px] p-6 2xl:p-8 shadow-sm">
            <h3 className="m-0 text-[#001F51] text-[20px] font-[600] 2xl:text-[24px]">
                {contentKey || ""}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3">
                {gridData?.map?.((item, index) => (
                    <div key={index} className="w-full flex flex-col items-center justify-between rounded-[10px] shadow-md h-full">
                        <div className="w-full aspect-[4/3] rounded-[10px] overflow-hidden flex-shrink-0">

                            <img 
                                src={item?.image || ""} 
                                alt={item?.title || ""} 
                                className="h-full w-full rounded-[10px] object-cover" 
                            />
                        </div>
                        <div className="bg-white w-full p-2 py-3 rounded-b-[10px] flex flex-col items-center gap-1 flex-grow">
                            <h4 className="text-[16px] font-[500] text-[#000000] text-center">
                                {item?.title || ""}
                            </h4>
                            {/* Parse HTML description to extract qualification and tenure */}
                            {item?.description && (
                                <div className="text-[14px] text-[#666666] text-center">
                                    <div dangerouslySetInnerHTML={{ __html: item?.description || "" }} />
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}