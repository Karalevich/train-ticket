'use client'

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from '@/components/ui/pagination';
import { usePathname, useSearchParams } from 'next/navigation';
import { parseSearchParams } from '@/lib/api';

type OrderPaginationProps = {
  totalCount: number;
  maxPagesToShow?: number;
};

export default function OrderPagination({ totalCount, maxPagesToShow = 3 }: OrderPaginationProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const {limit = 5, offset = 0} = parseSearchParams(searchParams)

  if (totalCount <= limit) {
    return null;
  }

  const totalPages = Math.ceil(totalCount / limit)
  let currentPage = (offset / limit) + 1; // Convert offset to page number

  let start = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
  let end = Math.min(totalPages, start + maxPagesToShow - 1);
  if (end - start < maxPagesToShow - 1) {
    start = Math.max(1, end - maxPagesToShow + 1);
  }

  const createPageURL = (pageNumber: number) => {
    if (pageNumber < 1 || pageNumber > totalPages || pageNumber === currentPage) {
      return '#'; // Invalid page number
    }
    const params = new URLSearchParams(searchParams);
    const offset = limit ? (pageNumber - 1) * limit : 0;
    params.set('offset', offset.toString());
    if (pageNumber === 1) {
      params.delete('offset');
    }
    return `${pathname}?${params.toString()}`;
  };


  const pages = [];

  if (start > 1) {
    pages.push(
      <PaginationItem key={1}>
        <PaginationLink href={createPageURL(1)} isActive={1 === currentPage}>
          1
        </PaginationLink>
      </PaginationItem>
    );
    if (start > 2) {
      pages.push(
        <PaginationItem key="start-ellipsis">
          <PaginationEllipsis/>
        </PaginationItem>
      );
    }
  }

  for (let i = start; i <= end; i++) {
    pages.push(
      <PaginationItem key={i}>
        <PaginationLink href={createPageURL(i)} isActive={i === currentPage}>
          {i}
        </PaginationLink>
      </PaginationItem>
    );
  }

  if (end < totalPages) {
    if (end < totalPages - 1) {
      pages.push(
        <PaginationItem key="end-ellipsis">
          <PaginationEllipsis/>
        </PaginationItem>
      );
    }
    pages.push(
      <PaginationItem key={totalPages}>
        <PaginationLink href={createPageURL(totalPages)} isActive={totalPages === currentPage}>
          {totalPages}
        </PaginationLink>
      </PaginationItem>
    );
  }

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href={createPageURL(currentPage - 1)} disabled={currentPage === 1}/>
        </PaginationItem>
        {pages}
        <PaginationItem>
          <PaginationNext href={createPageURL(currentPage + 1)} disabled={currentPage === totalPages}/>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}