'use client'
import { createContext, useContext, useState, useEffect, useCallback } from 'react'

interface FavoriteContextType {
    favoriteNFTs: string[]
    toggleFavorite: (nftId: string) => void
    isFavorite: (nftId: string) => boolean
    hasFavorites: boolean
}

const FavoriteContext = createContext<FavoriteContextType>({
    favoriteNFTs: [],
    toggleFavorite: () => { },
    isFavorite: () => false,
    hasFavorites: false
})

export function FavoriteProvider({ children }: { children: React.ReactNode }) {
    const [favoriteNFTs, setFavoriteNFTs] = useState<string[]>([])

    useEffect(() => {
        const saved = localStorage.getItem('favoriteNFTs')
        if (saved) {
            setFavoriteNFTs(JSON.parse(saved))
        }
    }, [])

    const toggleFavorite = useCallback((nftId: string) => {
        setFavoriteNFTs(prev => {
            const updated = prev.includes(nftId)
                ? prev.filter(id => id !== nftId)
                : [...prev, nftId]
            localStorage.setItem('favoriteNFTs', JSON.stringify(updated))
            return updated
        })
    }, [])

    const isFavorite = useCallback((nftId: string) => {
        return favoriteNFTs.includes(nftId)
    }, [favoriteNFTs])

    return (
        <FavoriteContext.Provider value={{
            favoriteNFTs,
            toggleFavorite,
            isFavorite,
            hasFavorites: favoriteNFTs.length > 0
        }}>
            {children}
        </FavoriteContext.Provider>
    )
}

export function useFavoriteContext() {
    return useContext(FavoriteContext)
}