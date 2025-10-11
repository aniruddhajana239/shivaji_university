export const PersonalFigure = ({ title, content }) => {
    return (

        <div className="w-full flex flex-col gap-6 bg-white rounded-[20px] p-6 2xl:p-8 shadow-sm">
            <h3 className="m-0 text-[#001F51] text-[20px] font-[600] 2xl:text-[24px]">{title}</h3>
            <div className="flex items-start justify-between gap-6 ">
                <div className=" w-full lg:w-[30%] flex flex-col items-center shadow-md relative rounded-[10px]">
                    <img src={content?.sections?.profile_image ?? ""} alt={content?.sections?.name ?? "img"} className="w-full aspect-4/4 object-contain rounded-t-[10px]" />
                    <div className="absolute bottom-0 left-0 flex justify-center items-center bg-[#ffffff] w-full py-2 px-1 2xl:px-3 2xl:py-4 rounded-b-[10px]">
                        <span className="text-[12px] 2xl:[16px] font-[500] text-center text-[#000000] w-full">{content?.sections?.person_name ?? ""}</span>
                    </div>
                </div>
                <div className="w-full lg:w-[70%] flex flex-col gap-2 text-[14px] 2xl:text-[16px] text-justify text-[#000000] font-[400]">
                    <p className="text-[#001F51] text-[18px] font-[600]">{content?.sections?.person_name}</p>
                    <p className="m-0">{content?.sections?.text ?? ""}</p>
                    {content?.sections?.more_details &&
                        <span className="text-[14px] 2xl:text-[16px] mt-1 text-justify text-[#000000] font-[400]">
                            {content?.sections?.more_details?.text ?? ""}  <a href={content
                                ?.sections?.more_details?.path ?? ""} target="_blank" rel="noreferrer" className="text-[#001F51] underline">{content?.sections?.more_details?.path ?? ""}</a>
                        </span>
                    }
                </div>
            </div>
        </div>

    )
}


