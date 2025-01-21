'use client'
import { createContext, useContext, useEffect, useState } from 'react'
import { getNFTsForCollection } from '@/utils/api'

interface NFT {
    id: string
    name: string
    price: string
    image: string
    creator: string
    status: 'available' | 'sold'
    type: string
}

interface NFTContextType {
    nfts: NFT[]
    loading: boolean
    error: string | null
}

const NFTContext = createContext<NFTContextType>({
    nfts: [],
    loading: true,
    error: null
})

export function NFTProvider({ children }: { children: React.ReactNode }) {
    const [nfts, setNfts] = useState<NFT[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchNFTs = async () => {
            try {
                const data = await getNFTsForCollection()
                setNfts(data)
                setError(null)
            } catch (error) {
                console.error('Error fetching NFTs:', error)
                setError('Failed to load NFTs')
            } finally {
                setLoading(false)
            }
        }

        fetchNFTs()
    }, []) // Empty dependency array means this runs once on mount

    return (
        <NFTContext.Provider value={{ nfts, loading, error }}>
            {children}
        </NFTContext.Provider>
    )
}

// Custom hook to use NFT context
export function useNFTs() {
    const context = useContext(NFTContext)
    if (context === undefined) {
        throw new Error('useNFTs must be used within a NFTProvider')
    }
    return context
}