'use client'
import { useFavoriteContext } from '@/contexts/FavoriteContext'

export default function FavoriteButton({ nftId }: { nftId: string }) {
    const { isFavorite, toggleFavorite } = useFavoriteContext()
    const isFav = isFavorite(nftId)

    return (
        <button
            onClick={(e) => {
                toggleFavorite(nftId)
                e.preventDefault()
            }}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
            <svg
                className={`w-6 h-6 ${isFav ? 'text-red-500 fill-current' : 'text-gray-500'}`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
            </svg>
        </button>
    )
}