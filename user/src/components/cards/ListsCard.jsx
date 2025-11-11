export const ListCard = ({ title, lists }) => {
    return (
        <div className="w-full flex flex-col rounded-[10px] shadow-md">
            {title && 
            <div className="flex justify-center items-center py-[14px] w-full rounded-t-[10px] bg-[#EDFAFE]">
                <p className="text-[16px] 2xl:text-[20px] text-[#001F51]  font-[600] text-center">{title??""}</p>
            </div>}
            {lists&&Array.isArray(lists)&&lists?.length>0&&
            <ul className="list-type-none m-3">
                {lists?.map((item,index)=>(
                    <li key={index} className="p-2 text-[#000000] border-b-1 border-[#D8D8D8] last:border-none">{item}</li>
                ))}
            </ul>
            }
        </div>
    )
}