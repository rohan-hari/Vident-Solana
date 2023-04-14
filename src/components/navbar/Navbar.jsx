import { useStateContext } from '../../context';
import SearchBar from './SearchBar';

import { SlMenu } from 'react-icons/sl';
import { CgClose } from 'react-icons/cg';

export default function Navbar({ isWatchPage }) {
  const { mobileMenu, setMobileMenu, user, isLoggedIn } = useStateContext();

  const handleSignIn = async () => {};

  const mobileMenuToggle = () => {
    setMobileMenu(!mobileMenu);
  };

  return (
    <div
      className="fixed w-full top-0 z-10 flex flex-row items-center justify-between h-12 md:h-[60px]  
      px-2 py-4 md:px-6 border-b border-white/[0.2] bg-[#141414] select-none"
    >
      <div className="flex h-5 items-center">
        <div
          className={`flex cursor-pointer items-center justify-center h-10 w-10 rounded-full hover:bg-[#303030]/[0.6] ${
            isWatchPage ? '' : 'md:hidden md:mr-6 '
          }`}
          onClick={mobileMenuToggle}
        >
          {mobileMenu ? (
            <CgClose className="text-white " />
          ) : (
            <SlMenu className="text-white" />
          )}
        </div>

        <a href="/" className="flex h-6 items-center">
          <img
            className="h-full hidden md:block"
            src="/images/vident-logo.png"
            alt="Vident"
          />
          <img
            className="h-full md:hidden"
            src="/images/vident-logo-mobile.png"
            alt="Vident"
          />
        </a>
      </div>
      <SearchBar />
      <div className="flex items-center">
        <div className="flex items-center justify-center px-4 py-1 rounded-lg cursor-pointer ">
          <button
            className={`bg-[#6F6BF2] px-4 py-1 rounded-full ${
              isLoggedIn
                ? 'bg-transparent border border-[#6F6BF2] '
                : 'bg-[#6F6BF2]'
            }`}
            onClick={handleSignIn}
          >
            Connect
          </button>
          {/* <div className="flex h-9 w-9 overflow-hidden rounded-full md:ml-4">
            <img
              alt=""
              src="https://xsgames.co/randomusers/assets/avatars/male/22.jpg"
            />
          </div> */}
        </div>
      </div>
    </div>
  );
}
