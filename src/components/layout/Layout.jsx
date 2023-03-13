import { useState, useEffect } from 'react';
import { useStateContext } from '../../context';
import Navbar from '../navbar/Navbar';
import Sidebar from '../sidebar/Sidebar';

export default function ({ children }) {
  const { setSelectedMenu, setMobileMenu, router } = useStateContext();
  const [isWatchPage, setIsWatchPage] = useState(false);

  const path =
    router.pathname === '/[home]'
      ? router.query.home
      : router.pathname.substring(1);

  useEffect(() => {
    setSelectedMenu(path === '' ? 'home' : path);
    path === 'watch' ? setIsWatchPage(true) : setIsWatchPage(false);
    setMobileMenu(false);
  }, [path, setSelectedMenu, setMobileMenu]);

  return (
    <div className="flex flex-col h-screen">
      <Navbar isWatchPage={isWatchPage} />
      <Sidebar isWatchPage={isWatchPage} />
      <div className={`mt-14 h-full ${isWatchPage ? '' : 'md:ml-[240px]'}`}>
        {children}
      </div>
    </div>
  );
}
