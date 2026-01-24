import React from "react";

export const CommonBulletList = ({ title, content }) => {
    console.log("content in bullet list:", content);

    // Extract bullet list items from content structure
    const getBulletListItems = () => {
        if (!content || typeof content !== 'object') return [];

        // Check if we have the old structure with sections.listItems
        if (content?.sections?.listItems && Array.isArray(content.sections.listItems)) {
            return content.sections.listItems;
        }

        // Check for new structure with content_details
        const allItems = [];
        
        // Iterate through all sections in content
        Object.values(content || {}).forEach(section => {
            if (section?.content_details && Array.isArray(section.content_details)) {
                section.content_details.forEach(item => {
                    // Case 1: If item has a normal text list (not HTML)
                    if (item?.description && typeof item.description === 'string') {
                        // Check if it's HTML by looking for HTML tags
                        if (item.description.includes('<ul>') || item.description.includes('<li>')) {
                            // Extract list items from HTML
                            const parser = new DOMParser();
                            const doc = parser.parseFromString(item.description, 'text/html');
                            const listItems = doc.querySelectorAll('li');
                            
                            listItems.forEach(li => {
                                allItems.push(li.textContent);
                            });
                        } else {
                            // It's plain text - split by newlines or other delimiters
                            // Check if it contains list-like structure (numbers, bullets)
                            const lines = item.description.split(/\\n|\n|<br\s*\/?>/);
                            lines.forEach(line => {
                                const trimmedLine = line.trim();
                                if (trimmedLine) {
                                    // Remove bullet points, numbers, etc.
                                    const cleanLine = trimmedLine
                                        .replace(/^[•\-*\d.]+\s*/, '') // Remove bullets, numbers
                                        .replace(/^<li>|<\/li>$/g, '') // Remove li tags if any
                                        .trim();
                                    
                                    if (cleanLine) {
                                        allItems.push(cleanLine);
                                    }
                                }
                            });
                        }
                    }
                    
                    // Case 2: If item has title that could be a list item
                    if (item?.title && item.title.trim()) {
                        allItems.push(item.title);
                    }
                });
            }
            
            // Case 3: Check for other possible list structures
            if (section?.listItems && Array.isArray(section.listItems)) {
                allItems.push(...section.listItems);
            }
        });

        return allItems;
    };

    const bulletListItems = getBulletListItems();

    return (
        <div className="w-full flex flex-col gap-6 bg-white rounded-[20px] p-6 2xl:p-8 shadow-sm">
            <h3 className="m-0 text-[#001F51] text-[20px] font-[600] 2xl:text-[24px]">{title}</h3>
            {bulletListItems.length > 0 ? (
                <ul className="w-full flex flex-col gap-1 list-disc list-inside w-full ml-4">
                    {bulletListItems.map((item, idx) => (
                        <li
                            key={idx}
                            className="text-[14px] 2xl:text-[16px] text-justify text-[#000000] font-[400]"
                        >
                            {item}
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-gray-500">No list items found</p>
            )}
        </div>
    );
};