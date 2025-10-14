export const Comment = ({ title, content }) => {
    return (
        <div className="w-full flex flex-col gap-6 bg-white rounded-[20px] p-6 2xl:p-8 shadow-sm">
            <h3 className="m-0 text-[#001F51] text-[20px] font-[600] 2xl:text-[24px]">{title}</h3>
            <div className="flex flex-col items-start gap-6">
                <p className="text-[#000000] text-[14px] 2xl:text-[16px]" dangerouslySetInnerHTML={{ __html: content?.sections?.paraContent.replace(/\n/g, '<br />') }}></p>
                <div className="flex flex-col items-start">
                    {content?.sections?.name&&<p className="text-[#001F51] text-[16px] 2xl:text-[20px] font-[600]">{content?.sections?.name}</p>}
                    {content?.sections?.position&&<p className="text-[#001F51] text-[16px] 2xl:text-[20px] font-[600]">{content?.sections?.position}</p>}
                    {content?.sections?.department&&<p className="text-[#001F51] text-[16px] 2xl:text-[20px] font-[600]">{content?.sections?.department}</p>}
                    {content?.sections?.university&&<p className="text-[#001F51] text-[16px] 2xl:text-[20px] font-[600]">{content?.sections?.university}</p>}
                </div>
            </div>
        </div>
    )
}