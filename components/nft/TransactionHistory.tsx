'use client'
import { useAccount } from 'wagmi'
import { usePurchaseContext } from '@/contexts/PurchaseContext'
import TruncatedText from "../common/TruncatedText"

const SELLER_ADDRESS = process.env.NEXT_PUBLIC_SELLER_ADDRESS as string

export default function TransactionHistory({ nftId }: { nftId: string }) {
    const { address } = useAccount()
    const { isPurchased } = usePurchaseContext()
    const hasPurchased = isPurchased(nftId)

    if (!address) {
        return (
            <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-6">History</h2>
                <div className="text-gray-500">Please connect your wallet to view History</div>
            </div>
        )
    }

    return (
        <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-6">History</h2>
            <div className="space-y-4">
                {/* Mint Transaction */}
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                        <div className="font-medium capitalize">Mint</div>
                        <div className="text-sm text-gray-500">
                            From: <TruncatedText text="0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D" />
                        </div>
                        <div className="text-sm text-gray-500">
                            To: <TruncatedText text="0x024e99A9E5DB73f24AC6fBA38Ef47A659ddDE95C" />
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="text-sm text-gray-500">2024-01-01</div>
                    </div>
                </div>

                {/* Buy Transaction - Chỉ hiển thị khi đã mua */}
                {hasPurchased && (
                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div>
                            <div className="font-medium capitalize">Buy</div>
                            <div className="text-sm text-gray-500">
                                From: <TruncatedText text={SELLER_ADDRESS} />
                            </div>
                            <div className="text-sm text-gray-500">
                                To: <TruncatedText text={address} />
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-sm text-gray-500">{new Date().toISOString().split('T')[0]}</div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}