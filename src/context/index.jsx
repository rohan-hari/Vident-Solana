import React, { useState, useContext, createContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/layout/Layout';

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const [selectedMenu, setSelectedMenu] = useState('home');
  const [mobileMenu, setMobileMenu] = useState(false);
  const [authRequired, setAuthRequired] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (
      selectedMenu === 'home' ||
      selectedMenu === 'trending' ||
      selectedMenu === 'watch'
    ) {
      setAuthRequired(false);
    } else {
      setAuthRequired(true);
    }
  }, [selectedMenu]);

  return (
    <StateContext.Provider
      value={{
        mobileMenu,
        setMobileMenu,
        selectedMenu,
        setSelectedMenu,
        router,

        isLoading,
        setIsLoading,
      }}
    >
      <Layout authRequired={authRequired}>{children}</Layout>
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
