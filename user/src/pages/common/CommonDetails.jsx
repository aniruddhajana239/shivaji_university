import BannerImage from "../../assets/images/quickLinks/banner.png";

export const CommonDetails = () => {
    // For a completely static page without API calls
    const pageContent = [
        {
            id: 1,
            title: "Page Title Here",
            content: "<p>This is the main content of the page. You can add multiple paragraphs here with formatted text.</p><p>Each paragraph can contain detailed information about the topic. The content will flow naturally without any cards or sidebars.</p>"
        },
        {
            id: 2,
            content: "<p>Additional content can go here. This layout is clean and focuses solely on the textual information without any distractions.</p><p>Users can read through the content easily without being interrupted by other UI elements.</p>"
        }
    ];

    return (
        <div className="w-full flex flex-col items-center justify-center gap-8 py-8 px-4 sm:px-6 lg:px-8">
            {/* Top Banner - Clean without any text or buttons */}
            <div className="w-full aspect-5/3 md:aspect-3/1  rounded-[20px] md:rounded-[30px] relative overflow-hidden">
                <img 
                    src={BannerImage} 
                    className="w-full h-full rounded-[20px] md:rounded-[30px] object-cover" 
                    alt="Page Banner" 
                />
            </div>

            {/* Paragraphs Content */}
            <div className="w-full ">
                <div className="flex flex-col gap-6 md:gap-8">
                    {pageContent.map((paragraph) => (
                        <div key={paragraph.id} className="prose prose-lg max-w-none">
                            {paragraph.title && (
                                <h2 className="text-[#001F51] font-[600] text-[30px] md:text-[24px] mb-4">
                                    {paragraph.title}
                                </h2>
                            )}
                            <div 
                                className="text-[#000000] font-[400] text-[14px] md:text-[16px] leading-relaxed"
                                dangerouslySetInnerHTML={{ 
                                    __html: paragraph.content 
                                }}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};