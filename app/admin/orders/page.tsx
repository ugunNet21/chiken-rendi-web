"use client"

import { useState } from "react"
import {
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Truck,
  CheckCircle,
  XCircle,
  Clock,
  Package,
  ChevronLeft,
  ChevronRight,
  Phone,
  MapPin,
  Calendar,
  CreditCard,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface OrderItem {
  name: string
  quantity: number
  unit: string
  price: number
}

interface Order {
  id: string
  customerName: string
  customerPhone: string
  customerAddress: string
  items: OrderItem[]
  subtotal: number
  shipping: number
  total: number
  status: "pending" | "confirmed" | "processing" | "shipped" | "completed" | "cancelled"
  paymentMethod: string
  paymentStatus: "unpaid" | "paid"
  createdAt: string
  notes: string
}

const initialOrders: Order[] = [
  {
    id: "ORD-001",
    customerName: "Budi Santoso",
    customerPhone: "081234567890",
    customerAddress: "Jl. Merdeka No. 123, Bandung",
    items: [
      { name: "Ayam Kampung Segar", quantity: 5, unit: "ekor", price: 75000 },
      { name: "Telur Kampung", quantity: 2, unit: "kg", price: 32000 },
    ],
    subtotal: 439000,
    shipping: 15000,
    total: 454000,
    status: "completed",
    paymentMethod: "Transfer Bank",
    paymentStatus: "paid",
    createdAt: "2026-01-03T10:30:00",
    notes: "Mohon dikirim pagi hari",
  },
  {
    id: "ORD-002",
    customerName: "Siti Aminah",
    customerPhone: "082345678901",
    customerAddress: "Jl. Sudirman No. 45, Jakarta",
    items: [
      { name: "Telur Ayam Negeri", quantity: 10, unit: "kg", price: 28000 },
    ],
    subtotal: 280000,
    shipping: 20000,
    total: 300000,
    status: "processing",
    paymentMethod: "COD",
    paymentStatus: "unpaid",
    createdAt: "2026-01-03T09:15:00",
    notes: "",
  },
  {
    id: "ORD-003",
    customerName: "Joko Widodo",
    customerPhone: "083456789012",
    customerAddress: "Jl. Pahlawan No. 78, Surabaya",
    items: [
      { name: "Paket Premium", quantity: 1, unit: "paket", price: 350000 },
    ],
    subtotal: 350000,
    shipping: 25000,
    total: 375000,
    status: "pending",
    paymentMethod: "Transfer Bank",
    paymentStatus: "unpaid",
    createdAt: "2026-01-03T08:00:00",
    notes: "Untuk acara keluarga",
  },
  {
    id: "ORD-004",
    customerName: "Dewi Lestari",
    customerPhone: "084567890123",
    customerAddress: "Jl. Gatot Subroto No. 99, Semarang",
    items: [
      { name: "Ayam Petelur", quantity: 3, unit: "ekor", price: 85000 },
    ],
    subtotal: 255000,
    shipping: 18000,
    total: 273000,
    status: "shipped",
    paymentMethod: "E-Wallet",
    paymentStatus: "paid",
    createdAt: "2026-01-02T14:20:00",
    notes: "",
  },
  {
    id: "ORD-005",
    customerName: "Ahmad Dahlan",
    customerPhone: "085678901234",
    customerAddress: "Jl. Diponegoro No. 56, Yogyakarta",
    items: [
      { name: "Telur Omega", quantity: 5, unit: "kg", price: 35000 },
      { name: "Ayam Pedaging", quantity: 2, unit: "ekor", price: 55000 },
    ],
    subtotal: 285000,
    shipping: 15000,
    total: 300000,
    status: "confirmed",
    paymentMethod: "Transfer Bank",
    paymentStatus: "paid",
    createdAt: "2026-01-02T11:45:00",
    notes: "Hubungi sebelum kirim",
  },
  {
    id: "ORD-006",
    customerName: "Rina Susanti",
    customerPhone: "086789012345",
    customerAddress: "Jl. Asia Afrika No. 12, Bandung",
    items: [
      { name: "Paket Combo Hemat", quantity: 2, unit: "paket", price: 150000 },
    ],
    subtotal: 300000,
    shipping: 15000,
    total: 315000,
    status: "cancelled",
    paymentMethod: "COD",
    paymentStatus: "unpaid",
    createdAt: "2026-01-01T16:30:00",
    notes: "Pembeli membatalkan",
  },
]

const statusConfig: Record<string, { label: string; color: string; icon: React.ElementType }> = {
  pending: { label: "Menunggu", color: "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400", icon: Clock },
  confirmed: { label: "Dikonfirmasi", color: "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400", icon: CheckCircle },
  processing: { label: "Diproses", color: "bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-400", icon: Package },
  shipped: { label: "Dikirim", color: "bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-400", icon: Truck },
  completed: { label: "Selesai", color: "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400", icon: CheckCircle },
  cancelled: { label: "Dibatalkan", color: "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400", icon: XCircle },
}

const paymentStatusConfig: Record<string, { label: string; color: string }> = {
  paid: { label: "Lunas", color: "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400" },
  unpaid: { label: "Belum Bayar", color: "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400" },
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>(initialOrders)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("Semua")
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)

  const itemsPerPage = 5

  // Filter orders
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "Semua" || order.status === statusFilter
    return matchesSearch && matchesStatus
  })

  // Pagination
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage)
  const paginatedOrders = filteredOrders.slice(
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
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  const openDetail = (order: Order) => {
    setSelectedOrder(order)
    setIsDetailOpen(true)
  }

  const updateOrderStatus = (orderId: string, newStatus: Order["status"]) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    )
    if (selectedOrder?.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus })
    }
  }

  const updatePaymentStatus = (orderId: string, newStatus: Order["paymentStatus"]) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId ? { ...order, paymentStatus: newStatus } : order
      )
    )
    if (selectedOrder?.id === orderId) {
      setSelectedOrder({ ...selectedOrder, paymentStatus: newStatus })
    }
  }

  // Stats
  const stats = {
    total: orders.length,
    pending: orders.filter((o) => o.status === "pending").length,
    processing: orders.filter((o) => o.status === "processing" || o.status === "confirmed").length,
    completed: orders.filter((o) => o.status === "completed").length,
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Manajemen Pesanan</h1>
        <p className="text-muted-foreground">
          Kelola dan pantau semua pesanan pelanggan
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="rounded-2xl border-0 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Pesanan</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-100 dark:bg-zinc-800">
                <Package className="h-6 w-6 text-zinc-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-2xl border-0 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Menunggu</p>
                <p className="text-2xl font-bold text-amber-600">{stats.pending}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100 dark:bg-amber-500/20">
                <Clock className="h-6 w-6 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-2xl border-0 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Diproses</p>
                <p className="text-2xl font-bold text-blue-600">{stats.processing}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-500/20">
                <Truck className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-2xl border-0 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Selesai</p>
                <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 dark:bg-green-500/20">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="rounded-2xl border-0 shadow-lg">
        <CardContent className="p-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Cari ID pesanan atau nama pelanggan..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-11 rounded-xl"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48 h-11 rounded-xl">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Semua">Semua Status</SelectItem>
                <SelectItem value="pending">Menunggu</SelectItem>
                <SelectItem value="confirmed">Dikonfirmasi</SelectItem>
                <SelectItem value="processing">Diproses</SelectItem>
                <SelectItem value="shipped">Dikirim</SelectItem>
                <SelectItem value="completed">Selesai</SelectItem>
                <SelectItem value="cancelled">Dibatalkan</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card className="rounded-2xl border-0 shadow-lg overflow-hidden">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-zinc-50 dark:bg-zinc-900">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    ID Pesanan
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Pelanggan
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider hidden lg:table-cell">
                    Tanggal
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider hidden md:table-cell">
                    Pembayaran
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                {paginatedOrders.map((order) => {
                  const StatusIcon = statusConfig[order.status].icon
                  return (
                    <tr
                      key={order.id}
                      className="transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-900/50"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="font-medium text-foreground">{order.id}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <p className="font-medium text-foreground">{order.customerName}</p>
                          <p className="text-sm text-muted-foreground">{order.customerPhone}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap hidden lg:table-cell">
                        <span className="text-sm text-muted-foreground">
                          {formatDate(order.createdAt)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="font-semibold text-foreground">
                          {formatPrice(order.total)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={cn(
                            "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium",
                            statusConfig[order.status].color
                          )}
                        >
                          <StatusIcon className="h-3.5 w-3.5" />
                          {statusConfig[order.status].label}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                        <span
                          className={cn(
                            "inline-flex rounded-full px-2.5 py-1 text-xs font-medium",
                            paymentStatusConfig[order.paymentStatus].color
                          )}
                        >
                          {paymentStatusConfig[order.paymentStatus].label}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="rounded-xl w-48">
                            <DropdownMenuItem
                              className="cursor-pointer gap-2"
                              onClick={() => openDetail(order)}
                            >
                              <Eye className="h-4 w-4" />
                              Lihat Detail
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="cursor-pointer gap-2"
                              onClick={() => updateOrderStatus(order.id, "confirmed")}
                              disabled={order.status !== "pending"}
                            >
                              <CheckCircle className="h-4 w-4" />
                              Konfirmasi
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="cursor-pointer gap-2"
                              onClick={() => updateOrderStatus(order.id, "processing")}
                              disabled={order.status !== "confirmed"}
                            >
                              <Package className="h-4 w-4" />
                              Proses
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="cursor-pointer gap-2"
                              onClick={() => updateOrderStatus(order.id, "shipped")}
                              disabled={order.status !== "processing"}
                            >
                              <Truck className="h-4 w-4" />
                              Kirim
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="cursor-pointer gap-2"
                              onClick={() => updateOrderStatus(order.id, "completed")}
                              disabled={order.status !== "shipped"}
                            >
                              <CheckCircle className="h-4 w-4" />
                              Selesaikan
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="cursor-pointer gap-2 text-red-600 focus:text-red-600"
                              onClick={() => updateOrderStatus(order.id, "cancelled")}
                              disabled={order.status === "completed" || order.status === "cancelled"}
                            >
                              <XCircle className="h-4 w-4" />
                              Batalkan
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {paginatedOrders.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16">
              <Package className="h-16 w-16 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Tidak ada pesanan ditemukan
              </h3>
              <p className="text-muted-foreground">
                Coba ubah filter pencarian
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Menampilkan {(currentPage - 1) * itemsPerPage + 1} -{" "}
            {Math.min(currentPage * itemsPerPage, filteredOrders.length)} dari{" "}
            {filteredOrders.length} pesanan
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

      {/* Order Detail Dialog */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="sm:max-w-2xl rounded-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <div>
                <DialogTitle className="text-xl">Detail Pesanan {selectedOrder?.id}</DialogTitle>
                <DialogDescription>
                  {selectedOrder && formatDate(selectedOrder.createdAt)}
                </DialogDescription>
              </div>
              {selectedOrder && (
                <span
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium",
                    statusConfig[selectedOrder.status].color
                  )}
                >
                  {statusConfig[selectedOrder.status].label}
                </span>
              )}
            </div>
          </DialogHeader>

          {selectedOrder && (
            <div className="space-y-6">
              {/* Customer Info */}
              <div className="rounded-xl bg-zinc-50 p-4 dark:bg-zinc-900">
                <h4 className="font-semibold text-foreground mb-3">Informasi Pelanggan</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-medium text-foreground">{selectedOrder.customerName}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Phone className="h-4 w-4" />
                    {selectedOrder.customerPhone}
                  </div>
                  <div className="flex items-start gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    {selectedOrder.customerAddress}
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div>
                <h4 className="font-semibold text-foreground mb-3">Item Pesanan</h4>
                <div className="space-y-3">
                  {selectedOrder.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between rounded-xl bg-zinc-50 p-4 dark:bg-zinc-900"
                    >
                      <div>
                        <p className="font-medium text-foreground">{item.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {item.quantity} {item.unit} x {formatPrice(item.price)}
                        </p>
                      </div>
                      <p className="font-semibold text-foreground">
                        {formatPrice(item.quantity * item.price)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Summary */}
              <div className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="text-foreground">{formatPrice(selectedOrder.subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Ongkos Kirim</span>
                    <span className="text-foreground">{formatPrice(selectedOrder.shipping)}</span>
                  </div>
                  <div className="border-t border-zinc-200 pt-2 dark:border-zinc-800">
                    <div className="flex justify-between">
                      <span className="font-semibold text-foreground">Total</span>
                      <span className="text-lg font-bold text-amber-600">
                        {formatPrice(selectedOrder.total)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Info */}
              <div className="flex items-center justify-between rounded-xl bg-zinc-50 p-4 dark:bg-zinc-900">
                <div className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {selectedOrder.paymentMethod}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      "inline-flex rounded-full px-2.5 py-1 text-xs font-medium",
                      paymentStatusConfig[selectedOrder.paymentStatus].color
                    )}
                  >
                    {paymentStatusConfig[selectedOrder.paymentStatus].label}
                  </span>
                  {selectedOrder.paymentStatus === "unpaid" && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="rounded-lg text-xs"
                      onClick={() => updatePaymentStatus(selectedOrder.id, "paid")}
                    >
                      Tandai Lunas
                    </Button>
                  )}
                </div>
              </div>

              {/* Notes */}
              {selectedOrder.notes && (
                <div className="rounded-xl bg-amber-50 p-4 dark:bg-amber-500/10">
                  <h4 className="font-semibold text-amber-800 dark:text-amber-400 mb-1">Catatan</h4>
                  <p className="text-sm text-amber-700 dark:text-amber-300">{selectedOrder.notes}</p>
                </div>
              )}
            </div>
          )}

          <DialogFooter className="mt-4">
            <Button
              variant="outline"
              onClick={() => setIsDetailOpen(false)}
              className="rounded-xl"
            >
              Tutup
            </Button>
            {selectedOrder && selectedOrder.status !== "completed" && selectedOrder.status !== "cancelled" && (
              <Button
                className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 rounded-xl"
                onClick={() => {
                  const nextStatus: Record<string, Order["status"]> = {
                    pending: "confirmed",
                    confirmed: "processing",
                    processing: "shipped",
                    shipped: "completed",
                  }
                  if (nextStatus[selectedOrder.status]) {
                    updateOrderStatus(selectedOrder.id, nextStatus[selectedOrder.status])
                  }
                }}
              >
                {selectedOrder.status === "pending" && "Konfirmasi Pesanan"}
                {selectedOrder.status === "confirmed" && "Proses Pesanan"}
                {selectedOrder.status === "processing" && "Kirim Pesanan"}
                {selectedOrder.status === "shipped" && "Selesaikan Pesanan"}
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
