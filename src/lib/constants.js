import React from 'react';

import {
  AiOutlineUser,
  AiOutlineFire,
  AiOutlineCloudUpload,
} from 'react-icons/ai';
import { RiDashboardLine } from 'react-icons/ri';
import { FiHome, FiSettings } from 'react-icons/fi';
import { BsUnlock } from 'react-icons/bs';
import { MdOndemandVideo } from 'react-icons/md';

export const menuList = [
  {
    name: 'Home',
    slug: 'home',
    page: 'Homepage',
    icon: <FiHome />,
  },
  {
    name: 'Trending',
    slug: 'trending',
    page: 'Homepage',
    icon: <AiOutlineFire />,
  },

  {
    name: 'Subscribed',
    slug: 'subscribed',
    page: 'Homepage',
    icon: <MdOndemandVideo />,
  },
  {
    name: 'Unlocked content',
    slug: 'unlocked_content',
    page: 'Homepage',
    icon: <BsUnlock />,
  },
  {
    name: 'Upload',
    slug: 'upload',
    icon: <AiOutlineCloudUpload />,
  },

  {
    name: 'Profile',
    slug: 'profile',
    icon: <AiOutlineUser />,
  },
  {
    name: 'Dashboard',
    slug: 'dashboard',
    icon: <RiDashboardLine />,
  },

  {
    name: 'Settings',
    slug: 'settings',
    icon: <FiSettings />,
  },
];
