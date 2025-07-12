'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { Button } from './ui/button'
import { ModeToggle } from './mode-toggle'
import { useAuth } from '../lib/useAuth'
import { LogOut, User } from 'lucide-react'

export default function Navbar() {
  const pathname = usePathname()
  const { isAuthenticated, logout } = useAuth()

  const navItems = [
    { href: '/books', label: 'Books' },
    { href: '/members', label: 'Members' },
    { href: '/loans', label: 'Loans' },
    { href: '/reservations', label: 'Reservations' },
    { href: '/reports/overdue', label: 'Reports' },
  ]

  const handleLogout = () => {
    logout()
    // Redirect to login page
    window.location.href = '/login'
  }

  return (
    <header className="sticky top-0 z-50 mb-9 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="hidden font-bold sm:inline-block">
              Library System
            </span>
          </Link>
          {isAuthenticated && (
            <nav className="flex items-center space-x-6 text-sm font-medium">
              {navItems.map((item) => (
                <motion.div key={item.href} whileHover={{ scale: 1.1 }}>
                  <Link
                    href={item.href}
                    className={`transition-colors hover:text-foreground/80 ${
                      pathname === item.href
                        ? 'text-foreground'
                        : 'text-foreground/60'
                    }`}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          )}
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            {isAuthenticated ? (
              <div className="flex items-center space-x-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleLogout}
                  className="flex items-center space-x-1"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="hidden sm:inline">Logout</span>
                </Button>
              </div>
            ) : (
              <Button variant="outline" size="sm" asChild>
                <Link href="/login">Login</Link>
              </Button>
            )}
          </div>
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}