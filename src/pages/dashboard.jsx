import { AiOutlineEdit } from 'react-icons/ai';
import { useStateContext } from '../context';

export default function Studio() {
  // const { setIsLoading } = useStateContext();

  // setIsLoading(false);

  return (
    <div className="flex flex-row justify-center h-full p-3 md:p-4">
      <div className="w-full max-w-screen-2xl pt-2">
        <span className="text-3xl font-medium text-white/[0.85]">
          Channel Dashboard
        </span>
        <div className="flex bg-white/[0.06] py-4 px-6 my-6 rounded-2xl text-white/[0.8]">
          <div className="flex-1 flex flex-col gap-2 items-start ">
            <div className="font-medium text-2xl">Subscribed</div>
            <div className="text-xl ">455</div>
          </div>
          <div className="flex-1 flex flex-col gap-2 items-start ">
            <div className="font-medium text-2xl">Total views</div>
            <div className="text-xl">13560</div>
          </div>
          <div className="flex-1 flex flex-col gap-2 items-start ">
            <div className="font-medium text-2xl">Total Earnings</div>
            <div className="text-xl text-green-500">$114</div>
          </div>
        </div>
        <div className="bg-[#0B0B0B] rounded-2xl px-5 py-1 overflow-x-auto ">
          <table className="w-full">
            <thead>
              <tr className=" text-left border-b border-white/[0.3]">
                <th className="font-normal w-1/2 min-w-[250px]">Video</th>
                <th className="font-normal px-2 md:p-4">Visibility</th>
                <th className="font-normal px-2 md:p-4">Views</th>
                <th className="font-normal px-2 md:p-4">Super Likes</th>
                <th className="font-normal px-2 md:p-4">Rewards</th>
                <th className="font-normal ">Added</th>
              </tr>
            </thead>
            {[...Array(2)].map((value, index) => (
              <tbody>
                <tr
                  className="text-left font-light border-b-2 border-white/[0.07] 
                  group hover:bg-gradient-to-r from-[#0B0B0B] via-white/[0.1] to-[#0B0B0B]"
                >
                  <td className="flex-1 flex  items-center w-full min-w-[250px]">
                    <img
                      src="https://i.ytimg.com/vi/CPNlzLPNLY0/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAlYWKzptPp42sj7CE3cClyCQ65-A"
                      alt=""
                      className="h-12 w-24 md:h-16 md:w-28 m-4 ml-0 rounded-md"
                    />
                    Top 5 Programming Languages
                  </td>
                  <td className="p-2 md:p-5">Public</td>
                  <td className="p-2 md:p-5">14531</td>
                  <td className="md:p-5">13 FTM</td>
                  <td className="md:p-5">625 FTM</td>
                  <td className="md:">
                    <span className="group-hover:hidden">13-Sep-2022</span>
                    <button className="hidden group-hover:flex bg-[#6F6BF2] w-[84px] px-3 py-1 rounded-full">
                      <AiOutlineEdit className="h-5 w-5 mt-0.5 mr-2" />
                      Edit
                    </button>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      </div>
    </div>
  );
}
