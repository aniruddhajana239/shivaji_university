import Brand from '../../../assets/images/common/brand_logo.png'
import AssociatedImages from '../../../assets/images/common/associated_logo.png'
import SearchIcon from '../../../assets/icons/search.png'
import University from '../../../assets/images/common/university.png'
const courses = [{ name: "UG", bgColor: "#5F52B7" }, { name: "PG", bgColor: "#138ED2" }, { name: "P.H.D", bgColor: "#002147" }, { name: "Online", bgColor: "#093D81" }, { name: "Distance", bgColor: "#000000" }];
export const MainNavgationBar = () => {

    return (
        <div className="w-full py-3 bg-white shadow-md flex items-center justify-between px-[14px] lg:px-[48px] relative">
            <div className="flex gap-8 z-90">
                <img src={Brand} alt="brand_logo" className="h-[40px] lg:h-[65px] w-auto" />
                <img src={AssociatedImages} alt="associated_logo" className="h-[40px] lg:h-[65px] w-auto" />
            </div>
            <div className='hidden lg:flex gap-2 items-center z-90'>
                {/* courses */}
                {courses.map((course, index) => (
                    <button key={index} className='cursor-pointer text-white h-fit text-[12px] font-[500] px-4 py-2 rounded-full' style={{ backgroundColor: course.bgColor }}>{course.name}</button>
                ))}
                {/* search bar */}
                <div className='flex items-center w-[270px]  bg-white relative ml-2 rounded-[5px]'>
                    <input type="text" placeholder='Search here...' className='h-[50px] w-full outline-none text-[12px] font-[400] px-[8px]  py-4 pr-[68px] text-[#6B7280] rounded-[5px] border-2 border-[rgba(7,115,148,0.27)]' />
                    <button className='cursor-pointer absolute h-[50px] top-0 right-0 h-full aspect-2/2 bg-[#077394] flex items-center justify-center rounded-[5px]'>
                        <img src={SearchIcon} className='h-[16px] w-[16px]' />
                    </button>
                </div>
            </div>
            <div className='absolute h-full  w-fit bottom-0 right-[48px]'>
                <div className='h-full w-fit relative'>
                <img src={University} className='h-full w-fit relative z-0'/>
                 <div className='absolute inset-0 bg-gradient-to-l from-[#FFFFFF] via-[rgba(255,255,255,0)] to-[#FFFFFF] opacity-100 z-1'></div>
                </div>
            </div>
        </div>
    );
}