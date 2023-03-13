import React, { useState } from 'react';

import { FiUserPlus } from 'react-icons/fi';
import { FcLike } from 'react-icons/fc';

export default function VideoDetailsBox() {
  const [activeTab, setActiveTab] = useState('description');
  // const sponsor = () => {
  //   console.log('Give an amount');
  // };
  return (
    <div className="bg-[#0B0B0B] p-4 rounded-2xl h-full">
      <div className="flex flex-row justify-between pb-5 ">
        <div className="flex flex-row items-center mr-2">
          <img
            alt=""
            className="h-12 w-12 rounded-full mr-3"
            src="https://xsgames.co/randomusers/assets/avatars/male/22.jpg"
          />
          <div className="flex flex-col">
            <span className="text-2xl">Future coders</span>
            <span className="text-sm text-white/[0.6]">200 Subscribers</span>
          </div>
        </div>
        <div className="flex flex-row items-center">
          <div className=" bg-white/[0.07] p-3 rounded-xl mr-3">
            <FiUserPlus className="h-5 w-5" />
          </div>
          <div className=" bg-white/[0.07] p-3 rounded-xl ">
            <FcLike className="h-5 w-5" />
          </div>
        </div>
      </div>

      <div className="text-sm text-white/[0.3]">
        <button
          className={`${
            activeTab === 'description' ? 'text-white pb-1.5 border-b' : ''
          }  mr-2`}
          onClick={() => setActiveTab('description')}
        >
          Description
        </button>
        <button
          className={`${
            activeTab === 'comments' ? 'text-white pb-1.5 border-b' : ''
          }  ml-2`}
          onClick={() => setActiveTab('comments')}
        >
          Comments
        </button>
        <hr className=" border-white/[0.3]" />
      </div>
      {activeTab === 'description' && (
        <div className="my-4 pr-2 text-sm h-full max-h-[370px] xl:max-h-[450px] 2xl:max-h-[535px] overflow-y-auto ">
          In this one video, learn how to develop a fully functional full-stack
          MERN dashboard application with complete CRUD functionalities,
          authentication, pagination, sorting, filtering, and more!
          <br />
          <br />
          ⭐ refine - https://github.com/refinedev/refine
          <br />
          💻 GitHub Code Client - https://github.com/refinedev/refine/t...
          <br />
          💻 GitHub Code Server - https://github.com/refinedev/refine/t...
          <br />
          <br />
          <br />
          📙FREE Ultimate MERN Guide: https://resource.jsmastery.pro/mern-g...
          <br />
          <br />
          <br />
          📚 Materials/References: GitHub Gist (Code) -
          https://gist.github.com/adrianhajdin/...
          <br />
          Assets - https://drive.google.com/file/d/1KsXj...
          <br />
          Interfaces - https://drive.google.com/file/d/1ibOH...
          <br />
          Figma design - https://www.figma.com/file/QLU3mZJOsm...
          <br />
          Google console - https://console.cloud.google.com/
          <br />
          <br />
          <br />
          Alongside building this great application, you'll also learn the
          following:
          <br />
          1. Node.js, Express.js, MongoDB, and React.js together form the
          powerful MERN stack
          <br />
          2. Material UI: The most popular UI Component Kit nowadays
          <br />
          3. TypeScript: Yep, you heard that right; we’ll use TypeScript on this
          project! No previous typescript knowledge is required
          <br />
          4. You’ll learn how to transform a Figma design into a fully
          functioning website
          <br />
          5. You’ll also learn how to optimize images and store them on the
          cloud using Cloudinary
          <br />
          6. Provide a quick and easy way for your users to log in and register
          using Google Auth
          <br />
          7. Most importantly, you’ll learn how to build React-based CRUD
          applications quickly using refine.
          <br />
          <br />
          <br />
          💻 Join our Discord Community - https://discord.gg/n6EdbFJ
          <br />
          🐦 Follow us on Twitter: https://twitter.com/jsmasterypro
          <br />
          🖼️ Follow us on Instagram: https://instagram.com/javascriptmastery
          <br />
        </div>
      )}
      {activeTab === 'comments' && (
        <div className="my-4 pr-2 text-sm h-full max-h-[370px] xl:max-h-[450px] 2xl:max-h-[535px] ">
          <div className="h-full max-h-[340px] xl:max-h-[410px] 2xl:max-h-[490px]  mb-2 lg:mb-4 overflow-y-auto"></div>
          <form className="flex w-full">
            <input
              type="text"
              id="comment"
              name="comment"
              rows="4"
              className="w-full px-4 py-2 "
            />
            <button type="button" className="px-4 py-2 text-sm border">
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
