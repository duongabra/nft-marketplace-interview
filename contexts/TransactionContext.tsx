'use client'
import { createContext, useContext, useState, useEffect } from 'react'

interface Transaction {
    id: string;
    nftId: string;
    price: string;
    buyer: string;
    seller: string;
    timestamp: number;
    txHash: string;
    status: 'pending' | 'completed' | 'failed';
}

interface TransactionContextType {
    transactions: Transaction[];
    addTransaction: (transaction: Omit<Transaction, 'id' | 'timestamp'>) => void;
}

const TransactionContext = createContext<TransactionContextType>({
    transactions: [],
    addTransaction: () => { },
})

export function TransactionProvider({ children }: { children: React.ReactNode }) {
    const [transactions, setTransactions] = useState<Transaction[]>([])

    useEffect(() => {
        const savedTransactions = localStorage.getItem('nft-transactions')
        if (savedTransactions) {
            try {
                setTransactions(JSON.parse(savedTransactions))
            } catch (error) {
                console.error('Error loading transactions:', error)
            }
        }
    }, [])

    const addTransaction = (transaction: Omit<Transaction, 'id' | 'timestamp'>) => {
        setTransactions(prev => {
            const existingIndex = prev.findIndex(tx => tx.txHash === transaction.txHash)

            let updated: Transaction[]
            if (existingIndex >= 0) {
                updated = [...prev]
                updated[existingIndex] = {
                    ...updated[existingIndex],
                    ...transaction,
                    timestamp: Date.now()
                }
            } else {
                const newTransaction = {
                    ...transaction,
                    id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                    timestamp: Date.now(),
                }
                updated = [newTransaction, ...prev]
            }

            try {
                localStorage.setItem('nft-transactions', JSON.stringify(updated))
            } catch (error) {
                console.error('Error saving transactions:', error)
            }

            return updated
        })
    }

    return (
        <TransactionContext.Provider value={{ transactions, addTransaction }}>
            {children}
        </TransactionContext.Provider>
    )
}

export function useTransactionContext() {
    return useContext(TransactionContext)
}