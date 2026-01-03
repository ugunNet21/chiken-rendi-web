"use client"

import { useState } from "react"
import {
  Search,
  MoreHorizontal,
  Eye,
  Mail,
  Phone,
  MapPin,
  ShoppingBag,
  Calendar,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
  User,
  Star,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

interface OrderHistory {
  id: string
  date: string
  items: string
  total: number
  status: "completed" | "processing" | "cancelled"
}

interface Customer {
  id: string
  name: string
  email: string
  phone: string
  address: string
  totalOrders: number
  totalSpent: number
  lastOrder: string
  joinedAt: string
  status: "active" | "inactive"
  orderHistory: OrderHistory[]
}

const initialCustomers: Customer[] = [
  {
    id: "CST-001",
    name: "Budi Santoso",
    email: "budi.santoso@email.com",
    phone: "081234567890",
    address: "Jl. Merdeka No. 123, Bandung, Jawa Barat",
    totalOrders: 15,
    totalSpent: 4250000,
    lastOrder: "2026-01-03",
    joinedAt: "2025-06-15",
    status: "active",
    orderHistory: [
      { id: "ORD-001", date: "2026-01-03", items: "Ayam Kampung (5), Telur (2kg)", total: 454000, status: "completed" },
      { id: "ORD-015", date: "2025-12-28", items: "Paket Premium", total: 375000, status: "completed" },
      { id: "ORD-020", date: "2025-12-15", items: "Telur Omega (3kg)", total: 105000, status: "completed" },
    ],
  },
  {
    id: "CST-002",
    name: "Siti Aminah",
    email: "siti.aminah@email.com",
    phone: "082345678901",
    address: "Jl. Sudirman No. 45, Jakarta Selatan",
    totalOrders: 8,
    totalSpent: 1850000,
    lastOrder: "2026-01-03",
    joinedAt: "2025-08-20",
    status: "active",
    orderHistory: [
      { id: "ORD-002", date: "2026-01-03", items: "Telur Ayam Negeri (10kg)", total: 300000, status: "processing" },
      { id: "ORD-018", date: "2025-12-20", items: "Ayam Pedaging (3)", total: 165000, status: "completed" },
    ],
  },
  {
    id: "CST-003",
    name: "Joko Widodo",
    email: "joko.widodo@email.com",
    phone: "083456789012",
    address: "Jl. Pahlawan No. 78, Surabaya, Jawa Timur",
    totalOrders: 22,
    totalSpent: 7500000,
    lastOrder: "2026-01-03",
    joinedAt: "2025-03-10",
    status: "active",
    orderHistory: [
      { id: "ORD-003", date: "2026-01-03", items: "Paket Premium", total: 375000, status: "processing" },
      { id: "ORD-025", date: "2025-12-30", items: "Ayam Kampung (10)", total: 750000, status: "completed" },
      { id: "ORD-030", date: "2025-12-22", items: "Telur Kampung (5kg), Ayam (2)", total: 310000, status: "completed" },
    ],
  },
  {
    id: "CST-004",
    name: "Dewi Lestari",
    email: "dewi.lestari@email.com",
    phone: "084567890123",
    address: "Jl. Gatot Subroto No. 99, Semarang, Jawa Tengah",
    totalOrders: 5,
    totalSpent: 980000,
    lastOrder: "2026-01-02",
    joinedAt: "2025-10-05",
    status: "active",
    orderHistory: [
      { id: "ORD-004", date: "2026-01-02", items: "Ayam Petelur (3)", total: 273000, status: "completed" },
      { id: "ORD-035", date: "2025-12-10", items: "Paket Combo Hemat", total: 165000, status: "completed" },
    ],
  },
  {
    id: "CST-005",
    name: "Ahmad Dahlan",
    email: "ahmad.dahlan@email.com",
    phone: "085678901234",
    address: "Jl. Diponegoro No. 56, Yogyakarta",
    totalOrders: 12,
    totalSpent: 3200000,
    lastOrder: "2026-01-02",
    joinedAt: "2025-05-22",
    status: "active",
    orderHistory: [
      { id: "ORD-005", date: "2026-01-02", items: "Telur Omega (5kg), Ayam Pedaging (2)", total: 300000, status: "completed" },
      { id: "ORD-040", date: "2025-12-25", items: "Paket Premium (2)", total: 750000, status: "completed" },
    ],
  },
  {
    id: "CST-006",
    name: "Rina Susanti",
    email: "rina.susanti@email.com",
    phone: "086789012345",
    address: "Jl. Asia Afrika No. 12, Bandung, Jawa Barat",
    totalOrders: 3,
    totalSpent: 520000,
    lastOrder: "2026-01-01",
    joinedAt: "2025-11-15",
    status: "inactive",
    orderHistory: [
      { id: "ORD-006", date: "2026-01-01", items: "Paket Combo Hemat (2)", total: 315000, status: "cancelled" },
      { id: "ORD-045", date: "2025-12-01", items: "Telur Ayam Negeri (5kg)", total: 140000, status: "completed" },
    ],
  },
  {
    id: "CST-007",
    name: "Bambang Wijaya",
    email: "bambang.wijaya@email.com",
    phone: "087890123456",
    address: "Jl. Pemuda No. 33, Malang, Jawa Timur",
    totalOrders: 18,
    totalSpent: 5100000,
    lastOrder: "2025-12-30",
    joinedAt: "2025-04-18",
    status: "active",
    orderHistory: [
      { id: "ORD-050", date: "2025-12-30", items: "Ayam Kampung (8)", total: 600000, status: "completed" },
      { id: "ORD-055", date: "2025-12-18", items: "Telur Kampung (10kg)", total: 320000, status: "completed" },
    ],
  },
  {
    id: "CST-008",
    name: "Sri Mulyani",
    email: "sri.mulyani@email.com",
    phone: "088901234567",
    address: "Jl. Veteran No. 77, Solo, Jawa Tengah",
    totalOrders: 6,
    totalSpent: 1450000,
    lastOrder: "2025-12-28",
    joinedAt: "2025-09-01",
    status: "active",
    orderHistory: [
      { id: "ORD-060", date: "2025-12-28", items: "Paket Premium", total: 375000, status: "completed" },
      { id: "ORD-065", date: "2025-12-05", items: "Ayam Pedaging (5)", total: 275000, status: "completed" },
    ],
  },
]

const statusOrderConfig: Record<string, string> = {
  completed: "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400",
  processing: "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400",
  cancelled: "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400",
}

const statusOrderLabel: Record<string, string> = {
  completed: "Selesai",
  processing: "Diproses",
  cancelled: "Dibatalkan",
}

export default function CustomersPage() {
  const [customers] = useState<Customer[]>(initialCustomers)
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)

  const itemsPerPage = 6

  // Filter customers
  const filteredCustomers = customers.filter((customer) => {
    return (
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.phone.includes(searchQuery)
    )
  })

  // Pagination
  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage)
  const paginatedCustomers = filteredCustomers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(date)
  }

  const openDetail = (customer: Customer) => {
    setSelectedCustomer(customer)
    setIsDetailOpen(true)
  }

  // Get customer tier based on total spent
  const getCustomerTier = (totalSpent: number) => {
    if (totalSpent >= 5000000) return { name: "Gold", color: "text-amber-500", bg: "bg-amber-100 dark:bg-amber-500/20" }
    if (totalSpent >= 2000000) return { name: "Silver", color: "text-zinc-400", bg: "bg-zinc-100 dark:bg-zinc-500/20" }
    return { name: "Bronze", color: "text-orange-600", bg: "bg-orange-100 dark:bg-orange-500/20" }
  }

  // Stats
  const stats = {
    total: customers.length,
    active: customers.filter((c) => c.status === "active").length,
    totalRevenue: customers.reduce((sum, c) => sum + c.totalSpent, 0),
    avgOrderValue: Math.round(
      customers.reduce((sum, c) => sum + c.totalSpent, 0) /
        customers.reduce((sum, c) => sum + c.totalOrders, 0)
    ),
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Manajemen Pelanggan</h1>
        <p className="text-muted-foreground">
          Lihat dan kelola data pelanggan Anda
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="rounded-2xl border-0 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Pelanggan</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600">
                <User className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-2xl border-0 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pelanggan Aktif</p>
                <p className="text-2xl font-bold text-green-600">{stats.active}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-green-500 to-emerald-600">
                <Star className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-2xl border-0 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Pendapatan</p>
                <p className="text-2xl font-bold text-amber-600">{formatPrice(stats.totalRevenue)}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-600">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-2xl border-0 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Rata-rata Order</p>
                <p className="text-2xl font-bold">{formatPrice(stats.avgOrderValue)}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-violet-600">
                <ShoppingBag className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card className="rounded-2xl border-0 shadow-lg">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Cari nama, email, atau nomor telepon..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-11 rounded-xl"
            />
          </div>
        </CardContent>
      </Card>

      {/* Customers Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {paginatedCustomers.map((customer) => {
          const tier = getCustomerTier(customer.totalSpent)
          return (
            <Card
              key={customer.id}
              className="rounded-2xl border-0 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 text-white font-bold text-lg">
                      {customer.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{customer.name}</h3>
                      <span
                        className={cn(
                          "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium",
                          tier.bg, tier.color
                        )}
                      >
                        <Star className="h-3 w-3" />
                        {tier.name}
                      </span>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="rounded-xl">
                      <DropdownMenuItem
                        className="cursor-pointer gap-2"
                        onClick={() => openDetail(customer)}
                      >
                        <Eye className="h-4 w-4" />
                        Lihat Detail
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail className="h-4 w-4" />
                    <span className="truncate">{customer.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Phone className="h-4 w-4" />
                    <span>{customer.phone}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-zinc-100 dark:border-zinc-800">
                  <div>
                    <p className="text-xs text-muted-foreground">Total Order</p>
                    <p className="font-semibold text-foreground">{customer.totalOrders}x</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Total Belanja</p>
                    <p className="font-semibold text-amber-600">{formatPrice(customer.totalSpent)}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4 pt-4 border-t border-zinc-100 dark:border-zinc-800">
                  <span
                    className={cn(
                      "rounded-full px-2.5 py-0.5 text-xs font-medium",
                      customer.status === "active"
                        ? "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400"
                        : "bg-zinc-100 text-zinc-500 dark:bg-zinc-500/20"
                    )}
                  >
                    {customer.status === "active" ? "Aktif" : "Nonaktif"}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Order terakhir: {formatDate(customer.lastOrder)}
                  </span>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Empty State */}
      {paginatedCustomers.length === 0 && (
        <Card className="rounded-2xl border-0 shadow-lg">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <User className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Tidak ada pelanggan ditemukan
            </h3>
            <p className="text-muted-foreground">
              Coba ubah kata kunci pencarian
            </p>
          </CardContent>
        </Card>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Menampilkan {(currentPage - 1) * itemsPerPage + 1} -{" "}
            {Math.min(currentPage * itemsPerPage, filteredCustomers.length)} dari{" "}
            {filteredCustomers.length} pelanggan
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-9 w-9 rounded-lg"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="icon"
                className={cn(
                  "h-9 w-9 rounded-lg",
                  currentPage === page &&
                    "bg-gradient-to-r from-amber-500 to-orange-600 border-0"
                )}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </Button>
            ))}
            <Button
              variant="outline"
              size="icon"
              className="h-9 w-9 rounded-lg"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Customer Detail Dialog */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="sm:max-w-2xl rounded-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl">Detail Pelanggan</DialogTitle>
            <DialogDescription>
              Informasi lengkap dan riwayat pesanan pelanggan
            </DialogDescription>
          </DialogHeader>

          {selectedCustomer && (
            <div className="space-y-6">
              {/* Customer Header */}
              <div className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-500/10 dark:to-orange-500/10">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 text-white font-bold text-2xl">
                  {selectedCustomer.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold text-foreground">
                      {selectedCustomer.name}
                    </h3>
                    <span
                      className={cn(
                        "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium",
                        getCustomerTier(selectedCustomer.totalSpent).bg,
                        getCustomerTier(selectedCustomer.totalSpent).color
                      )}
                    >
                      <Star className="h-3 w-3" />
                      {getCustomerTier(selectedCustomer.totalSpent).name}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Bergabung sejak {formatDate(selectedCustomer.joinedAt)}
                  </p>
                </div>
              </div>

              {/* Contact Info */}
              <div className="rounded-xl bg-zinc-50 p-4 dark:bg-zinc-900">
                <h4 className="font-semibold text-foreground mb-3">Informasi Kontak</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-foreground">{selectedCustomer.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-foreground">{selectedCustomer.phone}</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <span className="text-foreground">{selectedCustomer.address}</span>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="rounded-xl bg-blue-50 p-4 text-center dark:bg-blue-500/10">
                  <ShoppingBag className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-blue-600">{selectedCustomer.totalOrders}</p>
                  <p className="text-xs text-muted-foreground">Total Order</p>
                </div>
                <div className="rounded-xl bg-green-50 p-4 text-center dark:bg-green-500/10">
                  <TrendingUp className="h-6 w-6 text-green-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-green-600">
                    {formatPrice(selectedCustomer.totalSpent)}
                  </p>
                  <p className="text-xs text-muted-foreground">Total Belanja</p>
                </div>
                <div className="rounded-xl bg-purple-50 p-4 text-center dark:bg-purple-500/10">
                  <Calendar className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                  <p className="text-sm font-bold text-purple-600">
                    {formatDate(selectedCustomer.lastOrder)}
                  </p>
                  <p className="text-xs text-muted-foreground">Order Terakhir</p>
                </div>
              </div>

              {/* Order History */}
              <div>
                <h4 className="font-semibold text-foreground mb-3">Riwayat Pesanan</h4>
                <div className="space-y-3">
                  {selectedCustomer.orderHistory.map((order) => (
                    <div
                      key={order.id}
                      className="flex items-center justify-between rounded-xl bg-zinc-50 p-4 dark:bg-zinc-900"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-foreground">{order.id}</span>
                          <span
                            className={cn(
                              "rounded-full px-2 py-0.5 text-xs font-medium",
                              statusOrderConfig[order.status]
                            )}
                          >
                            {statusOrderLabel[order.status]}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">{order.items}</p>
                        <p className="text-xs text-muted-foreground">{formatDate(order.date)}</p>
                      </div>
                      <p className="font-semibold text-foreground">{formatPrice(order.total)}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
