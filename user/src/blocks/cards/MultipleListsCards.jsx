import { ListCard } from "../../components/cards/ListsCard"

export const MultipleListsCards = ({ title, content }) => {
    console.log("content:", content)

    // Function to parse HTML description safely
    const parseHtmlDescription = (htmlString) => {
        if (!htmlString) return null;
        return <div dangerouslySetInnerHTML={{ __html: htmlString }} />;
    };

    // Helper function to handle \n in text
    const handleNewLines = (text) => {
        if (!text || typeof text !== 'string') return text;
        
        return text.split('\\n').map((line, index, array) => (
            <span key={index}>
                {line}
                {index < array.length - 1 && <br />}
            </span>
        ));
    };

    // Extract banner image
    const getBannerImage = () => {
        // Check old structure
        if (content?.sections?.banner_image) {
            return content.sections.banner_image;
        }
        
        // Check new structure - look for Banner title in Top Content
        const topContent = content?.["Top Content"]?.content_details;
        if (topContent && Array.isArray(topContent)) {
            const bannerItem = topContent.find(item => 
                item?.title?.toLowerCase() === "banner" || item?.image
            );
            return bannerItem?.image;
        }
        
        return "";
    };

    // Extract descriptions
    const getDescriptions = () => {
        // Check old structure
        if (content?.sections?.descriptions && Array.isArray(content.sections.descriptions)) {
            return content.sections.descriptions;
        }
        
        // Check new structure - filter out banner item
        const topContent = content?.["Top Content"]?.content_details;
        if (topContent && Array.isArray(topContent)) {
            return topContent
                .filter(item => item?.title?.toLowerCase() !== "banner")
                .map(item => ({
                    icon: item?.image || "",
                    title: item?.title || "",
                    desc_text: item?.description || "",
                    is_link: item?.redirect_to === "open_in_another_link" || 
                             item?.redirect_to === "open_file" ||
                             !!item?.link,
                    link: item?.link || ""
                }));
        }
        
        return [];
    };

    // Extract tables
    const getTables = () => {
        // Check old structure
        if (content?.sections?.tables && Array.isArray(content.sections.tables)) {
            return content.sections.tables;
        }
        
        // Check new structure with Tables
        const tablesData = content?.["Tables"];
        if (tablesData?.table_data && Array.isArray(tablesData.table_data)) {
            return [{
                title: tablesData?.table_heading?.[0]?.title || "Table",
                list: tablesData.table_data.map(item => {
                    const dataValue = Object.values(item?.data || {})?.[0] || "";
                    return handleNewLines(dataValue);
                })
            }];
        }
        
        return [];
    };

    const bannerImage = getBannerImage();
    const descriptions = getDescriptions();
    const tables = getTables();

    return (
        <div className="w-full flex flex-col gap-6 bg-white rounded-[20px] p-6 2xl:p-8 shadow-sm">
            <h3 className="m-0 text-[#001F51] text-[20px] font-[600] 2xl:text-[24px]">
                {title ?? ""}
            </h3>
            
            {(bannerImage || descriptions.length > 0) && (
                <div className="flex flex-col xl:flex-row gap-4 items-center xl:items-start w-full">
                    {bannerImage && (
                        <div className="w-full xl:w-3/5 aspect-16/9 rounded-[10px]">
                            <img 
                                src={bannerImage} 
                                alt="banner" 
                                className="w-full h-full rounded-[10px] object-cover" 
                            />
                        </div>
                    )}
                    
                    {descriptions.length > 0 && (
                        <div className="w-full xl:w-2/5 flex flex-col items-start justify-start gap-2">
                            {descriptions.map((desc, index) => (
                                <div key={index} className="flex flex-col gap-2 w-full">
                                    <div className="flex items-center gap-2">
                                        {desc?.icon && (
                                            <img 
                                                src={desc.icon} 
                                                alt="icon" 
                                                className="h-[30px] w-[40px] rounded-[10px] object-cover" 
                                            />
                                        )}
                                        {desc?.is_link&&<p className="text-[16px] 2xl:text-[20px] font-[600] text-[#001F51]">
                                            {parseHtmlDescription(desc.desc_text)}
                                        </p>}
                                    </div>
                                    {desc?.is_link && desc?.link ? (
                                        <a 
                                            href={desc.link} 
                                            target="_blank" 
                                            rel="noopener noreferrer" 
                                            className="text-[14px] 2xl:text-[18px] text-[#000000] hover:text-blue-600"
                                        >
                                            {desc.link}
                                        </a>
                                    ) : (
                                        <div className="text-[14px] 2xl:text-[18px] text-[#000000]">
                                            {parseHtmlDescription(desc.desc_text)}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
            
            {tables.length > 0 && (
                <div className="flex flex-col items-center gap-3 w-full">
                    {tables.map((tbl, index) => (
                        <ListCard
                            key={index}
                            title={tbl?.title ?? ""}
                            lists={tbl?.list ?? []}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}