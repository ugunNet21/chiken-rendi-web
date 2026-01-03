"use client"

import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingCart,
  Package,
  Users,
  Download,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

const monthlyData = [
  { month: "Jan", revenue: 8500000, orders: 45 },
  { month: "Feb", revenue: 9200000, orders: 52 },
  { month: "Mar", revenue: 7800000, orders: 41 },
  { month: "Apr", revenue: 11500000, orders: 68 },
  { month: "Mei", revenue: 10200000, orders: 59 },
  { month: "Jun", revenue: 12450000, orders: 78 },
]

const topProducts = [
  { name: "Ayam Kampung Segar", sold: 156, revenue: 11700000 },
  { name: "Telur Ayam Negeri", sold: 280, revenue: 7840000 },
  { name: "Paket Premium", sold: 45, revenue: 15750000 },
]

export default function ReportsPage() {
  const formatPrice = (price: number) =>
    new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(price)

  const totalRevenue = monthlyData.reduce((sum, d) => sum + d.revenue, 0)
  const totalOrders = monthlyData.reduce((sum, d) => sum + d.orders, 0)
  const maxRevenue = Math.max(...monthlyData.map((d) => d.revenue))

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Laporan Penjualan</h1>
          <p className="text-muted-foreground">Analisis performa bisnis Anda</p>
        </div>
        <div className="flex gap-2">
          <Select defaultValue="2026">
            <SelectTrigger className="w-32 rounded-xl">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2026">2026</SelectItem>
              <SelectItem value="2025">2025</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="rounded-xl gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="rounded-2xl border-0 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Pendapatan</p>
                <p className="text-xl font-bold text-green-600">{formatPrice(totalRevenue)}</p>
                <p className="text-xs text-green-500 flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3" /> +18.5% dari tahun lalu
                </p>
              </div>
              <div className="h-12 w-12 rounded-xl bg-green-100 flex items-center justify-center dark:bg-green-500/20">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-2xl border-0 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Pesanan</p>
                <p className="text-xl font-bold">{totalOrders}</p>
                <p className="text-xs text-green-500 flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3" /> +12% dari tahun lalu
                </p>
              </div>
              <div className="h-12 w-12 rounded-xl bg-blue-100 flex items-center justify-center dark:bg-blue-500/20">
                <ShoppingCart className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-2xl border-0 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Produk Terjual</p>
                <p className="text-xl font-bold">481</p>
                <p className="text-xs text-green-500 flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3" /> +8% dari tahun lalu
                </p>
              </div>
              <div className="h-12 w-12 rounded-xl bg-purple-100 flex items-center justify-center dark:bg-purple-500/20">
                <Package className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-2xl border-0 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pelanggan Baru</p>
                <p className="text-xl font-bold">28</p>
                <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                  <TrendingDown className="h-3 w-3" /> -5% dari tahun lalu
                </p>
              </div>
              <div className="h-12 w-12 rounded-xl bg-amber-100 flex items-center justify-center dark:bg-amber-500/20">
                <Users className="h-6 w-6 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Revenue Chart */}
        <Card className="rounded-2xl border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Pendapatan Bulanan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end gap-2 h-48">
              {monthlyData.map((data) => (
                <div key={data.month} className="flex-1 flex flex-col items-center gap-2">
                  <div
                    className="w-full bg-gradient-to-t from-amber-500 to-orange-500 rounded-t-lg transition-all hover:from-amber-600 hover:to-orange-600"
                    style={{ height: `${(data.revenue / maxRevenue) * 100}%` }}
                  />
                  <span className="text-xs text-muted-foreground">{data.month}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Products */}
        <Card className="rounded-2xl border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Produk Terlaris</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product, i) => (
                <div key={product.name} className="flex items-center gap-4">
                  <div className={cn(
                    "h-10 w-10 rounded-xl flex items-center justify-center font-bold text-white",
                    i === 0 ? "bg-amber-500" : i === 1 ? "bg-zinc-400" : "bg-orange-400"
                  )}>
                    {i + 1}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{product.name}</p>
                    <p className="text-sm text-muted-foreground">{product.sold} terjual</p>
                  </div>
                  <p className="font-semibold text-amber-600">{formatPrice(product.revenue)}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
