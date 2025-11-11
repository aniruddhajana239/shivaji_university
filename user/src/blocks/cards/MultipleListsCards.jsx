import { ListCard } from "../../components/cards/ListsCard"

export const MultipleListsCards = ({ title, content }) => {
    return (
        <div className="w-full flex flex-col gap-6 bg-white rounded-[20px] p-6 2xl:p-8 shadow-sm">
            <h3 className="m-0 text-[#001F51] text-[20px] font-[600] 2xl:text-[24px]">
                {title ?? ""}
            </h3>
            <div className="flex flex-col xl:flex-row gap-4 items-center xl:items-start w-full">
                <div className="w-full xl:w-3/5 aspect-16/9 rounded-[10px]">
                    <img src={content?.sections?.banner_image ?? ""} alt="banner" className="w-full h-full rouonded-[10px]" />
                </div>
                {content?.sections?.descriptions && <div className="w-full xl:w-2/5 flex flex-col items-start justify-start gap-2">
                    {
                        content?.sections?.descriptions?.map((desc, index) => (
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center gap-2">
                                    {desc?.icon && <img src={desc?.icon ?? ""} alt="icon" className="h-[30px] w-[40px] rounded-[10px]" />}
                                    <p className="text-[16px] 2xl:text-[20px] font-[600] text-[#001F51]">{desc?.title ?? ""}</p>
                                </div>
                                {desc?.is_link ?
                                    <a href={desc?.link} target="_blank" rel="noopener noreferrer" className="text-[14px] 2xl:text-[18px] text-[#000000]">{desc?.desc_text}</a>
                                    : <span className="text-[14px] 2xl:text-[18px] text-[#000000]">{desc?.desc_text}</span>}
                            </div>
                        ))
                    }

                </div>}
            </div>
            {content?.sections?.tables &&
                <div className="flex flex-col items-center gap-3 w-full">
                        {content?.sections?.tables?.map((tbl,index)=>(
                            <ListCard
                            title={tbl?.title??""}
                            lists={tbl?.list??[]}
                            />
                        ))}
                </div>
            }
        </div>
    )
}