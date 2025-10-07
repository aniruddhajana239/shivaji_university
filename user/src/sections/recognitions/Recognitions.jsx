import Logo1 from "../../assets/images/logos/recognitions/logo1.png";
import Logo2 from "../../assets/images/logos/recognitions/logo2.png";
import Logo3 from "../../assets/images/logos/recognitions/logo3.png";
import Logo4 from "../../assets/images/logos/recognitions/logo4.png";
import Logo5 from "../../assets/images/logos/recognitions/logo5.png";
import Logo6 from "../../assets/images/logos/recognitions/logo6.png";
export const Recognitions = () => {
    const recognitions = [
        { id: 1, src: Logo1, alt: "Recognition 1" },
        { id: 2, src: Logo2, alt: "Recognition 2" },
        { id: 3, src: Logo3, alt: "Recognition 3" },
        { id: 4, src: Logo4, alt: "Recognition 4" },
        { id: 5, src: Logo5, alt: "Recognition 5" },
        { id: 6, src: Logo6, alt: "Recognition 6" },
    ];

    return (

            <div className="w-full flex items-center justify-center gap-2 md:gap-4 xl:gap-4 w-full px-6 lg:px-[48px] py-12 auto-rows-fr">
                {recognitions.map((recognition) => (
                    <div key={recognition.id} className="w-full flex items-center justify-center bg-white">
                        <img src={recognition.src} alt={recognition.alt} className="max-h-[100px] object-contain" />
                    </div>
                ))}
            </div>
    );
}