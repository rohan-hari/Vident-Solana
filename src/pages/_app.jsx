import { StateContextProvider } from '../context';
import { WalletProvider } from '@tronweb3/tronwallet-adapter-react-hooks';

import '../styles/globals.css';
import '../styles/video-player-styles.css';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <WalletProvider autoConnect={false}>
      <StateContextProvider>
        <Component {...pageProps} />
      </StateContextProvider>
    </WalletProvider>
  );
}

export default MyApp;
