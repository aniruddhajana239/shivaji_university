import FullVideo from "../../assets/images/featuredVideos/full-video.png";
import Share from "../../assets/icons/share.png";
import YoutubePlay from "../../assets/icons/youtube.png";
import WatchYoutube from "../../assets/images/logos/youtube_white.png"
import { featuredVideos } from "../../constants/FeaturedVideos";
export const FeaturedVideos = () => {
    return (
        <div className="w-full bg-[#FFFFFF] grid grid-cols-1 lg:grid-cols-2 gap-4 py-8 px-6 lg:px-[48px]">
            <div className="w-full rounded-[10px] h-full relative aspect-5/3">
                <img src={FullVideo} alt="Featured Video 1" className="w-full  h-full object-cover rounded-[10px]" />
                <div className="absolute w-full h-full top-0 left-0 rounded-[10px]">
                    <div className="w-full h-full relative bg-black/50 rounded-[10px]">
                        <div className=" text-white text-[16px] px-6 py-2 flex justify-between items-center ">
                            <span className="text-white text-[10px] lg:text-[14px] font-[500]">शिवाजी विद्यापीठाच्या मास कम्युनिकेशन विभागाच्या विद्यार्थ्यांनी 'क्रांती वन' वर केलेली डॉक्युमेंटरी</span>
                            <div className="flex flex-col gap-1 items-center justify-center ml-4">
                                <img src={Share} alt="share" className="h-[18px] w-[18px] object-contain" />
                                <span className="text-white text-[10px] font-[300]">Share</span>
                            </div>
                        </div>
                        <div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] cursor-pointer">
                            <img src={YoutubePlay} alt="play button" className="h-[40px] w-[40px] object-contain" />
                        </div>
                        <div className="absolute bottom-6 flex items-center left-0 w-fit bg-[#001F51A8] rounded-r-[10px] p-3 lg:p-4 py-2 lg:py-3">
                            <span className="text-white text-[10px] lg:text-[14px] font-[400]">Watch on</span>
                            <img src={WatchYoutube} alt="watch" className="h-[16px] lg:h-[24px] w-auto object-contain inline-block ml-2" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full rounded-[10px] aspect-video flex flex-col gap-4">
                {
                    featuredVideos?.map((video) => (
                        <div key={video?.id} className="w-full flex items-center gap-4 px-0 lg:px-4 flex-shrink-0">
                            <img src={video?.thumbnailUrl} alt={video?.title} className="w-1/5 aspect-4/3 object-cover rounded-[10px]" />
                            <span className="text-[12px] lg:text-[16px] font-[500] text-[#000000]">{video?.title ?? ""}</span>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}