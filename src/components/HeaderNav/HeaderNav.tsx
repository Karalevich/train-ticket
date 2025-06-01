import { NavLink } from '@/components/NavLink/NavLink';
import Image from 'next/image'

const navigationItems = [
  { href: '#about', label: 'About us' },
  { href: '#how-it-works', label: 'How it works' },
  { href: '#reviews', label: 'Reviews' },
  { href: '#contacts', label: 'Contacts' },
]

export function Header() {
  return (
    <header className="bg-neutral-800/95 backdrop-blur-xs text-white sticky top-12 z-1">
      <div className="container mx-auto">
        <nav className="flex items-center justify-between">
          <Image src="/images/logo.webp" alt="Logo" width={80} height={80}/>
          <div className="hidden md:flex space-x-12 py-4">
            {navigationItems.map((item) => (
              <NavLink key={item.href} href={item.href}>
                {item.label}
              </NavLink>
            ))}
          </div>
        </nav>
      </div>
    </header>
  )
}
