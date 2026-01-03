"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X, LogIn } from "lucide-react"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { name: "Beranda", href: "#home" },
    { name: "Produk", href: "#products" },
    { name: "Galeri", href: "#gallery" },
    { name: "Kontak", href: "#contact" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">🐔</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg text-foreground">Ternak Ayam rendi</span>
              <span className="text-xs text-muted-foreground">Premium Farm</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="/login"
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
            >
              <LogIn size={16} />
              Login
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-foreground hover:bg-secondary rounded-lg transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <nav className="md:hidden pb-4 flex flex-col gap-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="px-4 py-2 text-sm font-medium text-foreground hover:bg-secondary rounded-lg transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="/login"
              className="mx-4 mt-2 inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 rounded-lg transition-all duration-300 shadow-md"
              onClick={() => setIsOpen(false)}
            >
              <LogIn size={16} />
              Login
            </Link>
          </nav>
        )}
      </div>
    </header>
  )
}
