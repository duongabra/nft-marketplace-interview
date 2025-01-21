'use client'
import NFTCard from '@/components/nft/NFTCard';
import { useFavoriteContext } from '@/contexts/FavoriteContext';
import { useNFTs } from '@/contexts/NFTContext';
import { usePurchaseContext } from '@/contexts/PurchaseContext';

interface Filters {
    priceRange?: string;
    status?: string;
    type?: string;
    sortBy?: string;
    showFavorites?: boolean;
}

interface NFTGridProps {
    searchQuery?: string;
    filters?: Filters;
}

export default function NFTGrid({ searchQuery, filters }: NFTGridProps) {
    const { nfts, loading, error } = useNFTs();
    const { isPurchased } = usePurchaseContext();
    const { isFavorite, hasFavorites } = useFavoriteContext();


    console.log('filters', filters)

    const processNFTs = () => {
        let processed = nfts.filter(nft => {
            if (searchQuery && !nft.name.toLowerCase().includes(searchQuery.toLowerCase())) {
                return false;
            }

            if (filters?.status) {
                const actualStatus = isPurchased(nft.id) ? 'sold' : nft.status;

                if (actualStatus !== filters.status) {
                    return false;
                }
            }

            if (filters?.type && nft.type !== filters.type) {
                return false;
            }

            if (filters?.priceRange) {
                const price = parseFloat(nft.price);

                console.log('filters', filters, nft)

                const [min, max] = filters.priceRange.split('-').map(Number);

                if (filters.priceRange === '10+') {
                    if (price < 10) return false;
                } else {
                    if (price < min || price > max) return false;
                }
            }

            // Filter favorites
            if (filters?.showFavorites && !isFavorite(nft.id)) {
                return false;
            }

            return true;
        });


        if (filters?.sortBy) {
            processed.sort((a, b) => {
                switch (filters.sortBy) {
                    case 'price_asc':
                        return parseFloat(a.price) - parseFloat(b.price);
                    case 'price_desc':
                        return parseFloat(b.price) - parseFloat(a.price);
                    case 'name_asc':
                        return a.name.localeCompare(b.name);
                    case 'name_desc':
                        return b.name.localeCompare(a.name);
                    default:
                        return 0;
                }
            });
        }

        return processed;
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center text-red-500 py-10">
                {error}
            </div>
        );
    }

    const filteredNFTs = processNFTs();

    if (filteredNFTs.length === 0) {
        return (
            <div className="text-center py-10">
                No NFTs found
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {filteredNFTs.map((nft) => (
                <NFTCard key={nft.id} nft={nft} />
            ))}
        </div>
    );
}