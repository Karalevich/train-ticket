import { ReactNode } from 'react';
import FilterSidebar from '@/components/order/FilterSidebar';
import RecentTickets from '@/components/order/RecentTickets';

export default function OrderLayout({
                                      children,
                                    }: Readonly<{
  children: ReactNode;
}>) {
  return (
    <>
      <div className="w-full lg:w-1/4 space-y-6">
        <FilterSidebar/>
        <RecentTickets/>
      </div>

      <div className="w-full lg:w-3/4">
        {children}
      </div>
    </>
  );
}