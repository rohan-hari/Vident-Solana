import React, { useState, useContext, createContext } from 'react';
import { useUser } from '@thirdweb-dev/react/solana';
import { useRouter } from 'next/router';

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const [selectedMenu, setSelectedMenu] = useState('home');
  const [mobileMenu, setMobileMenu] = useState(false);
  const { user, isLoggedIn } = useUser();
  const router = useRouter();

  return (
    <StateContext.Provider
      value={{
        mobileMenu,
        setMobileMenu,
        selectedMenu,
        setSelectedMenu,
        router,
        user,
        isLoggedIn,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
