import type { Metadata } from "next";
import { Header } from '@/components/layout/Header'
import { WalletProvider } from '@/components/wallet/WalletProvider'
import { Toaster } from 'react-hot-toast'
import './globals.css'
import { NFTProvider } from '@/contexts/NFTContext'
import { PurchaseProvider } from '@/contexts/PurchaseContext'
import { FavoriteProvider } from "@/contexts/FavoriteContext";
import { TransactionProvider } from "@/contexts/TransactionContext";
export const metadata: Metadata = {
  title: "NFT Marketplace",
  description: "Discover, collect, and sell extraordinary NFTs",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <NFTProvider>
          <WalletProvider>
            <PurchaseProvider>
              <FavoriteProvider>
                <TransactionProvider>
                  <Header />
                  <main className="container mx-auto px-4 pt-20">
                    {children}
                  </main>
                  <Toaster position="top-right" />
                </TransactionProvider>
              </FavoriteProvider>
            </PurchaseProvider>
          </WalletProvider>
        </NFTProvider>
      </body>
    </html>
  )
}