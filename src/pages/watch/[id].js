import { useStateContext } from '../../context';
import Feed from '../../components/feed/Feed';
import VideoPlayer from '../../components/video/VideoPlayer';
import WatchDetails from '../../components/video/WatchDetails';

import { IoShareSocialOutline } from 'react-icons/io5';
import { BiDislike } from 'react-icons/bi';
import { AiOutlineLike } from 'react-icons/ai';

export default function () {
  const { router } = useStateContext();
  const { id } = router.query();

  console.log(id);
  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-[1600px] flex flex-col lg:flex-row md:px-4 ">
        <div className="flex flex-col lg:w-[calc(100%-400px)] xl:w-[calc(100%-500px)] mx-4 my-3 lg:my-6 bg-[#0B0B0B] rounded-2xl h-full max-h-full">
          <div className=" ">
            <VideoPlayer />
          </div>
          <div className="flex flex-row items-center justify-between px-2.5 md:px-4">
            <div>
              <div className="font-medium text-lg md:text-xl mt-6 mb-4">
                Top 5 Programming Languages to Learn
              </div>
              <div className="text-[12px] md:text-sm text-white/[0.6] mb-6 mr-2">
                <span className="mr-1 text-white">108,244</span>
                <span className=" mr-1 md:mr-2">Views</span>
                &#x2022;
                <span className="ml-2 mr-1 text-white">452</span>
                <span className=" mr-1 md:mr-2">Likes</span>
                &#x2022;
                <span className="ml-2 text-white">10 </span>
                <span className="">Days ago</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 lg:gap-3 items-center my-2 sm:my-0">
              <div className="flex bg-white/[0.07] p-3 rounded-xl">
                <AiOutlineLike className="h-5 w-5 md:h-6 md:w-6 mr-3" />
                <span className="border-r-2 border-black/[0.7]"></span>
                <BiDislike className="h-5 w-5 lg:h-6 lg:w-6 ml-3" />
              </div>
              <div className=" bg-white/[0.07] p-3 rounded-xl ">
                <span className="text-sm truncate md:text-md">Super Like</span>
              </div>
              <div className=" bg-white/[0.07] p-3 rounded-xl">
                <IoShareSocialOutline className="h-5 w-5 lg:h-6 lg:w-6" />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col pt-2 pb-4 lg:py-6 px-4 lg:w-[400px] xl:w-[500px] min-h-full">
          <WatchDetails />
        </div>
      </div>
      <div className="px-5 md:px-8">
        <div className="text-2xl mb-6">Related Videos</div>
        <Feed />
      </div>
    </div>
  );
}
