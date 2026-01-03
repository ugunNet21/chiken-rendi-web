"use client"

import { useState } from "react"
import {
  Bell,
  Search,
  Menu,
  ChevronDown,
  User,
  Settings,
  LogOut,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

interface AdminHeaderProps {
  isCollapsed: boolean
  setIsCollapsed: (value: boolean) => void
}

export default function AdminHeader({ isCollapsed, setIsCollapsed }: AdminHeaderProps) {
  const [notifications] = useState([
    { id: 1, title: "Pesanan baru #1234", time: "5 menit lalu", unread: true },
    { id: 2, title: "Stok telur menipis", time: "1 jam lalu", unread: true },
    { id: 3, title: "Pembayaran dikonfirmasi", time: "2 jam lalu", unread: false },
  ])

  const unreadCount = notifications.filter((n) => n.unread).length

  return (
    <header
      className={cn(
        "fixed right-0 top-0 z-30 flex h-16 items-center justify-between border-b border-zinc-200 bg-white/80 px-6 backdrop-blur-xl transition-all duration-300 dark:border-zinc-800 dark:bg-zinc-900/80",
        isCollapsed ? "left-20" : "left-64"
      )}
    >
      {/* Left Section */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="flex h-10 w-10 items-center justify-center rounded-xl text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-white lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Search */}
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
          <Input
            type="search"
            placeholder="Cari produk, pesanan, pelanggan..."
            className="h-10 w-80 rounded-xl border-zinc-200 bg-zinc-50 pl-10 text-sm focus:bg-white dark:border-zinc-700 dark:bg-zinc-800 dark:focus:bg-zinc-800"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3">
        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="relative h-10 w-10 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              <Bell className="h-5 w-5 text-zinc-500" />
              {unreadCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                  {unreadCount}
                </span>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80 rounded-xl">
            <DropdownMenuLabel className="flex items-center justify-between">
              <span>Notifikasi</span>
              <span className="text-xs font-normal text-zinc-500">
                {unreadCount} belum dibaca
              </span>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {notifications.map((notification) => (
              <DropdownMenuItem
                key={notification.id}
                className={cn(
                  "flex cursor-pointer flex-col items-start gap-1 p-3",
                  notification.unread && "bg-amber-50 dark:bg-amber-500/10"
                )}
              >
                <span className="text-sm font-medium">{notification.title}</span>
                <span className="text-xs text-zinc-500">{notification.time}</span>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="justify-center text-amber-600">
              Lihat semua notifikasi
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex h-10 items-center gap-2 rounded-xl px-2 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500 to-orange-600">
                <span className="text-sm font-bold text-white">R</span>
              </div>
              <div className="hidden flex-col items-start md:flex">
                <span className="text-sm font-medium">Rendi</span>
                <span className="text-xs text-zinc-500">Administrator</span>
              </div>
              <ChevronDown className="h-4 w-4 text-zinc-400" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 rounded-xl">
            <DropdownMenuLabel>
              <div className="flex flex-col">
                <span>Rendi</span>
                <span className="text-xs font-normal text-zinc-500">
                  renditest@gmail.com
                </span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer gap-2">
              <User className="h-4 w-4" />
              <span>Profil Saya</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer gap-2">
              <Settings className="h-4 w-4" />
              <span>Pengaturan</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer gap-2 text-red-600 focus:text-red-600">
              <LogOut className="h-4 w-4" />
              <span>Keluar</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
