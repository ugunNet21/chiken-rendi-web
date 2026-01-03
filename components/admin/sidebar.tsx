"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  BarChart3,
  Settings,
  LogOut,
  ChevronLeft,
  Egg,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface SidebarProps {
  isCollapsed: boolean
  setIsCollapsed: (value: boolean) => void
}

const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/admin",
  },
  {
    title: "Produk",
    icon: Package,
    href: "/admin/products",
  },
  {
    title: "Pesanan",
    icon: ShoppingCart,
    href: "/admin/orders",
  },
  {
    title: "Pelanggan",
    icon: Users,
    href: "/admin/customers",
  },
  {
    title: "Laporan",
    icon: BarChart3,
    href: "/admin/reports",
  },
  {
    title: "Pengaturan",
    icon: Settings,
    href: "/admin/settings",
  },
]

export default function AdminSidebar({ isCollapsed, setIsCollapsed }: SidebarProps) {
  const pathname = usePathname()

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen bg-gradient-to-b from-zinc-900 to-zinc-950 text-white transition-all duration-300 ease-in-out",
        isCollapsed ? "w-20" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center justify-between border-b border-zinc-800 px-4">
        <Link href="/admin" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 shadow-lg">
            <Egg className="h-5 w-5 text-white" />
          </div>
          {!isCollapsed && (
            <div className="flex flex-col">
              <span className="font-bold text-white">Admin Panel</span>
              <span className="text-xs text-zinc-400">Ternak Ayam Rendi</span>
            </div>
          )}
        </Link>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={cn(
            "flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-800 text-zinc-400 transition-all hover:bg-zinc-700 hover:text-white",
            isCollapsed && "rotate-180"
          )}
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-1 p-4">
        {menuItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg shadow-amber-500/25"
                  : "text-zinc-400 hover:bg-zinc-800 hover:text-white",
                isCollapsed && "justify-center px-0"
              )}
            >
              <item.icon className={cn("h-5 w-5 flex-shrink-0", isActive && "text-white")} />
              {!isCollapsed && <span>{item.title}</span>}
            </Link>
          )
        })}
      </nav>

      {/* Bottom Section */}
      <div className="absolute bottom-0 left-0 right-0 border-t border-zinc-800 p-4">
        <Link
          href="/"
          className={cn(
            "flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-zinc-400 transition-all duration-200 hover:bg-red-500/10 hover:text-red-400",
            isCollapsed && "justify-center px-0"
          )}
        >
          <LogOut className="h-5 w-5 flex-shrink-0" />
          {!isCollapsed && <span>Keluar</span>}
        </Link>
      </div>
    </aside>
  )
}
