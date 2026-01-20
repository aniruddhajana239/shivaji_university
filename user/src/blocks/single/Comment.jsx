export const Comment = ({ title, content }) => {
    // Convert content object to array for mapping
    const contentEntries = content ? Object.entries(content) : [];
    
    // Get the main content (first entry)
    const mainContent = contentEntries?.[0]?.[1]?.content_details?.[0];
    
    // Get the author content (second entry)
    const authorContent = contentEntries?.[1]?.[1]?.content_details?.[0];

    return (
        <div className="w-full flex flex-col gap-6 bg-white rounded-[20px] p-6 2xl:p-8 shadow-sm">
            {/* Title */}
            <h3 className="m-0 text-[#001F51] text-[20px] font-[600] 2xl:text-[24px]">{title}</h3>
            
            {/* Content Area */}
            <div className="flex flex-col items-start gap-6">
                {/* Main Description */}
                {mainContent?.description && (
                    <div 
                        className="text-[#000000] text-[14px] 2xl:text-[16px] leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: mainContent?.description }} 
                    />
                )}
                
                {/* Author Information */}
                {authorContent?.description && (
                    <div className="flex flex-col items-start">
                        <div 
                            className="text-[#001F51] text-[16px] 2xl:text-[20px] font-[600] leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: authorContent?.description }} 
                        />
                    </div>
                )}
            </div>
        </div>
    )
}