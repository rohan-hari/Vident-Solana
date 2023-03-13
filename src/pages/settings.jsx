import React from 'react';
import FormField from '../components/input/FormField';

import { MdOutlineEdit } from 'react-icons/md';

export default function Settings() {
  return (
    <div className="flex flex-row justify-center h-full p-3 md:p-4">
      <div className="w-full max-w-screen-2xl">
        <div
          className="relative w-full h-56 lg:h-60 xl:h-72 bg-bottom rounded-3xl"
          style={{
            backgroundImage: `url('/images/cover-image.jpg')`,
          }}
        >
          <span className="absolute flex flex-row items-center bottom-4 right-4 px-5 py-2.5 bg-black rounded-xl border-2 border-white/[0.6]">
            <MdOutlineEdit className="mr-2 h-5 w-5" />
            Edit
          </span>
        </div>
        <div className="text-3xl font-medium my-4">Settings</div>
        <div className="md:flex md:flex-row md:gap-8 xl:gap-12">
          <div className="mb-4">
            <div className="font-medium text-white/[0.8] mb-2">Avatar</div>
            <div className="h-52 w-52 md:h-56 md:w-56 lg:h-[280px] lg:w-[280px] bg-white/[0.07] p-12 rounded-2xl group cursor-pointer">
              <div className="relative">
                <img
                  className="rounded-full "
                  alt=""
                  src="https://xsgames.co/randomusers/assets/avatars/male/22.jpg"
                />
                <div className="hidden absolute inset-0 group-hover:flex items-center justify-center group-hover:bg-black/[0.6] rounded-full ">
                  <MdOutlineEdit className="h-1/6 w-1/6" />
                </div>
              </div>
            </div>
          </div>
          <div className="w-full mt-1">
            <FormField
              labelName="Channel name"
              isRequired
              placeholder="Give a name for your channel"
              inputType="text"
            />
            <FormField
              labelName="About"
              isTextArea
              placeholder="Give a name for your channel"
            />
            <button className="px-12 py-2 bg-[#6F6BF2] rounded-xl">Save</button>
          </div>
        </div>
      </div>
    </div>
  );
}
