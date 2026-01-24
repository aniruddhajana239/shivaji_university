import React from "react";

const GovernanceContactComposite = ({ content, title }) => {
  console.log("content in contact us governance:", content);
  
  if (!content || typeof content !== 'object') return null;

  // Function to parse HTML description safely
  const parseHtmlDescription = (htmlString) => {
    if (!htmlString) return null;
    return <div dangerouslySetInnerHTML={{ __html: htmlString }} />;
  };

  // Extract sections from content
  const getSections = () => {
    const sections = [];
    
    // Check for description section
    if (content?.description?.content_details?.[0]?.description) {
      sections.push({
        heading: content?.description?.content_details?.[0]?.title || "Contact Description",
        content: parseHtmlDescription(content.description.content_details[0].description)
      });
    }
    
    // Check for contact information section
    if (content?.["Contact Information"]?.content_details) {
      sections.push({
        heading: "Contact Information",
        addressContact: content["Contact Information"].content_details
          .filter(item => item?.description)
          .map(item => ({
            content: parseHtmlDescription(item.description),
            image: item?.image, // Preserve the image URL
            title: item?.title // Preserve the title for alt text
          }))
      });
    }
    
    return sections;
  };

  const sections = getSections();

  return (
    <div className="w-full flex flex-col gap-8 bg-white rounded-[20px] p-6 2xl:p-8 shadow-sm">
      {/* Page Title */}
      <h3 className="text-[#001F51] text-[24px] font-[600] ">{title}</h3>

      {/* Sections */}
      <div className="w-full -mt-[12px]">
        {sections?.map((section, index) => (
          <div key={index} className="flex flex-col gap-3 mb-6 last:mb-0">
            {/* Description Content */}
            {section?.content && (
              <div className="text-[14px] text-[#001F51]">
                {section.content}
              </div>
            )}

            {/* Address/Contact Items */}
            {section?.addressContact && section.addressContact.length > 0 && (
              <div className="flex flex-col gap-3 md:flex-row my-2 2xl:pr-[150px]">
                {section.addressContact.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 flex-1 min-w-0"
                  >
                    {item?.image && (
                      <div className="flex-shrink-0 bg-[#2F8AA5] p-3 rounded-full flex items-center justify-center">
                        <img
                          src={item.image}
                          alt={item?.title || "icon"}
                          className="w-4 h-4 object-contain"
                        />
                      </div>
                    )}
                    <div className="text-[14px] text-black flex-1">
                      {item.content}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GovernanceContactComposite;