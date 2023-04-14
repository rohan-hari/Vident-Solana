import { useState } from 'react';
import Feed from '../../components/feed/Feed';
import { useStateContext } from '../../context';

export default function () {
  const [activeTab, setActiveTab] = useState('videos');
  const { router } = useStateContext();

  return (
    <div className="flex flex-row justify-center h-full p-3 md:p-4">
      <div className="w-full max-w-screen-2xl">
        <div
          className="w-full h-56 lg:h-60 xl:h-72 bg-bottom rounded-3xl"
          style={{
            backgroundImage: `url('/images/cover-image.jpg')`,
          }}
        ></div>
        <div className="flex flex-row justify-between mt-6 mb-3">
          <div className="flex rounded-lg cursor-pointer text-white">
            <img
              alt=""
              src="https://xsgames.co/randomusers/assets/avatars/male/22.jpg"
              className="h-16 w-16 overflow-hidden rounded-full "
            />
            <div className="flex flex-col ml-4">
              <span className="font-medium text-2xl">Future Coders</span>
              <span className="text-white/[0.6]">200k subscribers</span>
            </div>
          </div>
          <button
            onClick={() => router.push('/dashboard')}
            className="flex items-center bg-[#6F6BF2] px-5 my-2 rounded-full border-b-4 border-r-4 border-[#4541c0]"
          >
            Manage videos
          </button>
        </div>
        <div className="pt-3">
          <button
            className={`${
              activeTab === 'videos' ? 'bg-[#6F6BF2]' : ' bg-white/[0.1]'
            }  h-10 px-5 rounded-full mr-3`}
            onClick={() => setActiveTab('videos')}
          >
            Videos
          </button>
          <button
            className={`${
              activeTab === 'about' ? 'bg-[#6F6BF2]' : ' bg-white/[0.1]'
            }  h-10 px-5 rounded-full`}
            onClick={() => setActiveTab('about')}
          >
            About
          </button>
          {activeTab === 'videos' && (
            <div className="my-8">
              <Feed />
            </div>
          )}
          {activeTab === 'about' && (
            <div className="px-6 my-6 py-6 h-full rounded-3xl bg-[#0B0B0B]">
              High-intensity ⚡ code tutorials to help you build & ship your app
              faster.
              <br />
              <br />
              Subscribe for new videos every week covering intermediate to
              advanced lessons about JavaScript, Flutter, Firebase, and modern
              app development.
              <br />
              <br />
              The original home of #100SecondsOfCode and #CodeThisNotThat.
              Created by Jeff Delaney. <br />
              <br />
              Building an app? Get project support, advanced full courses, and
              more at https://fireship.io`
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
