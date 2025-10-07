import BBKIcon from "../../assets/icons/cards/bbk.png";
import AffiliaIcon from "../../assets/icons/cards/affiliation.png";
import DistanceIcon from "../../assets/icons/cards/distance.png";
import OnlineProgramsIcon from "../../assets/icons/cards/online_programs.png";
import IndustryCollaorationIcon from "../../assets/icons/cards/industry.png";
import StudentsIcon from "../../assets/icons/cards/students.png";
import WebApps from "../../assets/icons/cards/web_apps.png";
import ExamIcon from "../../assets/icons/cards/exam.png";
import OnlineCoursesIcon from "../../assets/icons/cards/online_courses.png";
import OnlineReceiptIcon from "../../assets/icons/cards/online_receipt.png";
import PHDIcon from "../../assets/icons/cards/phd.png";
import AdmissionIcon from "../../assets/icons/cards/admission.png";


const cardItems = [
    {
        icon: BBKIcon,
        title: "BBK KRC",
    },
    {
        icon: AffiliaIcon,
        title: "Affiliation",
    },
    {
        icon: DistanceIcon,
        title: "Distance Education",
    },
    {
        icon: OnlineProgramsIcon,
        title: "Online Programs",
    },
    {
        icon: IndustryCollaorationIcon,
        title: "Industry Collaboration",
    },
    {
        icon: StudentsIcon,
        title: "Students",
    },
    {
        icon: WebApps,
        title: "Web Apps",
    },
    {
        icon: ExamIcon,
        title: "Exam Section",
    },
    {
        icon: OnlineCoursesIcon,
        title: "Online Courses",
    },
    {
        icon: OnlineReceiptIcon,
        title: "Online Receipt",
    },
    {
        icon: PHDIcon,
        title: "PGBUTR-Ph.D.",
    },
    {
        icon: AdmissionIcon,
        title: "Admission",
    }
];
export const UniversityPortal = () => {
    return (
        <div className="w-full bg-[#001F42] p-6 px-[48px] py-12 flex flex-col gap-6 justify-start items-start -mt-[8px]">
            <span className="text-white text-[30px] font-[500]">University Portal</span>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grd-cols-8 gap-4 w-full">
                {cardItems?.map((item, index) => (
                    <div key={index} className="flex flex-col bg-white justify-center items-center gap-3 cursor-pointer hover:shadow-lg hover:scale-[1.02] transition-all duration-200 ease-in-out border-b-2 border-[#2F8AA5] rounded-lg p-6 px-2 w-full h-full">
                        <img src={item?.icon} className="h-[40px] w-[40px]" />
                        <div className="text-[18px] font-[500] text-center text-[#333333]">{item?.title??""}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}