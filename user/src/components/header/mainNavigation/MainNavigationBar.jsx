import { useNavigate } from 'react-router-dom';
import { SearchBar } from '../SearchBar';

// Define your color palette
const courseColors = ["#5F52B7", "#138ED2", "#002147", "#093D81", "#000000"];

export const MainNavigationBar = ({ data, courses, loading, coursesLoading }) => {

    const navigate = useNavigate();


    const isLoading = loading || coursesLoading;

    // Generate URL path from name — same logic as QuickLinksBar
    const getPathFromName = (name) => {
        if (!name) return '/';
        return `/${name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`;
    };

    // Smart navigation handler for each home_header course item
    const handleCourseClick = (course) => {
        if (course?.extend_to === true) {
            const path = getPathFromName(course?.name);
            navigate(`${path}?menu_id=${course?.id}`);
        } else if (course?.external_link && course.external_link !== "") {
            window.open(course.external_link, '_blank', 'noopener,noreferrer');
        } else if (course?.file && course.file !== "") {
            window.open(course.file, '_blank', 'noopener,noreferrer');
        }
    };



    return (
        <div className="w-full py-3 bg-white shadow-md flex items-center justify-between px-[14px] lg:px-6 xl:px-[48px] relative main-navigation-bar">


            {isLoading ? (
                // Skeleton loading state
                <>
                    {/* Left logos skeleton */}
                    <div className="flex gap-8 z-90 animate-pulse">
                        <div className="h-[40px] lg:h-[65px] w-[120px] lg:w-[180px] bg-gray-200 rounded"></div>
                        <div className="h-[40px] lg:h-[65px] w-[120px] lg:w-[180px] bg-gray-200 rounded"></div>
                    </div>

                    {/* Middle courses and search bar skeleton */}
                    <div className='hidden lg:flex gap-1 xl:gap-2 items-center z-90'>


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
                    <div className='hidden md:flex absolute h-full w-48 lg:w-64 bottom-0 right-[48px] animate-pulse'>

                        <div className='h-full w-full bg-gray-200'></div>
                    </div>


                </>
            ) : (
                // Actual content
                <>
                    <div className="w-full flex justify-between items-center md:justify-start gap-4 lg:gap-8 z-90 logo-container">
                        <img src={data?.logo ?? ""} alt="logo" className="h-[40px] lg:h-[50px] xl:h-[65px] w-auto" />
                        <img src={data?.image_two ?? ""} alt="associated_logo" className="h-[40px] lg:h-[50px] xl:h-[65px] w-auto" />
                    </div>




                    <div className='hidden xl:flex gap-1 xl:gap-2 items-center z-90'>
                        {/* courses */}
                        {courses && Array.isArray(courses) && courses.length > 0 && courses.map((course, index) => (
                            <button
                                key={course?.id ?? index}
                                onClick={() => handleCourseClick(course)}
                                className='cursor-pointer text-white h-fit text-[12px] font-[500] px-4 py-2 rounded-full'
                                style={{ backgroundColor: courseColors[index % courseColors.length] }}
                            >
                                {course?.name ?? ""}
                            </button>
                        ))}

                        {/* search bar for xl+ */}
                        <SearchBar containerClassName="w-[200px] xl:w-[270px] ml-2" />
                    </div>

                    {/* search bar for md to xl (768px to 1280px) */}
                    <div className='hidden md:flex xl:hidden items-center z-90 '>
                        <SearchBar containerClassName="w-[200px] lg:w-[220px]" />
                    </div>




                    {/* <div className='hidden md:block absolute h-full w-fit bottom-0 right-[48px]'>

                        <div className='h-full w-fit relative'>
                            <img src={data?.image_three ?? ""} alt="university_image" className='h-full w-fit relative z-0' />
                            <div className='absolute inset-0 bg-gradient-to-l from-[#FFFFFF] via-[rgba(255,255,255,0)] to-[#FFFFFF] opacity-100 z-1'></div>
                        </div>
                    </div> */}


                </>
            )}
        </div>
    );
};