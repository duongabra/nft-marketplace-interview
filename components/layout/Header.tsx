'use client'
import Link from 'next/link'
import { ConnectWallet } from '../wallet/ConnectWallet'
import { useState } from 'react'
import TransactionHistoryModal from '../modal/TransactionHistoryModal'

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isHistoryOpen, setIsHistoryOpen] = useState(false)

    return (
        <>


            <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo */}
                        <Link href="/" className="text-xl font-bold">
                            NFT Marketplace
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex items-center space-x-8">
                            <Link href="/" className="text-gray-600 hover:text-gray-900 font-bold">
                                Home
                            </Link>
                            <button
                                onClick={() => setIsHistoryOpen(true)}
                                className="text-gray-600 hover:text-gray-900 font-bold"
                            >
                                Transaction History
                            </button>
                            <ConnectWallet />
                        </nav>

                        {/* Mobile Menu Button */}
                        <button
                            className="md:hidden p-2"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                {isMenuOpen ? (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                ) : (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                )}
                            </svg>
                        </button>
                    </div>

                    {/* Mobile Navigation */}
                    {isMenuOpen && (
                        <div className="md:hidden pb-4">
                            <nav className="flex flex-col space-y-4">
                                <Link href="/" className="text-gray-600 hover:text-gray-900 px-2 font-bold">
                                    Home
                                </Link>
                                <button
                                    onClick={() => setIsHistoryOpen(true)}
                                    className="text-gray-600 hover:text-gray-900 px-2 text-left font-bold"
                                >
                                    Transaction History
                                </button>
                                <div className="px-2">
                                    <ConnectWallet />
                                </div>
                            </nav>
                        </div>
                    )}
                </div>
            </header>

            <TransactionHistoryModal
                isOpen={isHistoryOpen}
                onClose={() => setIsHistoryOpen(false)}
            />
        </>
    )
}