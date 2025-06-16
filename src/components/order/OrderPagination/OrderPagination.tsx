import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from '@/components/ui/pagination';

type OrderPaginationProps = {
  data: any;
  filters: any;
  currentPage: number;
};

export default function OrderPagination({ data, filters, currentPage }: OrderPaginationProps) {
  if (!data?.total_count || data.total_count <= 0) {
    return null;
  }

  const totalPages = Math.ceil(data.total_count / (filters.limit || 5));
  const maxPagesToShow = 5;
  const current = currentPage;
  let start = Math.max(1, current - Math.floor(maxPagesToShow / 2));
  let end = Math.min(totalPages, start + maxPagesToShow - 1);
  if (end - start < maxPagesToShow - 1) {
    start = Math.max(1, end - maxPagesToShow + 1);
  }

  const pages = [];

  if (start > 1) {
    pages.push(
      <PaginationItem key={1}>
        <PaginationLink href="#" isActive={1 === current}>
          1
        </PaginationLink>
      </PaginationItem>
    );
    if (start > 2) {
      pages.push(
        <PaginationItem key="start-ellipsis">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }
  }

  for (let i = start; i <= end; i++) {
    pages.push(
      <PaginationItem key={i}>
        <PaginationLink href="#" isActive={i === current}>
          {i}
        </PaginationLink>
      </PaginationItem>
    );
  }

  if (end < totalPages) {
    if (end < totalPages - 1) {
      pages.push(
        <PaginationItem key="end-ellipsis">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }
    pages.push(
      <PaginationItem key={totalPages}>
        <PaginationLink href="#" isActive={totalPages === current}>
          {totalPages}
        </PaginationLink>
      </PaginationItem>
    );
  }

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        {pages}
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}