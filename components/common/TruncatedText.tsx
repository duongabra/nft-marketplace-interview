'use client'
import { useState } from 'react'
import { Tooltip } from 'react-tooltip'

interface TruncatedTextProps {
    text: string
    maxLength?: number
}

export default function TruncatedText({ text, maxLength = 12 }: TruncatedTextProps) {
    const [tooltipId] = useState(`tooltip-${Math.random().toString(36).substr(2, 9)}`)

    if (text.length <= maxLength) {
        return <span>{text}</span>
    }

    const truncated = `${text.slice(0, 6)}...${text.slice(-6)}`

    return (
        <>
            <span
                data-tooltip-id={tooltipId}
                data-tooltip-content={text}
                className="cursor-help underline"
            >
                {truncated}
            </span>
            <Tooltip id={tooltipId} />
        </>
    )
}