export const POPULAR_COLLECTIONS = {
    BAYC: '0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D',
};

// Hàm tạo giá ngẫu nhiên từ 0.001 đến 1 ETH
function generateRandomPrice(): string {
    const min = 0.0001;
    const max = 0.0009;
    const randomPrice = min + Math.random() * (max - min);
    // Chỉ trả về số, không thêm "ETH"
    return randomPrice.toFixed(4);
}

const ALCHEMY_API_KEY = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY;
const ALCHEMY_BASE_URL = `https://eth-mainnet.g.alchemy.com/nft/v2/${ALCHEMY_API_KEY}`;

export async function getNFTsForCollection(
    contractAddress: string = POPULAR_COLLECTIONS.BAYC,
    limit: number = 20
) {
    try {
        const response = await fetch(
            `${ALCHEMY_BASE_URL}/getNFTsForContract?` +
            `contractAddress=${contractAddress}&` +
            `withMetadata=true&` +
            `pageSize=${limit}`,
            {
                headers: {
                    'Accept': 'application/json'
                }
            }
        );

        if (!response.ok) throw new Error('Alchemy API call failed');
        const data = await response.json();

        return data.nfts.map((nft: any) => {
            // Chỉ lưu giá số, không thêm "ETH"
            const price = generateRandomPrice();
            const status = nft.owners && nft.owners.length > 0 ? 'sold' : 'available';

            return {
                id: nft.id.tokenId,
                name: nft.title || `NFT #${nft.id.tokenId}`,
                price,  // Chỉ lưu giá số
                image: nft.media[0]?.gateway || '/placeholder.png',
                creator: nft.contract.address,
                status,
                type: nft.metadata?.properties?.category || 'collectible'
            };
        });
    } catch (error) {
        console.error('Error fetching NFTs:', error);
        throw error;
    }
}

// Thêm vào file api.ts
export async function getNFTDetails(tokenId: string) {
    try {
        const response = await fetch(
            `${ALCHEMY_BASE_URL}/getNFTMetadata?` +
            `contractAddress=${POPULAR_COLLECTIONS.BAYC}&` +
            `tokenId=${tokenId}`,
            {
                headers: {
                    'Accept': 'application/json'
                }
            }
        );

        if (!response.ok) throw new Error('Alchemy API call failed');
        const nft = await response.json();

        // Tạo giá ngẫu nhiên cho NFT (chỉ số, không có "ETH")
        const price = generateRandomPrice();

        // Kiểm tra owner của NFT
        const status = nft.owners && nft.owners.length > 0 ? 'sold' : 'available';
        // Hoặc có thể dùng: nft.ownership?.owner !== null

        return {
            id: tokenId,
            name: nft.title || `NFT #${tokenId}`,
            description: nft.description || 'No description available',
            price,
            image: nft.media[0]?.gateway || '/placeholder.png',
            creator: nft.contract.address,
            owner: nft.ownership?.owner || null,  // Thêm thông tin owner
            status,
            attributes: nft.metadata?.attributes || []
        };
    } catch (error) {
        console.error('Error fetching NFT details:', error);
        throw error;
    }
}