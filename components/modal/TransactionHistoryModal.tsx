'use client'
import { useTransactionContext } from '@/contexts/TransactionContext'
import { format } from 'date-fns'
import TruncatedText from '../common/TruncatedText'

export default function TransactionHistoryModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
    const { transactions } = useTransactionContext()

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 max-w-3xl w-full mx-4 max-h-[80vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">Transaction History</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {transactions.length === 0 ? (
                    <div className="text-gray-500 text-center py-4">No transactions yet</div>
                ) : (
                    <div className="space-y-4">
                        {transactions.map((tx) => (
                            <div key={tx.id} className="border rounded-lg p-4 hover:bg-gray-50">
                                <div className="flex justify-between items-start mb-3">
                                    <div>
                                        <span className={`inline-block px-2 py-1 rounded text-sm ${tx.status === 'completed'
                                            ? 'bg-green-100 text-green-800'
                                            : tx.status === 'pending'
                                                ? 'bg-yellow-100 text-yellow-800'
                                                : 'bg-red-100 text-red-800'
                                            }`}>
                                            {tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}
                                        </span>
                                    </div>
                                    <div className="font-bold text-green-600">{tx.price} ETH</div>
                                </div>

                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">Transaction Hash:</span>
                                        <a
                                            href={`https://sepolia.etherscan.io/tx/${tx.txHash}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-500 hover:text-blue-700 font-mono"
                                        >
                                            {tx.txHash.slice(0, 8)}...{tx.txHash.slice(-6)}
                                        </a>
                                    </div>

                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">NFT ID:</span>
                                        <span className="font-medium"><TruncatedText text={tx.nftId} /></span>
                                    </div>

                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">From:</span>
                                        <a
                                            href={`https://sepolia.etherscan.io/address/${tx.buyer}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-500 hover:text-blue-700 font-mono"
                                        >
                                            {tx.buyer.slice(0, 6)}...{tx.buyer.slice(-4)}
                                        </a>
                                    </div>

                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">To:</span>
                                        <a
                                            href={`https://sepolia.etherscan.io/address/${tx.seller}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-500 hover:text-blue-700 font-mono"
                                        >
                                            {tx.seller.slice(0, 6)}...{tx.seller.slice(-4)}
                                        </a>
                                    </div>

                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">Time:</span>
                                        <span className="text-gray-600">
                                            {format(tx.timestamp, 'MMM dd, yyyy HH:mm:ss')}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}