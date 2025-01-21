'use client'
import { useState } from 'react'
import { useFavoriteContext } from '@/contexts/FavoriteContext'

interface Filters {
    priceRange: string;
    status: string;
    type: string;
    sortBy: string;
    showFavorites: boolean;
}

interface FilterBarProps {
    onFilterChange: (filters: Filters) => void;
}

export default function FilterBar({ onFilterChange }: FilterBarProps) {
    const { hasFavorites } = useFavoriteContext()
    const [filters, setFilters] = useState<Filters>({
        priceRange: '',
        status: '',
        type: '',
        sortBy: '',
        showFavorites: false
    })

    const handleFilterChange = (key: keyof Filters, value: string | boolean) => {
        const newFilters = { ...filters, [key]: value }
        setFilters(newFilters)
        onFilterChange(newFilters)
    }

    return (
        <div className="flex flex-col md:flex-row gap-4">
            <select
                value={filters.sortBy}
                onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <option value="">Sort By</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="name_asc">Name: A to Z</option>
                <option value="name_desc">Name: Z to A</option>
            </select>

            <select
                value={filters.priceRange}
                onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <option value="">Price Range</option>
                <option value="0-0.0002">Under 0.0002 ETH</option>
                <option value="0.0002-0.0005">0.0002 - 0.0005 ETH</option>
                <option value="0.0005+">Above 0.0005 ETH</option>
            </select>

            <select
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
                className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <option value="">Status</option>
                <option value="available">Available</option>
                <option value="sold">Sold</option>
            </select>

            <select
                value={filters.type}
                onChange={(e) => handleFilterChange('type', e.target.value)}
                className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <option value="">Type</option>
                <option value="art">Art</option>
                <option value="collectible">Collectible</option>
                <option value="game">Game Item</option>
                <option value="music">Music</option>
            </select>

            {hasFavorites && (
                <button
                    onClick={() => handleFilterChange('showFavorites', !filters.showFavorites)}
                    className={`px-4 py-2 rounded-lg border ${filters.showFavorites
                        ? 'bg-red-500 text-white border-red-500'
                        : 'border-gray-300'
                        }`}
                >
                    <span className="flex items-center gap-2">
                        <svg
                            className="w-5 h-5"
                            fill={filters.showFavorites ? 'currentColor' : 'none'}
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                            />
                        </svg>
                        Favorites
                    </span>
                </button>
            )}
        </div>
    )
}