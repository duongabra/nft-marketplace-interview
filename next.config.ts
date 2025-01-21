import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      'nft-cdn.alchemy.com',
      'ipfs.io',
      'arweave.net',
    ],
  },
}

export default nextConfig;
