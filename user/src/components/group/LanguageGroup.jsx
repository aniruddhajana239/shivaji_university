// LanguageSelector.jsx
import { useEffect, useState } from "react";
import Globe from "../../assets/icons/globe.png";;
import { updateAxiosLanguage } from "../../api/axiosClient"; // Adjust the path as needed

export const LanguageGroup = () => {
    const [language, setLanguage] = useState("en");
    
    // Initialize language from localStorage
    useEffect(() => {
        const savedLanguage = localStorage.getItem("app-language") || "en";
        setLanguage(savedLanguage);
    }, []);
    
    // Handle language change
    const handleLanguageChange = (e) => {
        const selectedLanguage = e.target.value;
        setLanguage(selectedLanguage);
        
        // Update axios client headers
        updateAxiosLanguage(selectedLanguage);
        
        // You can also add additional logic here like:
        // - Dispatch to Redux store if using global state
        // - Update context if using Context API
        // - Trigger page refresh or content reload
        // - Show a loading indicator while language changes
        
        console.log(`Language changed to: ${selectedLanguage}`);
    };
    
    return (
        <div className="flex items-center">
            <img src={Globe} className="h-[17px] w-[17px]" alt="Language" />
            <select 
                value={language}
                onChange={handleLanguageChange}
                className="ml-1 cursor-pointer text-white text-[12px] font-[200] outline-none bg-transparent"
            >
                <option value="en" className="px-2 bg-[#077394] text-white">
                    English
                </option>
                <option value="ma" className="px-2 bg-[#077394] text-white">
                    मराठी
                </option>
                <option value="hi" className="px-2 bg-[#077394] text-white">
                    Hindi
                </option>
            </select>
        </div>
    );
};