import { usePurchaseContext } from '@/contexts/PurchaseContext'
import { useCallback, useEffect, useRef } from 'react'
import { toast } from 'react-hot-toast'
import { parseEther } from 'viem'
import { useAccount, useWaitForTransactionReceipt, useWriteContract } from 'wagmi'
import { useTransactionContext } from '@/contexts/TransactionContext'

const SELLER_ADDRESS = process.env.NEXT_PUBLIC_SELLER_ADDRESS as `0x${string}`

const ABI = [
    {
        inputs: [{ name: "to", type: "address" }],
        name: "transfer",
        outputs: [{ name: "", type: "bool" }],
        stateMutability: "payable",
        type: "function"
    }
] as const

export function useNFTTransaction(price: string, nftId: string) {
    const { address: buyerAddress } = useAccount()
    const { markNFTAsPurchased } = usePurchaseContext()
    const { addTransaction } = useTransactionContext()

    const { writeContract, isPending, data: hash, error: writeError } = useWriteContract()

    const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
        hash: hash ?? undefined,
    })

    const transactionAdded = useRef<string | null>(null)
    const statusUpdated = useRef(false)
    const toastIdRef = useRef<string | null>(null)

    useEffect(() => {
        if (hash && !transactionAdded.current) {
            const toastId = `purchase-${hash}`
            toastIdRef.current = toastId

            toast.loading('Processing transaction...', { id: toastId })
            addTransaction({
                nftId,
                price,
                buyer: buyerAddress || 'Unknown',
                seller: SELLER_ADDRESS,
                txHash: hash,
                status: 'pending'
            })
            transactionAdded.current = hash
            statusUpdated.current = false
        }
    }, [hash, buyerAddress, nftId, price, addTransaction])

    useEffect(() => {
        if (isSuccess && hash && !statusUpdated.current) {
            const toastId = toastIdRef.current || `purchase-${hash}`

            statusUpdated.current = true
            markNFTAsPurchased(nftId)
            addTransaction({
                nftId,
                price,
                buyer: buyerAddress || 'Unknown',
                seller: SELLER_ADDRESS,
                txHash: hash,
                status: 'completed'
            })
            toast.success(`Successfully purchased NFT for ${price} ETH`, { id: toastId })
        }
    }, [isSuccess, hash, buyerAddress, nftId, price, addTransaction, markNFTAsPurchased])

    useEffect(() => {
        if (writeError && hash && !statusUpdated.current) {
            const toastId = toastIdRef.current || `purchase-${hash}`

            statusUpdated.current = true
            addTransaction({
                nftId,
                price,
                buyer: buyerAddress || 'Unknown',
                seller: SELLER_ADDRESS,
                txHash: hash,
                status: 'failed'
            })
            toast.error('Transaction failed. Please try again.', { id: toastId })
        }
    }, [writeError, hash, buyerAddress, nftId, price, addTransaction])

    useEffect(() => {
        return () => {
            if (toastIdRef.current) {
                toast.dismiss(toastIdRef.current)
            }
        }
    }, [])

    const executePurchase = useCallback(async () => {
        if (!buyerAddress) {
            toast.error('Please connect your wallet first')
            return
        }

        try {
            transactionAdded.current = null
            statusUpdated.current = false
            toastIdRef.current = null

            await writeContract({
                address: SELLER_ADDRESS,
                abi: ABI,
                functionName: 'transfer',
                args: [SELLER_ADDRESS],
                value: parseEther(price),
            })
        } catch (error) {
            console.error('Transaction error:', error)
            toast.error('Transaction failed. Please try again.')
        }
    }, [buyerAddress, writeContract, price])

    return {
        executePurchase,
        isLoading: isPending || isConfirming,
        isSuccess,
        error: writeError
    }
}