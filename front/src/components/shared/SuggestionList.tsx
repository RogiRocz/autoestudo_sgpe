'use client'

import { useEffect, useRef } from 'react'

interface SuggestionListProps<T> {
    data: T[] | undefined
    show: boolean
    isLoading?: boolean
    onSelect: (item: T) => void
    labelExtractor: (item: T) => string
    onClose: () => void
}

export function SuggestionList<T>({
    data,
    show,
    isLoading,
    onSelect,
    labelExtractor,
    onClose,
}: SuggestionListProps<T>) {
    const listRef = useRef<HTMLUListElement>(null)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                listRef.current &&
                !listRef.current.contains(event.target as Node)
            ) {
                onClose()
            }
        }
        if (show) document.addEventListener('mousedown', handleClickOutside)
        return () =>
            document.removeEventListener('mousedown', handleClickOutside)
    }, [show, onClose])

    if (!show || (!data?.length && !isLoading)) return null

    return (
        <ul
            ref={listRef}
            className="absolute top-full left-0 z-50 mt-1 max-h-60 w-full overflow-auto rounded-md border border-gray-200 bg-white shadow-xl"
        >
            {isLoading ? (
                <li className="animate-pulse p-3 text-sm text-gray-500">
                    Carregando...
                </li>
            ) : (
                data?.map((item, index) => (
                    <li
                        key={index}
                        className="cursor-pointer border-b p-3 text-sm text-gray-700 transition-colors last:border-none hover:bg-indigo-50"
                        onMouseDown={(e) => {
                            e.preventDefault()
                            onSelect(item)
                        }}
                    >
                        {labelExtractor(item)}
                    </li>
                ))
            )}
        </ul>
    )
}
