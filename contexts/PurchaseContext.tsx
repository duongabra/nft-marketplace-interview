'use client'
import { createContext, useContext, useState, useEffect, useCallback } from 'react'

interface PurchaseContextType {
    purchasedNFTs: string[]
    markNFTAsPurchased: (nftId: string) => void
    isPurchased: (nftId: string) => boolean
}

const PurchaseContext = createContext<PurchaseContextType>({
    purchasedNFTs: [],
    markNFTAsPurchased: () => { },
    isPurchased: () => false
})

export function PurchaseProvider({ children }: { children: React.ReactNode }) {
    const [purchasedNFTs, setPurchasedNFTs] = useState<string[]>([])

    useEffect(() => {
        const saved = localStorage.getItem('purchasedNFTs')
        if (saved) {
            setPurchasedNFTs(JSON.parse(saved))
        }
    }, [])

    const markNFTAsPurchased = useCallback((nftId: string) => {
        setPurchasedNFTs(prev => {
            if (prev.includes(nftId)) return prev
            const updated = [...prev, nftId]
            localStorage.setItem('purchasedNFTs', JSON.stringify(updated))
            return updated
        })
    }, [])

    const isPurchased = useCallback((nftId: string) => {
        return purchasedNFTs.includes(nftId)
    }, [purchasedNFTs])

    return (
        <PurchaseContext.Provider value={{
            purchasedNFTs,
            markNFTAsPurchased,
            isPurchased
        }}>
            {children}
        </PurchaseContext.Provider>
    )
}

export function usePurchaseContext() {
    return useContext(PurchaseContext)
}