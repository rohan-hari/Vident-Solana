import { ThirdwebProvider } from '@thirdweb-dev/react/solana';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { StateContextProvider } from '../context';
import Layout from '../components/layout/Layout';
import '../styles/globals.css';

const network = 'devnet';

function MyApp({ Component, pageProps }) {
  return (
    <ThirdwebProvider
      network={network}
      authConfig={{
        authUrl: '/api/auth',
        domain: process.env.NEXT_PUBLIC_DOMAIN,
      }}
    >
      <WalletModalProvider>
        <StateContextProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </StateContextProvider>
      </WalletModalProvider>
    </ThirdwebProvider>
  );
}

export default MyApp;
