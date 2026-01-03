"use client"

import { useState } from "react"
import AdminSidebar from "@/components/admin/sidebar"
import AdminHeader from "@/components/admin/header"
import { cn } from "@/lib/utils"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      {/* Sidebar */}
      <AdminSidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

      {/* Main Content */}
      <div
        className={cn(
          "min-h-screen transition-all duration-300",
          isCollapsed ? "ml-20" : "ml-64"
        )}
      >
        {/* Header */}
        <AdminHeader isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

        {/* Page Content */}
        <main className="p-6 pt-24">{children}</main>
      </div>
    </div>
  )
}
