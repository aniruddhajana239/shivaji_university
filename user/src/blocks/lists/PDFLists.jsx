import React from "react";
import PDFIcon from "../../assets/icons/pdf.png";
import ArrowDown from "../../assets/icons/arrow_down_dark.png";

export const PDFList = ({ title, content }) => {
    console.log("content in PDF LIST:",content)
    // Extract PDF files from content structure
    const getPDFFiles = () => {
        if (!content) return [];
        
        // Try direct content.data structure (from your sample)
        if (content?.data?.List?.content_details && Array.isArray(content.data.List.content_details)) {
            return content.data.List.content_details.map(item => ({
                file_name: item?.title || "Document",
                file: item?.link || ""
            }));
        }
        
        // Also check for direct content.List structure
        if (content?.List?.content_details && Array.isArray(content.List.content_details)) {
            return content.List.content_details.map(item => ({
                file_name: item?.title || "Document",
                file: item?.link || ""
            }));
        }
        
        // Try the old structure with sections.files
        if (content?.sections?.files && Array.isArray(content.sections.files)) {
            return content.sections.files;
        }
        
        // If content itself is the array (direct data)
        if (Array.isArray(content)) {
            return content.map(item => ({
                file_name: item?.title || "Document",
                file: item?.link || ""
            }));
        }
        
        return [];
    };

    const pdfFiles = getPDFFiles();
    
    const handleDownload = (file, fileName) => {
        if (!file) return;
        
        // Create a temporary anchor element for download
        const link = document.createElement('a');
        link.href = file;
        link.download = fileName || 'document.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleOpenInNewTab = (file) => {
        if (!file) return;
        window.open(file, '_blank');
    };
    
    console.log("PDFList content:", content);
    console.log("Extracted PDF files:", pdfFiles);
    
    return (
        <div className="w-full flex flex-col gap-6 bg-white rounded-[20px] p-6 2xl:p-8 shadow-sm">
            <h3 className="m-0 text-[#001F51] text-[20px] font-[600] 2xl:text-[24px]">{title}</h3>
            <div className="flex flex-col items-center w-full gap-2">
                {pdfFiles.length > 0 ? (
                    pdfFiles.map((file, index) => (
                        <div key={index} className="w-full py-[14px] px-[18px] rounded-[10px] border-2 border-[#C0F0FF] flex justify-between items-center gap-3">
                            <div className="flex items-center gap-3">
                                <img src={PDFIcon} alt="PDF icon" className="h-[31px] w-[24px] object-cover" />
                                <p className="text-[16px] 2xl:text-[20px] font-[500] text-[#001F51]">{file?.file_name}</p>
                            </div>
                            <div className="flex items-center gap-12">
                                <a
                                    href={file?.file || "#"}
                                    onClick={(e) => {
                                        if (!file?.file) {
                                            e.preventDefault();
                                            return;
                                        }
                                        e.preventDefault();
                                        handleOpenInNewTab(file?.file);
                                    }}
                                    className={`cursor-pointer ${!file?.file ? 'text-gray-300 cursor-not-allowed' : 'text-[#2F8AA5] underline'}`}
                                >
                                    view
                                </a>
                                <button
                                    onClick={() => handleDownload(file?.file, file?.file_name)}
                                    className="cursor-pointer flex items-center gap-3"
                                    disabled={!file?.file}
                                >
                                    <span>Download</span>
                                    <div
                                        className={`h-[30px] w-[30px] rounded-full flex items-center justify-center ${!file?.file ? 'bg-gray-200 cursor-not-allowed' : 'bg-[#C0F0FF] hover:bg-[#a0e0ff]'}`}
                                    >
                                        <img src={ArrowDown} className="h-[14px] w-[14px] object-cover" alt="Download" />
                                    </div>
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">No PDF files available</p>
                )}
            </div>
        </div>
    );
};