import Image from 'next/image'
import Link from 'next/link'
import TruncatedText from '../common/TruncatedText';
import { usePurchaseContext } from '@/contexts/PurchaseContext';
import FavoriteButton from './FavoriteButton';

interface NFT {
    id: string;
    name: string;
    price: string;
    image: string;
    creator: string;
    status: 'available' | 'sold';
    type: string;
}

interface NFTCardProps {
    nft: NFT;
}

export default function NFTCard({ nft }: NFTCardProps) {
    const { isPurchased } = usePurchaseContext()
    const hasPurchased = isPurchased(nft.id)

    const formatPrice = (price: string) => {
        if (price.includes('Floor')) {
            return price;
        }
        if (price === 'Price unavailable') {
            return price;
        }
        return `${parseFloat(price).toFixed(4)} ETH`;
    };

    return (
        <Link href={`/nft/${nft.id}`}>
            <div className="w-full max-w-[300px] bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="relative w-[300px] h-[200px]">

                    <Image
                        src={nft.image}
                        alt={nft.name}
                        fill
                        className="object-cover"
                        priority={false}
                    />
                    <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-sm ${hasPurchased ? 'bg-red-500' : 'bg-green-500'
                        } text-white`}>
                        {hasPurchased ? 'Sold Out' : 'Available'}
                    </div>
                </div>

                <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2 truncate"><TruncatedText text={nft.name} /></h3>
                    <p className="text-gray-600 mb-2 text-sm truncate">
                        Creator: <TruncatedText text={nft.creator} />
                    </p>
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-1">
                            <svg className="w-4 h-4" viewBox="0 0 33 53" fill="none">
                                <path d="M16.3576 0.666687L16.0095 1.85009V36.1896L16.3576 36.5371L32.2976 27.115L16.3576 0.666687Z" fill="#343434" />
                                <path d="M16.3578 0.666687L0.417816 27.115L16.3578 36.5371V19.8699V0.666687Z" fill="#8C8C8C" />
                            </svg>
                            <span className={`font-bold ${nft.price.includes('Floor') ? 'text-green-600' : 'text-blue-600'}`}>
                                {formatPrice(nft.price)}
                            </span>
                        </div>


                        <FavoriteButton nftId={nft.id} />

                        {/* <span className={`px-2 py-1 rounded text-sm ${hasPurchased
                            ? 'bg-blue-100 text-blue-600'
                            : nft.status === 'sold'
                                ? 'bg-red-100 text-red-600'
                                : 'bg-green-100 text-green-600'
                            }`}>
                            {hasPurchased ? 'Purchased' : nft.status === 'sold' ? 'Sold Out' : 'Available'}
                        </span> */}
                    </div>
                </div>
            </div>
        </Link>
    )
}