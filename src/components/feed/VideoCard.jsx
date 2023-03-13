import React from 'react';
import moment from 'moment';
import { AiOutlineEye } from 'react-icons/ai';

export default function VideoCard({ title, imageSrc, views, createdAt }) {
  // const videoLengthInSeconds = moment()
  //   ?.startOf('day')
  //   ?.seconds(282)
  //   ?.format('H:mm:ss');
  return (
    <div className="flex flex-wrap justify-start bg-[#0B0B0B] rounded-3xl mb-2">
      <div className="w-full">
        <img
          src={imageSrc}
          alt=""
          className="object-cover w-full min-w-[200px] max-h-[250px] md:h-[200px] 2xl:h-[215px] rounded-t-3xl"
        />
      </div>
      <div className="flex pt-3 pb-5 px-5 w-full">
        <div className="flex flex-col w-full">
          <h4 className="font-medium text-white mb-2 truncate">{title}</h4>

          <a href="/" className=" text-[#9891ff] text-sm text-decoration-none">
            FutureCoders
          </a>
          <hr className="my-3 border-white/[0.2]" />
          <div className="flex flex-wrap justify-between text-white/[0.6] text-sm ">
            <span className="capitalize">{moment(createdAt).fromNow()}</span>
            <div className="flex items-center ">
              <span className="mr-1">{views}</span>
              <AiOutlineEye className="h-4 w-4 " />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
