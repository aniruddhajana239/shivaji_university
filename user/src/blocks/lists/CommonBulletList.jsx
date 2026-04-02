import React from "react";

export const CommonBulletList = ({ title, content }) => {
    console.log("content in bullet list:", content);

    // Extract section keys from content object
    const sectionKeys = Object.keys(content || {}).filter(key => {
        const section = content[key];
        return section && section.content_details && Array.isArray(section.content_details);
    });

    // Helper function to ensure all links in HTML open in a new tab
    const prepareHtml = (html) => {
        if (!html) return "";
        // Simple regex to add target="_blank" and rel="noopener noreferrer" to <a> tags
        return html.replace(/<a\s+(?:[^>]*?\s+)?href=(['"])(.*?)\1/g, (match) => {
            if (match.includes('target=')) return match;
            return `${match} target="_blank" rel="noopener noreferrer"`;
        });
    };

    return (
        <div className="w-full flex flex-col gap-6 bg-white rounded-[20px] p-6 2xl:p-8 shadow-sm">
            {/* Main Page Title */}
            <h3 className="m-0 text-[#001F51] text-[20px] font-[600] 2xl:text-[24px] border-b pb-4 border-gray-100">
                {title}
            </h3>

            <div className="w-full flex flex-col gap-8">
                {sectionKeys.length > 0 ? (
                    sectionKeys.map((sectionKey, sectionIdx) => {
                        const section = content[sectionKey];
                        return (
                            <div key={sectionIdx} className="flex flex-col gap-4">
                                {/* Section Heading */}
                                <h4 className="m-0 text-[#000000] text-[18px] font-[600] 2xl:text-[20px]">
                                    {sectionKey}
                                </h4>

                                {/* Section Content */}
                                <div className="w-full flex flex-col gap-3 ml-2">
                                    {section.content_details.map((item, itemIdx) => (
                                        <div key={itemIdx} className="w-full">
                                            {/* Item Title if it exists and is not the same as sectionKey */}
                                            {item.title && item.title.toLowerCase() !== sectionKey.toLowerCase() && (
                                                <h5 className="text-[16px] font-[500] text-[#000000] mb-1">
                                                    {item.title}
                                                </h5>
                                            )}

                                            {/* Item Description (HTML content) */}
                                            {item.description && (
                                                <div
                                                    className="bullet-list-content text-[14px] 2xl:text-[16px] text-justify text-[#000000] font-[400]"
                                                    dangerouslySetInnerHTML={{ __html: prepareHtml(item.description) }}
                                                />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <p className="text-gray-500">No list items found</p>
                )}
            </div>

            {/* Custom styles for the HTML content injected via dangerouslySetInnerHTML */}
            <style dangerouslySetInnerHTML={{ __html: `
                .bullet-list-content ul {
                    list-style-type: disc;
                    margin-left: 1.5rem;
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                }
                .bullet-list-content li {
                    padding-left: 0.25rem;
                }
                .bullet-list-content a {
                    color: #077394;
                    text-decoration: none;
                    cursor: pointer;
                    transition: color 0.2s ease;
                }
                .bullet-list-content a:hover {
                    color: #001F51;
                    text-decoration: underline;
                }
                .bullet-list-content p {
                    margin: 0.5rem 0;
                }
            `}} />
        </div>
    );
};