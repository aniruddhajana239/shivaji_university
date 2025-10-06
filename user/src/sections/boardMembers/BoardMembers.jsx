import Radhakrishnan from "../../assets/images/board-members/radhakrishnan.png";
import Patil from "../../assets/images/board-members/patil.png";
import Shirke from "../../assets/images/board-members/shirke.png";
import Shinde from "../../assets/images/board-members/shinde.png";
import ChevronRight from "../../assets/icons/chevron_right.png";
const members = [
    {
        name: "Shri C. P. Radhakrishnan",
        position: "Hon'ble Chancellor",
        image: Radhakrishnan,
    },
    {
        name: "PROF. (DR.) D. T. Shirke",
        position: "Hon'ble Vice-Chancellor",
        image: Shirke,
    },
    {
        name: "Prof.(Dr.) P. S. Patil",
        position: "Hon'ble Pro-Vice Chancellor",
        image: Patil,
    },
    {
        name: "Dr. V. N. Shinde",
        position: "Registrar",
        image: Shinde,
    }
];

export const BoardMembers = () => {
    return (
        <div className="w-full bg-white px-6 py-12 flex fex-col gap-6 justify-start items-start">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6 w-full p-4 rounded-[10px] bg-[#EEFBFF] p-6">
                {members.map((member, index) => (
                    <div key={index} className="flex gap-4 justify-start items-start bg-white rounded-[5px] p-3">
                        <img src={member?.image} alt={member?.name} className="h-[130px] w-[100px] object-cover rounded-[7px] border-[2.5px] border-[#C0F0FF]" />
                        <div className="flex flex-col items-start justify-between gap-1 py-2 h-full">
                            <div className="flex flex-col gap-1">
                                <span className="text-[15px] font-[600] text-[#333333]">{member?.name}</span>
                                <span className="text-[13px] font-[400] text-[#6B7280] italic">{member?.position}</span>
                            </div>
                            <button className="cursor-pointer text-[14px] font-[400] text-white bg-[#001F51] px-3 py-2 rounded-[5px] mt-2 flex items-center gap-2">
                                More Details
                                <img src={ChevronRight} className="h-[12px] w-[12px] object-contain" />
                                </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}