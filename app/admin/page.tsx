"use client"

import {
  Package,
  ShoppingCart,
  Users,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Egg,
  AlertTriangle,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const stats = [
  {
    title: "Total Penjualan",
    value: "Rp 12.450.000",
    change: "+12.5%",
    trend: "up",
    icon: TrendingUp,
    color: "from-green-500 to-emerald-600",
  },
  {
    title: "Total Pesanan",
    value: "156",
    change: "+8.2%",
    trend: "up",
    icon: ShoppingCart,
    color: "from-blue-500 to-indigo-600",
  },
  {
    title: "Total Pelanggan",
    value: "89",
    change: "+5.1%",
    trend: "up",
    icon: Users,
    color: "from-purple-500 to-violet-600",
  },
  {
    title: "Produk Aktif",
    value: "24",
    change: "-2",
    trend: "down",
    icon: Package,
    color: "from-amber-500 to-orange-600",
  },
]

const recentOrders = [
  {
    id: "#ORD-001",
    customer: "Budi Santoso",
    product: "Ayam Kampung (5 ekor)",
    total: "Rp 375.000",
    status: "completed",
    date: "Hari ini",
  },
  {
    id: "#ORD-002",
    customer: "Siti Aminah",
    product: "Telur Segar (10 kg)",
    total: "Rp 280.000",
    status: "processing",
    date: "Hari ini",
  },
  {
    id: "#ORD-003",
    customer: "Joko Widodo",
    product: "Paket Combo Premium",
    total: "Rp 550.000",
    status: "pending",
    date: "Kemarin",
  },
  {
    id: "#ORD-004",
    customer: "Dewi Lestari",
    product: "Ayam Petelur (3 ekor)",
    total: "Rp 225.000",
    status: "completed",
    date: "Kemarin",
  },
  {
    id: "#ORD-005",
    customer: "Ahmad Dahlan",
    product: "Telur Omega (5 kg)",
    total: "Rp 175.000",
    status: "completed",
    date: "2 hari lalu",
  },
]

const lowStockItems = [
  { name: "Telur Kampung", stock: 12, unit: "kg", threshold: 20 },
  { name: "Ayam Pedaging", stock: 5, unit: "ekor", threshold: 15 },
  { name: "Telur Omega", stock: 8, unit: "kg", threshold: 15 },
]

const statusStyles: Record<string, string> = {
  completed: "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400",
  processing: "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400",
  pending: "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400",
  cancelled: "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400",
}

const statusLabels: Record<string, string> = {
  completed: "Selesai",
  processing: "Diproses",
  pending: "Menunggu",
  cancelled: "Dibatalkan",
}

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">
          Selamat datang kembali, Rendi! Berikut ringkasan bisnis Anda hari ini.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card
            key={stat.title}
            className="relative overflow-hidden rounded-2xl border-0 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
          >
            <div
              className={cn(
                "absolute inset-0 opacity-10 bg-gradient-to-br",
                stat.color
              )}
            />
            <CardContent className="relative p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <div className="flex items-center gap-1">
                    {stat.trend === "up" ? (
                      <ArrowUpRight className="h-4 w-4 text-green-500" />
                    ) : (
                      <ArrowDownRight className="h-4 w-4 text-red-500" />
                    )}
                    <span
                      className={cn(
                        "text-sm font-medium",
                        stat.trend === "up" ? "text-green-500" : "text-red-500"
                      )}
                    >
                      {stat.change}
                    </span>
                    <span className="text-xs text-muted-foreground">vs bulan lalu</span>
                  </div>
                </div>
                <div
                  className={cn(
                    "flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br shadow-lg",
                    stat.color
                  )}
                >
                  <stat.icon className="h-7 w-7 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Orders */}
        <Card className="lg:col-span-2 rounded-2xl border-0 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-semibold">Pesanan Terbaru</CardTitle>
            <a
              href="/admin/orders"
              className="text-sm font-medium text-amber-600 hover:text-amber-700 transition-colors"
            >
              Lihat Semua →
            </a>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-zinc-200 dark:border-zinc-800">
                    <th className="pb-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      ID Pesanan
                    </th>
                    <th className="pb-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Pelanggan
                    </th>
                    <th className="pb-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider hidden md:table-cell">
                      Produk
                    </th>
                    <th className="pb-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Total
                    </th>
                    <th className="pb-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                  {recentOrders.map((order) => (
                    <tr
                      key={order.id}
                      className="transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-900"
                    >
                      <td className="py-4 text-sm font-medium text-foreground">
                        {order.id}
                      </td>
                      <td className="py-4 text-sm text-foreground">{order.customer}</td>
                      <td className="py-4 text-sm text-muted-foreground hidden md:table-cell">
                        {order.product}
                      </td>
                      <td className="py-4 text-sm font-medium text-foreground">
                        {order.total}
                      </td>
                      <td className="py-4">
                        <span
                          className={cn(
                            "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                            statusStyles[order.status]
                          )}
                        >
                          {statusLabels[order.status]}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Low Stock Alert */}
        <Card className="rounded-2xl border-0 shadow-lg">
          <CardHeader className="flex flex-row items-center gap-2 pb-2">
            <AlertTriangle className="h-5 w-5 text-amber-500" />
            <CardTitle className="text-lg font-semibold">Stok Menipis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {lowStockItems.map((item) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between rounded-xl bg-amber-50 p-4 dark:bg-amber-500/10"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100 dark:bg-amber-500/20">
                      <Egg className="h-5 w-5 text-amber-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{item.name}</p>
                      <p className="text-xs text-muted-foreground">
                        Min. stok: {item.threshold} {item.unit}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-amber-600">
                      {item.stock} {item.unit}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <a
              href="/admin/products"
              className="mt-4 block text-center text-sm font-medium text-amber-600 hover:text-amber-700 transition-colors"
            >
              Kelola Stok →
            </a>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
