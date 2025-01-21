'use client'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount, useBalance } from 'wagmi'

export function ConnectWallet() {
    const { address, isConnected } = useAccount()
    const { data: balance } = useBalance({
        address,
    })

    return (
        <div className="flex items-center gap-4">
            <ConnectButton />
        </div>
    )
}