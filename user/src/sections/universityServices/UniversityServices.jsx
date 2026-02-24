import { UniversityServicesGrid } from "../../components/grids/UniversityServices";

export const UniversityServices = ({ services }) => {
    return (
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-6 lg:px-[48px] py-6 auto-rows-fr">
            <UniversityServicesGrid services={services ?? []} />
        </div>
    );
}