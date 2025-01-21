'use client'
import { useEffect, useState } from 'react'
import { getNFTDetails } from '@/utils/api'
import NFTDetailView from '@/components/nft/NFTDetailView'
import TransactionHistory from '@/components/nft/TransactionHistory'
import LoadingSpinner from '@/components/common/LoadingSpinner'
import { useParams } from 'next/navigation'

export default function NFTDetailPage() {
    const params = useParams()
    const [nft, setNft] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchNFT = async () => {
            try {
                const tokenId = params?.id as string
                if (!tokenId) return

                const data = await getNFTDetails(tokenId)
                setNft(data)
            } catch (error) {
                console.error('Error fetching NFT:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchNFT()
    }, [params?.id])

    if (loading) return <LoadingSpinner />
    if (!nft) return <div>NFT not found</div>

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <NFTDetailView nft={nft} />
                <TransactionHistory nftId={params.id as string} />
            </div>
        </div>
    )
}