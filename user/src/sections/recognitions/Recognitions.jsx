import { useDispatch, useSelector } from "react-redux";
import { externalLogosSelector } from "../../redux/selectors/home/ExternalLogos";
import { externalLogosActions } from "../../redux/reducer/slice/home/externalLogosSlice";
import { useEffect, useState } from "react";

export const Recognitions = () => {
    const logos = useSelector(externalLogosSelector);
    const dispatch = useDispatch();
    const [loadedImages, setLoadedImages] = useState({});

    useEffect(() => {
        // Check if data exists and is empty
        if (!logos?.data?.content || logos.data.content.length === 0) {
            dispatch(externalLogosActions.getExternalLogos());
        }
    }, [dispatch, logos?.data?.content]);


    // Handle image load
    const handleImageLoad = (index) => {
        setLoadedImages(prev => ({ ...prev, [index]: true }));
    };

    // Show loading skeleton while fetching
    if (logos?.isFetching) {
        return (
            <div className="w-full flex items-center justify-center gap-2 md:gap-4 xl:gap-4 px-6 lg:px-[48px] py-12">
                {[...Array(6)].map((_, index) => (
                    <div key={index} className="w-full flex items-center justify-center bg-white animate-pulse">
                        <div className="w-full h-[100px] bg-gray-200 rounded"></div>
                    </div>
                ))}
            </div>
        );
    }

    // If no logos data, return null or fallback
    if (!logos?.data?.content || logos.data.content.length === 0) {
        return null;
    }

    // Use API data instead of hardcoded array
    const recognitions = logos.data.content.map((item, index) => ({
        id: index,
        src: item?.image,
        alt: item?.title || `Recognition ${index + 1}`,
        link: item?.link,
        redirect_to: item?.redirect_to
    }));

    return (
        <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6 px-6 lg:px-[48px] py-12">
            {recognitions.map((recognition) => (
                <div key={recognition.id} className="w-full flex items-center justify-center bg-white p-2 hover:scale-105 transition-transform duration-300">
                    {recognition.link && recognition.redirect_to !== 'no_redirect' ? (
                        <a 
                            href={recognition.link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="w-full flex justify-center"
                        >
                            <div className="relative w-full h-[100px] flex items-center justify-center">
                                {/* Placeholder */}
                                <div 
                                    className={`absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 rounded transition-opacity duration-300 ${
                                        loadedImages[recognition.id] ? 'opacity-0' : 'opacity-100'
                                    }`}
                                />
                                
                                {/* Logo image */}
                                <img 
                                    src={recognition.src} 
                                    alt={recognition.alt}
                                    loading="lazy"
                                    onLoad={() => handleImageLoad(recognition.id)}
                                    className={`max-h-[100px] max-w-full object-contain transition-opacity duration-300 ${
                                        loadedImages[recognition.id] ? 'opacity-100' : 'opacity-0'
                                    }`}
                                />
                            </div>
                        </a>
                    ) : (
                        <div className="relative w-full h-[100px] flex items-center justify-center">
                            {/* Placeholder */}
                            <div 
                                className={`absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 rounded transition-opacity duration-300 ${
                                    loadedImages[recognition.id] ? 'opacity-0' : 'opacity-100'
                                }`}
                            />
                            
                            {/* Logo image */}
                            <img 
                                src={recognition.src} 
                                alt={recognition.alt}
                                loading="lazy"
                                onLoad={() => handleImageLoad(recognition.id)}
                                className={`max-h-[100px] max-w-full object-contain transition-opacity duration-300 ${
                                    loadedImages[recognition.id] ? 'opacity-100' : 'opacity-0'
                                }`}
                            />
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};