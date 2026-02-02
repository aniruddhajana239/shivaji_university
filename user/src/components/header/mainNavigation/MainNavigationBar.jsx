import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '../../../assets/icons/search.png';
import { HomeApi } from '../../../api/home/HomeApi';

// Define your color palette
const courseColors = ["#5F52B7", "#138ED2", "#002147", "#093D81", "#000000"];

export const MainNavigationBar = ({ data, courses, loading, coursesLoading }) => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [searchResults, setSearchResults] = useState(null);
    const [showResults, setShowResults] = useState(false);
    const searchTimeoutRef = useRef(null);
    const searchRef = useRef(null);

    const isLoading = loading || coursesLoading;
    
    // Take only top 5 courses from the API response
    const topCourses = courses ? courses.slice(0, 5) : [];
    
    // Map courses to colors - if there are fewer than 5 courses, use available colors
    const coursesWithColors = topCourses.map((course, index) => ({
        name: course.title,
        bgColor: courseColors[index] || courseColors[courseColors.length - 1]
    }));

    // Handle search input change with debounce
    const handleSearchChange = (e) => {
        const value = e?.target?.value ?? '';
        console.log("value",value);
        setSearchQuery(value);
        
        // Clear previous timeout
        if (searchTimeoutRef.current) {
            clearTimeout(searchTimeoutRef.current);
        }

        // If empty query, clear results
        if (!value?.trim()) {
            setSearchResults(null);
            setShowResults(false);
            return;
        }

        // Set new timeout for debouncing
        searchTimeoutRef.current = setTimeout(async () => {
            await performSearch(value.trim());
        }, 500);
    };

    // Perform search API call
    const performSearch = async (query) => {
        console.log("Performing search for query:", query);
        if (!query) return;
        
        setIsSearching(true);
        setShowResults(true);
        
        try {
            const response = await HomeApi?.search?.({ search_details: query });
            console.log("Search response:", response);
            const results = response?.data?.data?.content_details ?? [];
            setSearchResults(results);
        } catch (error) {
            console?.error?.("Search error:", error);
            setSearchResults([]);
        } finally {
            setIsSearching(false);
        }
    };

    // Handle clear search
    const handleClearSearch = () => {
        setSearchQuery('');
        setSearchResults(null);
        setShowResults(false);
        
        if (searchTimeoutRef.current) {
            clearTimeout(searchTimeoutRef.current);
        }
    };

    // Handle search submit
    const handleSearchSubmit = async () => {
        if (!searchQuery?.trim()) return;
        
        await performSearch(searchQuery.trim());
    };

    // Handle result click - navigate to search page
    const handleResultClick = () => {
        if (searchResults?.length > 0) {
            navigate('/search', {
                state: {
                    data: {
                        status: true,
                        response_code: 200,
                        message: "Search Results",
                        data: {
                            content_details: searchResults
                        }
                    }
                }
            });
            handleClearSearch();
        }
    };

    // Close results when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (searchRef.current && !searchRef.current.contains(e.target)) {
                setShowResults(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Clear timeout on unmount
    useEffect(() => {
        return () => {
            if (searchTimeoutRef.current) {
                clearTimeout(searchTimeoutRef.current);
            }
        };
    }, []);

    return (
        <div className="w-full py-3 bg-white shadow-md flex items-center justify-between px-[14px] lg:px-[48px] relative">
            {isLoading ? (
                // Skeleton loading state
                <>
                    {/* Left logos skeleton */}
                    <div className="flex gap-8 z-90 animate-pulse">
                        <div className="h-[40px] lg:h-[65px] w-[120px] lg:w-[180px] bg-gray-200 rounded"></div>
                        <div className="h-[40px] lg:h-[65px] w-[120px] lg:w-[180px] bg-gray-200 rounded"></div>
                    </div>
                    
                    {/* Middle courses and search bar skeleton */}
                    <div className='hidden lg:flex gap-2 items-center z-90'>
                        {/* Courses skeleton */}
                        {[...Array(5)].map((_, index) => (
                            <div 
                                key={index} 
                                className='h-10 w-16 bg-gray-200 rounded-full animate-pulse'
                                style={{ animationDelay: `${index * 100}ms` }}
                            ></div>
                        ))}
                        
                        {/* Search bar skeleton */}
                        <div className='flex items-center w-[270px] relative ml-2 rounded-[5px] animate-pulse'>
                            <div className='h-[50px] w-full bg-gray-200 rounded-[5px]'></div>
                            <div className='absolute h-[50px] top-0 right-0 w-12 bg-gray-300 rounded-[5px]'></div>
                        </div>
                    </div>
                    
                    {/* Right university image skeleton */}
                    <div className='absolute h-full w-48 lg:w-64 bottom-0 right-[48px] animate-pulse'>
                        <div className='h-full w-full bg-gray-200'></div>
                    </div>
                </>
            ) : (
                // Actual content
                <>
                    <div className="flex gap-8 z-90">
                        <img src={data?.logo ?? ""} alt="logo" className="h-[40px] lg:h-[65px] w-auto" />
                        <img src={data?.image_two ?? ""} alt="associated_logo" className="h-[40px] lg:h-[65px] w-auto" />
                    </div>
                    
                    <div className='hidden lg:flex gap-2 items-center z-90'>
                        {/* courses */}
                        {topCourses && Array.isArray(topCourses) && topCourses?.length > 0 && coursesWithColors.map((course, index) => (
                            <button 
                                key={index} 
                                className='cursor-pointer text-white h-fit text-[12px] font-[500] px-4 py-2 rounded-full' 
                                style={{ backgroundColor: course.bgColor }}
                            >
                                {course.name}
                            </button>
                        ))}
                        
                        {/* search bar */}
                        <div className='flex items-center w-[270px] bg-white relative ml-2 rounded-[5px]' ref={searchRef}>
                            <input 
                                type="text" 
                                placeholder='Search here...' 
                                value={searchQuery}
                                onChange={handleSearchChange}
                                onKeyDown={(e) => e?.key === 'Enter' && handleSearchSubmit()}
                                className='h-[50px] w-full outline-none text-[12px] font-[400] px-[8px] py-4 pr-[68px] text-[#6B7280] rounded-[5px] border-2 border-[rgba(7,115,148,0.27)]' 
                            />
                            
                            {/* Clear button */}
                            {searchQuery && (
                                <button 
                                    onClick={handleClearSearch}
                                    className='cursor-pointer absolute h-[50px] top-0 right-12 h-full aspect-2/2 flex items-center justify-center'
                                >
                                   X
                                </button>
                            )}
                            
                            {/* Search button */}
                            <button 
                                onClick={handleSearchSubmit}
                                className='cursor-pointer absolute h-[50px] top-0 right-0 h-full aspect-2/2 bg-[#077394] flex items-center justify-center rounded-[5px]'
                                disabled={isSearching}
                            >
                                {isSearching ? (
                                    <div className="h-[16px] w-[16px] border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                ) : (
                                    <img src={SearchIcon} alt="search" className='h-[16px] w-[16px]' />
                                )}
                            </button>

                            {/* Search Results Dropdown */}
                            {showResults && (
                                <div className="absolute top-full left-0 right-0 mt-1 bg-white shadow-lg rounded-[5px] border border-gray-200 max-h-96 overflow-y-auto z-50">
                                    {isSearching ? (
                                        // Loading state
                                        <div className="p-4 text-center">
                                            <div className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-[#077394] border-t-transparent"></div>
                                            <p className="text-sm text-gray-500 mt-2">Searching...</p>
                                        </div>
                                    ) : searchResults?.length > 0 ? (
                                        // Results found
                                        <>
                                            <div className="p-3 border-b border-gray-100">
                                                <p className="text-sm text-gray-600">
                                                    Found {searchResults?.length} result{searchResults?.length !== 1 ? 's' : ''}
                                                </p>
                                            </div>
                                            <div className="max-h-64 overflow-y-auto">
                                                {searchResults?.slice(0, 5)?.map((result, index) => (
                                                    <div 
                                                        key={index} 
                                                        className="p-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 cursor-pointer"
                                                        onClick={() => {
                                                            navigate('/search', {
                                                                state: {
                                                                    data: {
                                                                        status: true,
                                                                        response_code: 200,
                                                                        message: "Search Results",
                                                                        data: {
                                                                            content_details: searchResults
                                                                        }
                                                                    }
                                                                }
                                                            });
                                                            handleClearSearch();
                                                        }}
                                                    >
                                                        {result?.title && (
                                                            <h4 className="text-sm font-semibold text-[#001F51] mb-1 line-clamp-1">
                                                                {result.title}
                                                            </h4>
                                                        )}
                                                        {result?.description && (
                                                            <p 
                                                                className="text-xs text-gray-600 line-clamp-2"
                                                                dangerouslySetInnerHTML={{ 
                                                                    __html: result?.description?.length > 100 
                                                                        ? result.description.substring(0, 100) + '...' 
                                                                        : result.description 
                                                                }}
                                                            />
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="p-3 border-t border-gray-100 bg-gray-50">
                                                <button 
                                                    onClick={handleResultClick}
                                                    className="w-full text-center text-sm text-[#077394] font-medium hover:text-[#065b7a]"
                                                >
                                                    View all results →
                                                </button>
                                            </div>
                                        </>
                                    ) : searchResults?.length === 0 && searchQuery?.trim() ? (
                                        // No results found
                                        <div className="p-6 text-center">
                                            <div className="text-gray-400 text-3xl mb-2">🔍</div>
                                            <h3 className="text-sm font-medium text-gray-700 mb-1">No results found</h3>
                                            <p className="text-xs text-gray-500">Try different keywords</p>
                                        </div>
                                    ) : null}
                                </div>
                            )}
                        </div>
                    </div>
                    
                    <div className='absolute h-full w-fit bottom-0 right-[48px]'>
                        <div className='h-full w-fit relative'>
                            <img src={data?.image_three ?? ""} alt="university_image" className='h-full w-fit relative z-0' />
                            <div className='absolute inset-0 bg-gradient-to-l from-[#FFFFFF] via-[rgba(255,255,255,0)] to-[#FFFFFF] opacity-100 z-1'></div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};