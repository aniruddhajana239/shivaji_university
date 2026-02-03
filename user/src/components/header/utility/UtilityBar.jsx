import { useEffect, useState, useRef, useCallback } from "react";
import Email from "../../../assets/icons/email.png";
import Phone from "../../../assets/icons/phone.png";
import DownCircle from "../../../assets/icons/down_circle.png";
import Content from "../../../assets/icons/content.png";
import AudioDoc from "../../../assets/icons/aud_doc.png";
import { LanguageGroup } from "../../group/LanguageGroup";

export const UtilityBar = ({ data, loading }) => {
    const [fontSizeStep, setFontSizeStep] = useState(0);
    const [isStickyMode, setIsStickyMode] = useState(null); // 'navigation' or 'content' or null
    const [clickTimeout, setClickTimeout] = useState(null);
    const [scrollThreshold] = useState(50); // How close to top to trigger reset
    const originalSizes = useRef(new Map());
    const maxStep = 3;
    const minStep = -3;
    const stepPx = 2;
    
    // Selector for text elements to resize
    const textSelector = `
        h1, h2, h3, h4, h5, h6,
        p, span, div, a, li, td, th, label,
        input, textarea, select, button,
        strong, em, b, i, small,
        [class*="text-"], [class*="font-"]
    `;
    
    // Function to hide all header components except Quick Links Bar
    const scrollToNavigation = useCallback(() => {
        console.log("Making only Quick Links Bar visible");
        
        // Find all header components
        const utilityBar = document.querySelector('.utility-bar') || 
                           document.querySelector('[class*="UtilityBar"]');
        const mainNavigationBar = document.querySelector('.main-navigation-bar') || 
                                  document.querySelector('[class*="MainNavigationBar"]');
        const quickLinksBar = document.querySelector('.quick-links-bar') || 
                              document.querySelector('.quick-Links-bar');
        
        console.log("Elements found:", { 
            utilityBar: !!utilityBar, 
            mainNavigationBar: !!mainNavigationBar, 
            quickLinksBar: !!quickLinksBar
        });
        
        if (utilityBar && mainNavigationBar && quickLinksBar) {
            // Reset any existing sticky mode first
            resetStickyMode();
            
            // Store original display values
            utilityBar.dataset.originalDisplay = utilityBar.style.display;
            mainNavigationBar.dataset.originalDisplay = mainNavigationBar.style.display;
            
            // Hide Utility Bar and Main Navigation Bar
            utilityBar.style.display = 'none';
            mainNavigationBar.style.display = 'none';
            
            // Make Quick Links Bar fixed at the top
            quickLinksBar.setAttribute('data-sticky', 'true');
            quickLinksBar.style.position = 'fixed';
            quickLinksBar.style.top = '0';
            quickLinksBar.style.left = '0';
            quickLinksBar.style.right = '0';
            quickLinksBar.style.zIndex = '9999';
            quickLinksBar.style.width = '100%';
            
            // Add body padding equal to Quick Links Bar height
            const originalBodyPadding = document.body.style.paddingTop;
            document.body.style.paddingTop = `${quickLinksBar.offsetHeight}px`;
            quickLinksBar.dataset.originalBodyPadding = originalBodyPadding;
            
            // Scroll to top to show Quick Links Bar
            setTimeout(() => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }, 100);
            
            setIsStickyMode('navigation');
            console.log("Only Quick Links Bar is now visible at top");
            
            // Auto-reset after 5 seconds
            if (clickTimeout) clearTimeout(clickTimeout);
            const timeout = setTimeout(() => {
                console.log("Auto-resetting navigation mode");
                resetStickyMode();
            }, 5000);
            setClickTimeout(timeout);
        } else {
            console.error("Could not find required elements");
        }
    }, [clickTimeout]);

    // Function to hide all header components
    const scrollToContent = useCallback(() => {
        console.log("Hiding all header components");
        
        // Find all header components
        const utilityBar = document.querySelector('.utility-bar') || 
                           document.querySelector('[class*="UtilityBar"]');
        const mainNavigationBar = document.querySelector('.main-navigation-bar') || 
                                  document.querySelector('[class*="MainNavigationBar"]');
        const quickLinksBar = document.querySelector('.quick-links-bar') || 
                              document.querySelector('.quick-Links-bar');
        
        console.log("Elements found:", { 
            utilityBar: !!utilityBar, 
            mainNavigationBar: !!mainNavigationBar, 
            quickLinksBar: !!quickLinksBar
        });
        
        if (utilityBar && mainNavigationBar && quickLinksBar) {
            // Reset any existing sticky mode first
            resetStickyMode();
            
            // Store original display values and heights
            utilityBar.dataset.originalDisplay = utilityBar.style.display;
            utilityBar.dataset.originalHeight = utilityBar.style.height;
            
            mainNavigationBar.dataset.originalDisplay = mainNavigationBar.style.display;
            mainNavigationBar.dataset.originalHeight = mainNavigationBar.style.height;
            
            quickLinksBar.dataset.originalDisplay = quickLinksBar.style.display;
            quickLinksBar.dataset.originalHeight = quickLinksBar.style.height;
            
            // Hide all header components
            utilityBar.style.display = 'none';
            utilityBar.style.height = '0';
            
            mainNavigationBar.style.display = 'none';
            mainNavigationBar.style.height = '0';
            
            quickLinksBar.style.display = 'none';
            quickLinksBar.style.height = '0';
            
            // Store original body padding
            const originalBodyPadding = document.body.style.paddingTop;
            document.body.style.paddingTop = originalBodyPadding || '0';
            
            // Store for restoration
            utilityBar.dataset.originalBodyPadding = originalBodyPadding;
            
            // Scroll down a bit to show content (optional)
            setTimeout(() => {
                const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
                const targetScroll = Math.max(0, currentScroll);
                window.scrollTo({
                    top: targetScroll,
                    behavior: 'smooth'
                });
            }, 100);
            
            setIsStickyMode('content');
            console.log("All header components hidden, showing content");
            
            // Auto-reset after 5 seconds
            if (clickTimeout) clearTimeout(clickTimeout);
            const timeout = setTimeout(() => {
                console.log("Auto-resetting content mode");
                resetStickyMode();
            }, 5000);
            setClickTimeout(timeout);
        } else {
            console.error("Could not find required elements");
        }
    }, [clickTimeout]);

    // Function to reset sticky mode and show all components
    const resetStickyMode = useCallback(() => {
        console.log("Resetting sticky mode - showing all components");
        
        // Clear any pending timeout
        if (clickTimeout) {
            clearTimeout(clickTimeout);
            setClickTimeout(null);
        }
        
        // Find all header components
        const utilityBar = document.querySelector('.utility-bar') || 
                           document.querySelector('[class*="UtilityBar"]');
        const mainNavigationBar = document.querySelector('.main-navigation-bar') || 
                                  document.querySelector('[class*="MainNavigationBar"]');
        const quickLinksBar = document.querySelector('.quick-links-bar') || 
                              document.querySelector('.quick-Links-bar');
        
        // Reset Utility Bar
        if (utilityBar) {
            utilityBar.style.display = utilityBar.dataset.originalDisplay || '';
            utilityBar.style.height = utilityBar.dataset.originalHeight || '';
            
            // Clean up data attributes
            delete utilityBar.dataset.originalDisplay;
            delete utilityBar.dataset.originalHeight;
            delete utilityBar.dataset.originalBodyPadding;
        }
        
        // Reset Main Navigation Bar
        if (mainNavigationBar) {
            mainNavigationBar.style.display = mainNavigationBar.dataset.originalDisplay || '';
            mainNavigationBar.style.height = mainNavigationBar.dataset.originalHeight || '';
            
            // Clean up data attributes
            delete mainNavigationBar.dataset.originalDisplay;
            delete mainNavigationBar.dataset.originalHeight;
        }
        
        // Reset Quick Links Bar
        if (quickLinksBar) {
            quickLinksBar.style.display = quickLinksBar.dataset.originalDisplay || '';
            quickLinksBar.style.height = quickLinksBar.dataset.originalHeight || '';
            quickLinksBar.removeAttribute('data-sticky');
            quickLinksBar.style.position = '';
            quickLinksBar.style.top = '';
            quickLinksBar.style.left = '';
            quickLinksBar.style.right = '';
            quickLinksBar.style.zIndex = '';
            quickLinksBar.style.width = '';
            
            // Clean up data attributes
            delete quickLinksBar.dataset.originalDisplay;
            delete quickLinksBar.dataset.originalHeight;
            delete quickLinksBar.dataset.originalBodyPadding;
        }
        
        // Reset body padding
        if (utilityBar?.dataset.originalBodyPadding !== undefined) {
            document.body.style.paddingTop = utilityBar.dataset.originalBodyPadding;
        } else if (quickLinksBar?.dataset.originalBodyPadding !== undefined) {
            document.body.style.paddingTop = quickLinksBar.dataset.originalBodyPadding;
        } else {
            document.body.style.paddingTop = '';
        }
        
        setIsStickyMode(null);
        console.log("All components restored to normal");
    }, [clickTimeout]);

    // Handle scroll events - reset ONLY when user scrolls to the top
    useEffect(() => {
        let lastScrollTop = 0;
        let scrollTimeout = null;
        
        const handleScroll = () => {
            const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
            
            // Check if user has scrolled to the top (or very close to top)
            if (currentScroll <= scrollThreshold && isStickyMode) {
                console.log("User scrolled to top - resetting sticky mode");
                resetStickyMode();
            }
            
            lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
        };
        
        // Use debounced scroll handler for better performance
        const debouncedScroll = () => {
            if (scrollTimeout) {
                clearTimeout(scrollTimeout);
            }
            scrollTimeout = setTimeout(handleScroll, 100);
        };
        
        if (isStickyMode) {
            window.addEventListener('scroll', debouncedScroll, { passive: true });
        }
        
        return () => {
            window.removeEventListener('scroll', debouncedScroll);
            if (scrollTimeout) clearTimeout(scrollTimeout);
        };
    }, [isStickyMode, resetStickyMode, scrollThreshold]);
    
    // Function to apply font size changes
    const applyFontSizeStep = (step) => {
        const elements = document.querySelectorAll(textSelector);
        
        elements.forEach((el) => {
            // Skip certain elements
            if (el.closest('nav') || el.closest('footer') || 
                el.tagName === 'IMG' || el.tagName === 'SVG' ||
                el.classList.contains('icon')) {
                return;
            }
            
            // Store original size if not already stored
            if (!originalSizes.current.has(el)) {
                const computedStyle = window.getComputedStyle(el);
                const originalSize = computedStyle.fontSize;
                originalSizes.current.set(el, originalSize);
            }
            
            const originalSize = originalSizes.current.get(el);
            if (!originalSize) return;
            
            // Parse the original size
            const match = originalSize.match(/^([\d.]+)(px|rem|em|%)$/);
            if (!match) return;
            
            const [, valueStr, unit] = match;
            const value = parseFloat(valueStr);
            
            // Calculate new size based on step
            let newSize;
            if (unit === 'px') {
                newSize = value + (step * stepPx);
            } else if (unit === 'rem' || unit === 'em') {
                // Convert rem/em to pixels for calculation
                const baseFontSize = unit === 'rem' ? 16 : parseFloat(window.getComputedStyle(el.parentElement).fontSize);
                const pxValue = value * baseFontSize;
                const newPxValue = pxValue + (step * stepPx);
                newSize = newPxValue / baseFontSize;
            } else {
                // For percentages, convert to pixels
                const parentFontSize = parseFloat(window.getComputedStyle(el.parentElement).fontSize);
                const pxValue = (value / 100) * parentFontSize;
                const newPxValue = pxValue + (step * stepPx);
                newSize = (newPxValue / parentFontSize) * 100;
            }
            
            // Apply the new size
            el.style.fontSize = `${newSize}${unit}`;
        });
    };
    
    // Reset all font sizes to original
    const resetFontSizes = () => {
        originalSizes.current.forEach((originalSize, el) => {
            if (el.style) {
                el.style.fontSize = originalSize;
            }
        });
        originalSizes.current.clear();
    };
    
    // Handle font size increase
    const increaseFontSize = () => {
        if (fontSizeStep < maxStep) {
            const newStep = fontSizeStep + 1;
            setFontSizeStep(newStep);
            applyFontSizeStep(newStep);
            localStorage.setItem('website-font-size-step', newStep.toString());
        }
    };
    
    // Handle font size decrease
    const decreaseFontSize = () => {
        if (fontSizeStep > minStep) {
            const newStep = fontSizeStep - 1;
            setFontSizeStep(newStep);
            applyFontSizeStep(newStep);
            localStorage.setItem('website-font-size-step', newStep.toString());
        }
    };
    
    // Initialize
    useEffect(() => {
        const savedStep = localStorage.getItem('website-font-size-step');
        if (savedStep) {
            const step = parseInt(savedStep, 10);
            if (step >= minStep && step <= maxStep) {
                setFontSizeStep(step);
                setTimeout(() => applyFontSizeStep(step), 100);
            }
        }
        
        // Add click listener to reset sticky mode when clicking outside utility bar
        const handleGlobalClick = (e) => {
            // Don't reset if clicking on utility bar buttons
            if (e.target.closest('.utility-bar')) {
                return;
            }
            
            if (isStickyMode) {
                resetStickyMode();
            }
        };
        
        // Only add listener if sticky mode is active
        if (isStickyMode) {
            document.addEventListener('click', handleGlobalClick);
        }
        
        return () => {
            document.removeEventListener('click', handleGlobalClick);
            if (clickTimeout) clearTimeout(clickTimeout);
        };
    }, [isStickyMode, clickTimeout]);
    
    // Handle dynamic content
    useEffect(() => {
        const observer = new MutationObserver(() => {
            if (fontSizeStep !== 0) {
                applyFontSizeStep(fontSizeStep);
            }
        });
        
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
        
        return () => observer.disconnect();
    }, [fontSizeStep]);

    // Get button text based on sticky mode
    const getNavigationButtonText = () => {
        if (isStickyMode === 'navigation') return 'Reset Navigation';
        if (isStickyMode === 'content') return 'Reset Content View';
        return 'To Navigation';
    };

    const getContentButtonText = () => {
        if (isStickyMode === 'navigation') return 'Reset Navigation';
        if (isStickyMode === 'content') return 'Reset Content View';
        return 'To Content';
    };

    return (
        <div className="w-full bg-[#077394] text-white px-[14px] lg:px-[48px] py-[8px] flex justify-between text-[14px] utility-bar">
            {loading ? (
                // Skeleton loading state (unchanged)
                <>
                    {/* Left section skeleton */}
                    <div className="flex flex-col items-start gap-1 md:flex-row md:items-center md:gap-4 animate-pulse">
                        <div className="flex items-center gap-[5px]">
                            <div className="w-[10px] lg:w-[14px] h-[10px] lg:h-[14px] bg-[#0a8bad] rounded"></div>
                            <div className="w-24 h-3 bg-[#0a8bad] rounded"></div>
                        </div>
                        <div className="flex items-center gap-[5px]">
                            <div className="w-[10px] lg:w-[15px] h-[8px] lg:h-[12px] bg-[#0a8bad] rounded"></div>
                            <div className="w-32 h-3 bg-[#0a8bad] rounded"></div>
                        </div>
                    </div>
                    
                    {/* Right section skeleton */}
                    <div className="flex items-center animate-pulse">
                        {/* Hidden buttons skeleton */}
                        <div className="hidden lg:flex items-center">
                            <div className="h-[17px] w-[17px] bg-[#0a8bad] rounded-full"></div>
                            <div className="ml-1 w-24 h-3 bg-[#0a8bad] rounded"></div>
                        </div>
                        <div className="hidden lg:flex h-[20px] w-[1px] bg-[#0a8bad] mx-4"></div>
                        
                        <div className="hidden lg:flex items-center">
                            <div className="h-[15px] w-[15px] bg-[#0a8bad] rounded"></div>
                            <div className="ml-1 w-20 h-3 bg-[#0a8bad] rounded"></div>
                        </div>
                        <div className="hidden lg:flex h-[20px] w-[1px] bg-[#0a8bad] mx-4"></div>
                        
                        <div className="hidden lg:flex items-center">
                            <div className="h-[15px] w-[15px] bg-[#0a8bad] rounded"></div>
                            <div className="ml-1 w-28 h-3 bg-[#0a8bad] rounded"></div>
                        </div>
                        <div className="hidden lg:flex h-[20px] w-[1px] bg-[#0a8bad] mx-4"></div>
                        
                        {/* A+ A- buttons skeleton */}
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-6 bg-[#0a8bad] rounded-[4px] border-[1px] border-[#0a8bad]"></div>
                            <div className="w-8 h-6 bg-[#0a8bad] rounded-[4px] border-[1px] border-[#0a8bad]"></div>
                        </div>
                        
                        <div className="h-[20px] w-[1px] bg-[#0a8bad] mx-4"></div>
                        
                        {/* Language selector skeleton */}
                        <div className="flex items-center">
                            <div className="h-[17px] w-[17px] bg-[#0a8bad] rounded-full"></div>
                            <div className="ml-1 w-20 h-6 bg-[#0a8bad] rounded"></div>
                        </div>
                    </div>
                </>
            ) : (
                // Actual content
                <>
                    {/* left section */}
                    <div className="flex flex-col items-start gap-1 md:flex-row md:items-center md:gap-4">
                        <a href={`tel:${data?.contact_no ?? ""}`} className="flex items-center gap-[5px]">
                            <img src={Phone} alt="phone" className="w-[10px] lg:w-[14px] h-[10px] lg:h-[14px]" />
                            <span className="text-white font-[200] text-[8px] lg:text-[12px]">{data?.contact_no ?? ""}</span>
                        </a>
                        <a href={`mailto:${data?.email ?? ""}`} className="flex items-center gap-[5px]">
                            <img src={Email} alt="email" className="w-[10px] lg:w-[15px] h-[8px] lg:h-[12px]" />
                            <span className="text-white font-[200] text-[8px] lg:text-[12px]">{data?.email ?? ""}</span>
                        </a>
                    </div>
                    
                    {/* right section */}
                    <div className="flex items-center">
                        <button 
                            onClick={(e) => {
                                e.stopPropagation(); // Prevent event bubbling
                                if (isStickyMode === 'navigation') {
                                    resetStickyMode();
                                } else {
                                    scrollToNavigation();
                                }
                            }}
                            className="hidden cursor-pointer lg:flex items-center text-[12px] hover:underline hover:text-blue-200 transition-colors"
                            title={isStickyMode === 'navigation' ? 'Reset to show all components' : 'Show only Quick Links Bar at top'}
                        >
                            <img src={DownCircle} className="h-[17px] w-[17px]" alt="To Navigation" />
                            <span className="ml-1 font-[200]">
                                {getNavigationButtonText()}
                            </span>
                        </button>
                        <div className="hidden lg:flex h-[20px] w-[1px] bg-white opacity-18 mx-4"></div>
                        
                        <button 
                            onClick={(e) => {
                                e.stopPropagation(); // Prevent event bubbling
                                if (isStickyMode === 'content') {
                                    resetStickyMode();
                                } else {
                                    scrollToContent();
                                }
                            }}
                            className="cursor-pointer hidden lg:flex items-center text-[12px] hover:underline hover:text-blue-200 transition-colors"
                            title={isStickyMode === 'content' ? 'Reset to show all components' : 'Hide all header components'}
                        >
                            <img src={Content} className="h-[15px] w-[15px]" alt="To Content" />
                            <span className="ml-1 font-[200]">{getContentButtonText()}</span>
                        </button>
                        <div className="hidden lg:flex h-[20px] w-[1px] bg-white opacity-18 mx-4"></div>
                        
                        <button className="cursor-pointer hidden lg:flex items-center text-[12px]">
                            <img src={AudioDoc} className="h-[15px] w-[15px]" alt="Screen Reader" />
                            <span className="ml-1 font-[200]">Screen Reader</span>
                        </button>
                        <div className="hidden lg:flex h-[20px] w-[1px] bg-white opacity-18 mx-4"></div>
                        
                        <div className="flex items-center gap-2">
                            <button 
                                onClick={decreaseFontSize}
                                disabled={fontSizeStep <= minStep}
                                className={`cursor-pointer flex items-center justify-center text-[14px] border-[1px] border-white rounded-[4px] px-[4px] py-[3px] transition-all ${
                                    fontSizeStep <= minStep ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white/20'
                                }`}
                                title="Decrease font size by 2px (A-)"
                            >
                                <span className="text-[8px] lg:text-[10px] font-[600] text-white">A-</span>
                            </button>
                            
                            <button 
                                onClick={increaseFontSize}
                                disabled={fontSizeStep >= maxStep}
                                className={`cursor-pointer flex items-center justify-center text-[14px] border-[1px] border-white rounded-[4px] px-[4px] py-[3px] transition-all ${
                                    fontSizeStep >= maxStep ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white/20'
                                }`}
                                title="Increase font size by 2px (A+)"
                            >
                                <span className="text-[8px] lg:text-[10px] font-[600] text-white">A+</span>
                            </button>
                        </div>
                        
                        <div className="h-[20px] w-[1px] bg-white opacity-18 mx-4"></div>
                        
                        <LanguageGroup />
                    </div>
                </>
            )}
        </div>
    );
};