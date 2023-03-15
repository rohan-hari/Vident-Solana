import { useState, useEffect } from 'react';
import { useStateContext } from '../../context';
import Navbar from '../navbar/Navbar';
import Sidebar from '../sidebar/Sidebar';
import { Oval } from 'react-loader-spinner';

export default function Layout({ children, authRequired }) {
  const {
    setSelectedMenu,
    setMobileMenu,
    router,
    isLoggedIn,
    isLoading,
    setIsLoading,
  } = useStateContext();
  const [isWatchPage, setIsWatchPage] = useState(false);

  const path =
    router.pathname === '/[home]'
      ? router.query.home
      : router.pathname.substring(1);

  useEffect(() => {
    const handleStart = () => {
      setIsLoading(true);
    };

    setSelectedMenu(path === '' ? 'home' : path);
    path === 'watch' ? setIsWatchPage(true) : setIsWatchPage(false);
    setMobileMenu(false);

    const handleComplete = () => {
      setIsLoading(false);
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [router]);

  return (
    <div className="flex flex-col h-screen ">
      <Navbar isWatchPage={isWatchPage} />
      <Sidebar isWatchPage={isWatchPage} />
      <div className={`mt-14 h-full  ${isWatchPage ? '' : 'md:ml-[240px]'}`}>
        {isLoading ? (
          <Oval
            height={60}
            width={60}
            color="#C1F8FF"
            secondaryColor="#7A6EFE"
            strokeWidth={6}
            strokeWidthSecondary={6}
            wrapperClass="flex flex-col items-center justify-center lg:w-11/12 h-full max-h-[600px]"
            visible={isLoading}
          />
        ) : authRequired && !isLoggedIn ? (
          <>You need to login</>
        ) : (
          children
        )}
      </div>
    </div>
  );
}

// isLoading ? (
//   <MutatingDots
//     height="100"
//     width="100"
//     color="#C1F8FF"
//     secondaryColor="#7A6EFE"
//     radius="13"
//     wrapperClass="flex flex-col items-center justify-center h-full max-h-[600px]"
//     visible={isLoading}
//   />
// )
