import { ThirdwebProvider } from '@thirdweb-dev/react/solana';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { StateContextProvider } from '../context';

import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <ThirdwebProvider
      network="devnet"
      authConfig={{
        authUrl: '/api/auth',
        domain: process.env.NEXT_PUBLIC_DOMAIN,
      }}
    >
      <WalletModalProvider>
        <StateContextProvider>
          <Component {...pageProps} />
        </StateContextProvider>
      </WalletModalProvider>
    </ThirdwebProvider>
  );
}

export default MyApp;
