import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '../../assets/icons/search.png';
import { HomeApi } from '../../api/home/HomeApi';

export const SearchBar = ({ containerClassName = "" }) => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [searchResults, setSearchResults] = useState(null);
    const [showResults, setShowResults] = useState(false);
    const searchTimeoutRef = useRef(null);
    const searchRef = useRef(null);

    // Perform search API call
    const performSearch = async (query) => {
        if (!query) return;

        setIsSearching(true);
        setShowResults(true);

        try {
            const response = await HomeApi?.search?.({ search_details: query });
            const results = response?.data?.data?.content_details ?? [];
            setSearchResults(results);
        } catch (error) {
            console.error("Search error:", error);
            setSearchResults([]);
        } finally {
            setIsSearching(false);
        }
    };

    // Handle search input change with debounce
    const handleSearchChange = (e) => {
        const value = e?.target?.value ?? '';
        setSearchQuery(value);

        if (searchTimeoutRef.current) {
            clearTimeout(searchTimeoutRef.current);
        }

        if (!value?.trim()) {
            setSearchResults(null);
            setShowResults(false);
            return;
        }

        searchTimeoutRef.current = setTimeout(async () => {
            await performSearch(value.trim());
        }, 500);
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
        <div className={`flex items-center bg-white relative rounded-[5px] ${containerClassName}`} ref={searchRef}>
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
                    className='cursor-pointer absolute h-[50px] top-0 right-12 flex items-center justify-center w-8'
                >
                    X
                </button>
            )}

            {/* Search button */}
            <button
                onClick={handleSearchSubmit}
                className='cursor-pointer absolute h-[50px] top-0 right-0 w-12 bg-[#077394] flex items-center justify-center rounded-[5px]'
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
                <div className="absolute top-full left-0 right-0 mt-1 bg-white shadow-lg rounded-[5px] border border-gray-200 max-h-96 overflow-y-auto z-[100]">
                    {isSearching ? (
                        <div className="p-4 text-center">
                            <div className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-[#077394] border-t-transparent"></div>
                            <p className="text-sm text-gray-500 mt-2">Searching...</p>
                        </div>
                    ) : searchResults?.length > 0 ? (
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
                        <div className="p-6 text-center">
                            <div className="text-gray-400 text-3xl mb-2">🔍</div>
                            <h3 className="text-sm font-medium text-gray-700 mb-1">No results found</h3>
                            <p className="text-xs text-gray-500">Try different keywords</p>
                        </div>
                    ) : null}
                </div>
            )}
        </div>
    );
};
