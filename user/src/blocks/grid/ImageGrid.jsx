export const ImageGrid = ({ title, content }) => {
    return (
        <div className="w-full flex flex-col gap-6 bg-white rounded-[20px] p-6 2xl:p-8 shadow-sm">
            <h3 className="m-0 text-[#001F51] text-[20px] font-[600] 2xl:text-[24px]">{title}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3">
                {content && content?.sections && Array.isArray(content?.sections) && content?.sections?.map((item, index) => (
                    <div key={index} className="w-full flex flex-col items-center justify-between rounded-[10px] shadow-md h-full"> {/* Added h-full and justify-between */}
                        <div className="w-full aspect-4/3 rounded-[10px] flex-shrink-0"> {/* Added flex-shrink-0 */}
                            <img src={item?.img ?? ""} alt={item?.name} className="h-full w-full rounded-[10px] object-cover" /> {/* Changed cover to object-cover */}
                        </div>
                        <div className="bg-white w-full p-2 py-3 rounded-b-[10px] flex flex-col items-center gap-1 flex-grow"> {/* Added flex-grow */}
                            <h4 className="text-[16px] font-[500] text-[#000000] text-center">{item?.name??""}</h4>
                            <span className="text-[14px] text-[#666666] text-center">{item?.qualification??""}</span>
                            <span className="text-[14px] text-[#666666] -mt-2 text-center">{item?.tenure??""}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}