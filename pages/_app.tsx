import "@/styles/globals.css"; // CSS doesnt really matter now
import type { AppProps } from "next/app";
import { WagmiConfig, configureChains, createClient, mainnet } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { polygonMumbai } from "wagmi/chains";
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'

// configure the chains and provider that you want to use for your app, 
// keep in mind that you're allowed to pass any EVM-compatible chain.
// It is also encouraged that you pass both alchemyProvider and infuraProvider.
const { chains, provider, webSocketProvider } = configureChains(
  [mainnet, polygonMumbai],
  [publicProvider()]
);

// This creates a wagmi client instance of createClient 
// and passes in the provider and webSocketProvider.

const client = createClient({
  autoConnect: false,
  provider,
  webSocketProvider,
  connectors: [ // connectors is to connect your wallet, defaults to InjectedConnector();
    new MetaMaskConnector({ chains }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: 'wagmi',
      },
    }),
    new WalletConnectConnector({
      chains,
      options: {
        projectId: '...',
      },
    }),
    new InjectedConnector({
      chains,
      options: {
        name: 'Injected',
        shimDisconnect: true,
      },
    }),
  ],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    // Wrap your application with the WagmiConfig component 
    // and pass the client instance as a prop to it.
    <WagmiConfig client={client}>
      <Component {...pageProps} />
    </WagmiConfig>
  );
}