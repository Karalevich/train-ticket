import { ReactNode } from 'react';

export default async function OrderLayout({
                                            children,
                                            stepper,
                                            tickets,
                                          }: Readonly<{
  children: ReactNode;
  stepper: ReactNode;
  tickets: ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-gray-50">
      {stepper}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {tickets}
          {children}
        </div>
      </div>
    </div>
  );
}