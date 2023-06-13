
import { Web3ReactProvider } from '@web3-react/core'
import { AppProps } from 'next/app'
import { SWRConfig } from 'swr'
import React from 'react';
import { metamaskHooks, metamaskInjector, walletConnectV2, walletConnectV2Hooks, coinbaseWallet, coinbaseWalletHooks } from '@app/variables/connectors'

const App = ({ Component, pageProps }: AppProps) => {

  return (
    <Web3ReactProvider connectors={
      [
        [metamaskInjector, metamaskHooks],
        [walletConnectV2, walletConnectV2Hooks],
        [coinbaseWallet, coinbaseWalletHooks],
      ]
    }>
      <Component {...pageProps} />
    </Web3ReactProvider>
  )
}

export default App
