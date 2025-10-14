export const CommonBulletList = ({ title, content }) => {

    return (
        <div className="w-full flex flex-col gap-6 bg-white rounded-[20px] p-6 2xl:p-8 shadow-sm">
            <h3 className="m-0 text-[#001F51] text-[20px] font-[600] 2xl:text-[24px]">{title}</h3>
            {content && content?.sections && content?.sections?.listItems && Array.isArray(content?.sections?.listItems) && content?.sections?.listItems?.length > 0 &&
                <ul className="w-full flex flex-col gap-1 list-disc list-inside w-full ml-4">
                    {content?.sections?.listItems?.map((item, idx) => (
                        <li
                            key={idx}
                            className="text-[14px] 2xl:text-[16px] text-justify text-[#000000] font-[400]"
                        >
                            {item}
                        </li>
                    ))}
                </ul>
            }
        </div>
    )
}