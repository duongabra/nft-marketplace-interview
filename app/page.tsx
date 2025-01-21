'use client'
import { useState } from 'react'
import NFTGrid from "@/components/nft/NFTGrid"
import SearchBar from "@/components/nft/SearchBar"
import FilterBar from "@/components/nft/FilterBar"

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filters, setFilters] = useState({
    priceRange: '',
    status: '',
    type: ''
  })

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    // Implement search logic
  }

  const handleFilter = (newFilters: typeof filters) => {
    setFilters(newFilters)
    // Implement filter logic
  }

  return (
    <div className="max-w-[1440px] mx-auto px-4 py-8">
      <section className="mb-8">
        <p className="text-lg text-gray-600">
          Discover, collect, and sell extraordinary NFTs
        </p>
      </section>

      <section className="mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <SearchBar onSearch={handleSearch} />
          <FilterBar onFilterChange={handleFilter} />
        </div>
      </section>

      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Featured NFTs</h2>
        </div>
        <NFTGrid searchQuery={searchQuery} filters={filters} />
      </section>
    </div>
  )
}