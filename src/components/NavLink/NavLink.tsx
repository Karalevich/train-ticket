import type React from 'react'
import Link from 'next/link'
import { NavLinkProps } from '@/components/NavLink/types';

export function NavLink({ href, children }: NavLinkProps) {
  return (
    <Link href={href} className="hover:text-amber-200 transition-colors duration-200 text-[24px]">
      {children}
    </Link>
  )
}
