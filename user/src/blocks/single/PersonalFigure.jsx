import { useEffect } from "react"

export const PersonalFigure = ({ content }) => {

    useEffect(() => {
        console?.log?.("📋 PersonalFigure content:", content);
    }, [content]);

    // Get the first key from content object
    const contentKey = Object?.keys?.(content)?.[0] || "";
    const personData = content?.[contentKey]?.content_details?.[0];

    if (!personData) {
        return null;
    }

    return (
        <div className="w-full flex flex-col gap-6 bg-white rounded-[20px] p-6 2xl:p-8 shadow-sm">
            <h3 className="m-0 text-[#001F51] text-[20px] font-[600] 2xl:text-[24px]">
                {contentKey || ""}
            </h3>
            <div className="flex flex-col lg:flex-row items-start justify-between gap-6 ">
                <div className=" w-full lg:w-[30%] flex flex-col items-center shadow-md relative rounded-[10px]">
                    <img 
                        src={personData?.image || ""} 
                        alt={personData?.title || "img"} 
                        className="w-full aspect-4/4 object-contain rounded-t-[10px]" 
                    />
                    <div className="absolute bottom-0 left-0 flex justify-center items-center bg-[#ffffff] w-full py-2 px-1 2xl:px-3 2xl:py-4 rounded-b-[10px]">
                        <span className="text-[12px] 2xl:[16px] font-[500] text-center text-[#000000] w-full">
                            {personData?.title || ""}
                        </span>
                    </div>
                </div>
                <div className="w-full lg:w-[70%] flex flex-col gap-2 text-[14px] 2xl:text-[16px] text-justify text-[#000000] font-[400]">
                    <p className="text-[#001F51] text-[18px] font-[600]">
                        {personData?.title || ""}
                    </p>
                    {personData?.description && (
                        <div 
                            className="m-0"
                            dangerouslySetInnerHTML={{ __html: personData?.description || "" }}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}