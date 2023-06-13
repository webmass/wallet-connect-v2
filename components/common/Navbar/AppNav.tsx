import { Web3Provider } from '@ethersproject/providers'
import { useWeb3React } from '@web3-react/core'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/dist/client/router'

import { metamaskInjector, walletConnectV2, coinbaseWallet } from '@app/variables/connectors'

const ConnectionMenuItem = ({ ...props }) => {
  return <button
    {...props}
  />
}

const AppNavConnect = () => {
  const web3react = useWeb3React<Web3Provider>()
  const { account, isActive: active } = web3react

  const { query } = useRouter();

  const userAddress = (query?.viewAddress as string) || account;
  const [isOpen, setIsOpen] = useState(false)
  const [connectBtnLabel, setConnectBtnLabel] = useState('Connect')
  const addressName = userAddress;
  const open = () => setIsOpen(!isOpen)
  const close = () => setIsOpen(false)

  useEffect(() => {
    setConnectBtnLabel(active && userAddress ? addressName : 'Connect')
  }, [active, userAddress, addressName])

  const connectMetamask = () => {
    close()
    metamaskInjector?.activate();
  }

  const connectWalletConnect = () => {
    close()
    walletConnectV2?.activate();
  }

  const connectCoinbaseWallet = () => {
    close()
    coinbaseWallet?.activate();
  }

  return (
    <div>
      <div>Address: {connectBtnLabel}</div>
      <div>
        <ConnectionMenuItem
          onClick={connectMetamask}
        >
          <span>Metamask</span>
        </ConnectionMenuItem>
        <ConnectionMenuItem
          onClick={connectWalletConnect}
        >
          <span>WalletConnect</span>
        </ConnectionMenuItem>
        <ConnectionMenuItem
          onClick={connectCoinbaseWallet}
        >
          <span>Coinbase Wallet</span>
        </ConnectionMenuItem>
      </div>
    </div>
  )
}

export const AppNav = () => {
  return (
    <AppNavConnect />
  )
}

export default AppNav
