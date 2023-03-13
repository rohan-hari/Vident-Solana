import React from 'react';
import { useStateContext } from '../../context';
import { menuList } from '../../lib/constants';
import MenuItem from './MenuItem';

export default function Sidebar({ isWatchPage }) {
  const { selectedMenu, mobileMenu, router } = useStateContext();

  const navigateTo = (slug) => {
    if (slug === 'home') {
      router.push(`/`);
    } else if (slug === 'profile') {
      router.push(`/channel`);
    } else router.push(`/${slug}`);
  };

  return (
    <>
      <div
        className={`fixed md:top-[60px] md:block w-[240px] overflow-y-auto h-full py-5 
         transition-all bg-[#141414]  ${
           isWatchPage
             ? 'translate-x-[-240px]'
             : ' md:translate-x-0 md:border-0'
         } ${
          mobileMenu
            ? 'top-[48px] translate-x-[0px] border-r border-white/[0.2] z-10'
            : 'translate-x-[-240px]'
        }`}
      >
        <div className="flex px-2 md:px-4 flex-col">
          {menuList.map((item) => {
            return (
              <React.Fragment key={item.slug}>
                <MenuItem
                  text={item.name}
                  icon={item.icon}
                  className={`${
                    selectedMenu === item.slug ? 'bg-[#6F6BF2] ' : ''
                  }`}
                  action={() => {
                    navigateTo(item.slug);
                  }}
                />
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </>
  );
}
