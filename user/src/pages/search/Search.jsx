import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const SearchResultsPage = () => {
  const location = useLocation();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Get data from navigation state
    if (location?.state?.data) {
      setData(location.state.data);
    } else {
      // If no data in state, you could fetch from API here
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        setData({
          "status": true,
          "response_code": 200,
          "message": "Data found",
          "data": {
            "content_details": []
          }
        });
        setLoading(false);
      }, 1000);
    }
  }, [location?.state]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse space-y-8">
            {/* Header skeleton */}
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
            {/* Cards skeleton */}
            {[...Array(5)]?.map((_, index) => (
              <div key={index} className="bg-white rounded-lg shadow p-6">
                <div className="flex gap-6">
                  <div className="w-48 h-48 bg-gray-200 rounded-lg flex-shrink-0"></div>
                  <div className="flex-1 space-y-4">
                    <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                    <div className="h-4 bg-gray-200 rounded w-4/6"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Error or no data state
  const contentDetails = data?.data?.content_details;
  
  if (!contentDetails || !Array.isArray(contentDetails) || contentDetails?.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="max-w-7xl mx-auto text-center">
          <div className="bg-white rounded-lg shadow p-8">
            <div className="text-gray-400 text-5xl mb-4">🔍</div>
            <h2 className="text-2xl font-bold text-gray-700 mb-4">
              {data?.message ?? "No Results Found"}
            </h2>
            <p className="text-gray-500 mb-6">
              {data?.message ? "Try searching with different keywords." : "We couldn't find any matching content."}
            </p>
            <button 
              onClick={() => window?.history?.back()}
              className="px-6 py-2 bg-[#001F51] text-white rounded-lg hover:bg-[#003080] transition-colors"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#001F51] mb-2">
            {data?.message ?? "Search Results"}
          </h1>
          <p className="text-gray-600">
            Found {contentDetails?.length ?? 0} result{contentDetails?.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Results List */}
        <div className="space-y-6">
          {contentDetails?.map((item, index) => (
            <div 
              key={index} 
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
            >
              <div className="p-6">
                <div className={`flex flex-col ${item?.image ? 'lg:flex-row' : ''} gap-6`}>
                  {/* Image Section - Only show if image exists */}
                  {item?.image && (
                    <div className="lg:w-1/4 flex-shrink-0">
                      <div className="relative rounded-lg overflow-hidden border border-gray-200">
                        <img
                          src={item?.image}
                          alt={item?.title ?? "Content Image"}
                          className="aspect-square w-full object-cover"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.parentElement.innerHTML = `
                              <div class="aspect-square w-full flex items-center justify-center bg-gradient-to-br from-[#C0F0FF] to-[#A0E0FF] rounded-lg">
                                <div class="text-center">
                                  <div class="text-gray-400 text-3xl mb-2">📷</div>
                                  <p class="text-gray-500 text-sm">Image not available</p>
                                </div>
                              </div>
                            `;
                          }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Content Section */}
                  <div className={`${item?.image ? 'lg:w-3/4' : 'w-full'}`}>
                    {/* Title - Only show if exists */}
                    {item?.title && (
                      <h2 className="text-xl font-bold text-[#001F51] mb-3">
                        {item.title}
                      </h2>
                    )}

                    {/* Description */}
                    {item?.description && (
                      <div 
                        className="prose max-w-none text-gray-700 mb-4 line-clamp-3"
                        dangerouslySetInnerHTML={{ 
                          __html: (item?.description?.length > 300 
                            ? item?.description?.substring?.(0, 300) + '...' 
                            : item?.description) ?? ""
                        }}
                      />
                    )}

                    {/* Link Button */}
                    {item?.link && (
                      <div className="mt-4">
                        <a
                          href={item?.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-4 py-2 bg-[#001F51] text-white rounded-lg hover:bg-[#003080] transition-colors"
                        >
                          Read More
                          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                          </svg>
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Footer with search details */}
              {item?.search_details && (
                <div className="bg-gray-50 px-6 py-3 border-t border-gray-100">
                  <p className="text-sm text-gray-500">
                    Search term: <span className="font-medium text-gray-700">{item?.search_details}</span>
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Back Button */}
        <div className="mt-8 flex justify-center">
          <button 
            onClick={() => window?.history?.back()}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            ← Back to Previous Page
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchResultsPage;