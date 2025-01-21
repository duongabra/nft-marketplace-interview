import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { sepolia } from 'viem/chains'
import { http } from 'wagmi'

const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || ''

const config = getDefaultConfig({
    appName: 'NFT Marketplace',
    projectId: projectId,
    chains: [sepolia],
    transports: {
        [sepolia.id]: http()
    },
    ssr: true
})

export const wagmiConfig = config