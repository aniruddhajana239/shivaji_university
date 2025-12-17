import SearchIcon from '../../../assets/icons/search.png';

// Define your color palette
const courseColors = ["#5F52B7", "#138ED2", "#002147", "#093D81", "#000000"];

export const MainNavigationBar = ({ data, courses, loading, coursesLoading }) => {
    const isLoading = loading || coursesLoading;
    
    // Take only top 5 courses from the API response
    const topCourses = courses ? courses.slice(0, 5) : [];
    
    // Map courses to colors - if there are fewer than 5 courses, use available colors
    const coursesWithColors = topCourses.map((course, index) => ({
        name: course.title,
        bgColor: courseColors[index] || courseColors[courseColors.length - 1]
    }));
    
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
                        <div className='flex items-center w-[270px] bg-white relative ml-2 rounded-[5px]'>
                            <input 
                                type="text" 
                                placeholder='Search here...' 
                                className='h-[50px] w-full outline-none text-[12px] font-[400] px-[8px] py-4 pr-[68px] text-[#6B7280] rounded-[5px] border-2 border-[rgba(7,115,148,0.27)]' 
                            />
                            <button className='cursor-pointer absolute h-[50px] top-0 right-0 h-full aspect-2/2 bg-[#077394] flex items-center justify-center rounded-[5px]'>
                                <img src={SearchIcon} alt="icon" className='h-[16px] w-[16px]' />
                            </button>
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