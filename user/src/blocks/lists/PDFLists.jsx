import PDFIcon from "../../assets/icons/pdf.png"
import ArrowDown from "../../assets/icons/arrow_down_dark.png"
export const PDFList = ({ title, content }) => {
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
    return (
        <div className="w-full flex flex-col gap-6 bg-white rounded-[20px] p-6 2xl:p-8 shadow-sm">
            <h3 className="m-0 text-[#001F51] text-[20px] font-[600] 2xl:text-[24px]">{title}</h3>
            <div  className="flex flex-col items-center w-full gap-2">
            {content && content?.sections && content?.sections?.files && Array.isArray(content?.sections?.files) && content?.sections?.files?.length > 0 && content?.sections?.files?.map((file, index) => (
                <div className="w-full py-[14px] px-[18px] rounded-[10px] border-2 border-[#C0F0FF] flex justify-between items-center gap-3">
                    <div className="flex items-center gap-3">
                        <img src={PDFIcon} className="h-[31px] w-[24px] object-cover" />
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
                        disabled={!file?.file}>
                            <span>Download</span>
                            <div
                                className={`h-[30px] w-[30px] rounded-full flex items-center justify-center ${!file?.file ? 'bg-gray-200 cursor-not-allowed' : 'bg-[#C0F0FF] hover:bg-[#a0e0ff]'}`}
                            >
                                <img src={ArrowDown} className="h-[14px] w-[14px] object-cover" alt="Download" />
                            </div>
                        </button>
                    </div>
                </div>
            ))}
            </div>
        </div>
    )
}