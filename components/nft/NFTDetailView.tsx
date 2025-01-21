'use client'
import Image from 'next/image'
import { useNFTTransaction } from '@/hooks/useNFTTransaction'
import { toast } from 'react-hot-toast'
import { useAccount } from 'wagmi'
import TruncatedText from '@/components/common/TruncatedText'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { usePurchaseContext } from '@/contexts/PurchaseContext'
import FavoriteButton from './FavoriteButton'

interface NFTDetailViewProps {
    nft: {
        id: string
        name: string
        description: string
        image: string
        price: string
        creator: string
        status: 'available' | 'sold'
    }
}

export default function NFTDetailView({ nft }: NFTDetailViewProps) {
    const { isConnected } = useAccount()
    const { executePurchase, isLoading } = useNFTTransaction(nft.price, nft.id)
    const { isPurchased } = usePurchaseContext()

    const hasPurchased = isPurchased(nft.id)

    const renderButton = () => {
        if (!isConnected) {
            return <ConnectButton />
        }

        if (hasPurchased) {
            return (
                <button
                    disabled
                    className="px-8 py-3 rounded-lg bg-gray-400 text-white opacity-50 cursor-not-allowed"
                >
                    Purchased
                </button>
            )
        }

        if (nft.status === 'sold') {
            return (
                <button
                    disabled
                    className="px-8 py-3 rounded-lg bg-gray-400 text-white opacity-50 cursor-not-allowed"
                >
                    Sold Out
                </button>
            )
        }

        return isConnected ? (
            <button
                onClick={executePurchase}
                disabled={isLoading}
                className="px-8 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50"
            >
                {isLoading ? 'Processing...' : 'Buy Now'}
            </button>
        ) : (
            <ConnectButton />
        )
    }

    return (
        <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="relative aspect-square w-full rounded-xl overflow-hidden mb-6">
                <Image
                    src={nft.image}
                    alt={nft.name}
                    fill
                    className="object-cover"
                />
            </div>

            <div className="space-y-4">
                <h1 className="text-3xl font-bold"><TruncatedText text={nft.name} /></h1>
                <FavoriteButton nftId={nft.id} />
                <div className="text-gray-600">{nft.description}</div>

                <div className="flex justify-between items-center py-4 border-y border-gray-200">
                    <div>
                        <div className="text-sm text-gray-500">Current Price</div>
                        <div className="text-2xl font-bold">{nft.price} ETH</div>
                    </div>
                    {renderButton()}
                </div>

                <div>
                    <h2 className="text-lg font-semibold mb-2">Details</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <div className="text-sm text-gray-500">Creator</div>
                            <div className="text-sm font-medium">
                                <TruncatedText text={nft.creator} />
                            </div>
                        </div>
                        <div>
                            <div className="text-sm text-gray-500">Token ID</div>
                            <div className="text-sm font-medium">
                                <TruncatedText text={nft.id} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}