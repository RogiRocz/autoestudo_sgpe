'use client'

import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '../ui/pagination'
import { cn } from '@/lib/utils'

interface Props {
    pages: number
    currentPage: number
    showNumbers?: boolean
    textPagination?: boolean
    onPageChange: (page: number) => void
}

export function PaginationBar({
    pages,
    currentPage,
    showNumbers = false,
    textPagination = false,
    onPageChange,
}: Props) {
    const pageNumbers = Array.from({ length: pages }, (_, i) => i + 1)

    if (pages <= 1) return null

    return (
        <Pagination className="my-4 cursor-pointer">
            <PaginationContent>
                {textPagination && (
                    <PaginationItem>
                        <PaginationPrevious
                        text='Anterior'
                            onClick={() =>
                                currentPage > 1 && onPageChange(currentPage - 1)
                            }
                            className={cn(
                                currentPage === 1 &&
                                    'pointer-events-none opacity-50'
                            )}
                        />
                    </PaginationItem>
                )}

                {pageNumbers.map((number) => (
                    <PaginationItem key={number}>
                        <PaginationLink
                            isActive={currentPage === number}
                            onClick={() => onPageChange(number)}
                        >
                            {showNumbers ? number : '.'}
                        </PaginationLink>
                    </PaginationItem>
                ))}

                {textPagination && (
                    <PaginationItem>
                        <PaginationNext
                            text='Próximo'
                            onClick={() =>
                                currentPage < pages &&
                                onPageChange(currentPage + 1)
                            }
                            className={cn(
                                currentPage === pages &&
                                    'pointer-events-none opacity-50'
                            )}
                        />
                    </PaginationItem>
                )}
            </PaginationContent>
        </Pagination>
    )
}
