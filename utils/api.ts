export const POPULAR_COLLECTIONS = {
    BAYC: '0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D',
};

function generateRandomPrice(): string {
    const min = 0.0001;
    const max = 0.0009;
    const randomPrice = min + Math.random() * (max - min);
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
            const price = generateRandomPrice();
            const status = nft.owners && nft.owners.length > 0 ? 'sold' : 'available';

            return {
                id: nft.id.tokenId,
                name: nft.title || `NFT #${nft.id.tokenId}`,
                price,
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

        const price = generateRandomPrice();

        const status = nft.owners && nft.owners.length > 0 ? 'sold' : 'available';

        return {
            id: tokenId,
            name: nft.title || `NFT #${tokenId}`,
            description: nft.description || 'No description available',
            price,
            image: nft.media[0]?.gateway || '/placeholder.png',
            creator: nft.contract.address,
            owner: nft.ownership?.owner || null,
            status,
            attributes: nft.metadata?.attributes || []
        };
    } catch (error) {
        console.error('Error fetching NFT details:', error);
        throw error;
    }
}