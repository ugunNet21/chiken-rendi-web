"use client"

import { useState } from "react"
import {
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Pencil,
  Trash2,
  Eye,
  Package,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
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
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

interface Product {
  id: string
  name: string
  category: string
  price: number
  stock: number
  unit: string
  status: "active" | "inactive"
  image: string
  description: string
}

const initialProducts: Product[] = [
  {
    id: "PRD-001",
    name: "Ayam Kampung Segar",
    category: "Ayam",
    price: 75000,
    stock: 45,
    unit: "ekor",
    status: "active",
    image: "🐔",
    description: "Ayam kampung segar berkualitas tinggi dari peternakan lokal.",
  },
  {
    id: "PRD-002",
    name: "Ayam Pedaging",
    category: "Ayam",
    price: 55000,
    stock: 5,
    unit: "ekor",
    status: "active",
    image: "🐓",
    description: "Ayam pedaging gemuk dan sehat.",
  },
  {
    id: "PRD-003",
    name: "Ayam Petelur",
    category: "Ayam",
    price: 85000,
    stock: 20,
    unit: "ekor",
    status: "active",
    image: "🐔",
    description: "Ayam petelur produktif.",
  },
  {
    id: "PRD-004",
    name: "Telur Kampung",
    category: "Telur",
    price: 32000,
    stock: 12,
    unit: "kg",
    status: "active",
    image: "🥚",
    description: "Telur kampung organik.",
  },
  {
    id: "PRD-005",
    name: "Telur Ayam Negeri",
    category: "Telur",
    price: 28000,
    stock: 100,
    unit: "kg",
    status: "active",
    image: "🥚",
    description: "Telur ayam negeri segar.",
  },
  {
    id: "PRD-006",
    name: "Telur Omega",
    category: "Telur",
    price: 35000,
    stock: 8,
    unit: "kg",
    status: "active",
    image: "🥚",
    description: "Telur dengan kandungan omega-3 tinggi.",
  },
  {
    id: "PRD-007",
    name: "Paket Combo Hemat",
    category: "Paket",
    price: 150000,
    stock: 30,
    unit: "paket",
    status: "active",
    image: "📦",
    description: "2 ekor ayam + 2kg telur.",
  },
  {
    id: "PRD-008",
    name: "Paket Premium",
    category: "Paket",
    price: 350000,
    stock: 15,
    unit: "paket",
    status: "active",
    image: "📦",
    description: "5 ekor ayam + 5kg telur + bonus.",
  },
  {
    id: "PRD-009",
    name: "Daging Ayam Potong",
    category: "Daging",
    price: 45000,
    stock: 0,
    unit: "kg",
    status: "inactive",
    image: "🍗",
    description: "Daging ayam potong siap masak.",
  },
]

const categories = ["Semua", "Ayam", "Telur", "Paket", "Daging"]

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("Semua")
  const [currentPage, setCurrentPage] = useState(1)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [formData, setFormData] = useState<Partial<Product>>({
    name: "",
    category: "Ayam",
    price: 0,
    stock: 0,
    unit: "ekor",
    status: "active",
    description: "",
  })

  const itemsPerPage = 6

  // Filter products
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = categoryFilter === "Semua" || product.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)
  const paginatedProducts = filteredProducts.slice(
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

  const handleOpenDialog = (product?: Product) => {
    if (product) {
      setSelectedProduct(product)
      setFormData(product)
    } else {
      setSelectedProduct(null)
      setFormData({
        name: "",
        category: "Ayam",
        price: 0,
        stock: 0,
        unit: "ekor",
        status: "active",
        description: "",
      })
    }
    setIsDialogOpen(true)
  }

  const handleSaveProduct = () => {
    if (selectedProduct) {
      // Edit existing product
      setProducts(
        products.map((p) =>
          p.id === selectedProduct.id
            ? { ...p, ...formData }
            : p
        )
      )
    } else {
      // Add new product
      const newProduct: Product = {
        id: `PRD-${String(products.length + 1).padStart(3, "0")}`,
        name: formData.name || "",
        category: formData.category || "Ayam",
        price: formData.price || 0,
        stock: formData.stock || 0,
        unit: formData.unit || "ekor",
        status: formData.status || "active",
        image: formData.category === "Telur" ? "🥚" : formData.category === "Paket" ? "📦" : "🐔",
        description: formData.description || "",
      }
      setProducts([...products, newProduct])
    }
    setIsDialogOpen(false)
  }

  const handleDeleteProduct = () => {
    if (selectedProduct) {
      setProducts(products.filter((p) => p.id !== selectedProduct.id))
      setIsDeleteDialogOpen(false)
      setSelectedProduct(null)
    }
  }

  const openDeleteDialog = (product: Product) => {
    setSelectedProduct(product)
    setIsDeleteDialogOpen(true)
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Manajemen Produk</h1>
          <p className="text-muted-foreground">
            Kelola semua produk ayam dan telur Anda
          </p>
        </div>
        <Button
          onClick={() => handleOpenDialog()}
          className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all"
        >
          <Plus className="mr-2 h-4 w-4" />
          Tambah Produk
        </Button>
      </div>

      {/* Filters */}
      <Card className="rounded-2xl border-0 shadow-lg">
        <CardContent className="p-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Cari produk..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-11 rounded-xl"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-48 h-11 rounded-xl">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Kategori" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Products Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {paginatedProducts.map((product) => (
          <Card
            key={product.id}
            className={cn(
              "rounded-2xl border-0 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1",
              product.status === "inactive" && "opacity-60"
            )}
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-100 to-orange-100 text-3xl dark:from-amber-500/20 dark:to-orange-500/20">
                  {product.image}
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
                      onClick={() => handleOpenDialog(product)}
                    >
                      <Pencil className="h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="cursor-pointer gap-2 text-red-600 focus:text-red-600"
                      onClick={() => openDeleteDialog(product)}
                    >
                      <Trash2 className="h-4 w-4" />
                      Hapus
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      "rounded-full px-2 py-0.5 text-xs font-medium",
                      product.status === "active"
                        ? "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400"
                        : "bg-zinc-100 text-zinc-500 dark:bg-zinc-500/20"
                    )}
                  >
                    {product.status === "active" ? "Aktif" : "Nonaktif"}
                  </span>
                  <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs font-medium text-zinc-600 dark:bg-zinc-800">
                    {product.category}
                  </span>
                </div>

                <h3 className="font-semibold text-foreground">{product.name}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {product.description}
                </p>

                <div className="flex items-center justify-between pt-2">
                  <p className="text-lg font-bold text-amber-600">
                    {formatPrice(product.price)}
                    <span className="text-sm font-normal text-muted-foreground">
                      /{product.unit}
                    </span>
                  </p>
                  <p
                    className={cn(
                      "text-sm font-medium",
                      product.stock <= 10
                        ? "text-red-500"
                        : product.stock <= 20
                        ? "text-amber-500"
                        : "text-green-500"
                    )}
                  >
                    Stok: {product.stock}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {paginatedProducts.length === 0 && (
        <Card className="rounded-2xl border-0 shadow-lg">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <Package className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Tidak ada produk ditemukan
            </h3>
            <p className="text-muted-foreground text-center mb-4">
              Coba ubah filter pencarian atau tambah produk baru
            </p>
            <Button
              onClick={() => handleOpenDialog()}
              className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 rounded-xl"
            >
              <Plus className="mr-2 h-4 w-4" />
              Tambah Produk
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Menampilkan {(currentPage - 1) * itemsPerPage + 1} -{" "}
            {Math.min(currentPage * itemsPerPage, filteredProducts.length)} dari{" "}
            {filteredProducts.length} produk
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

      {/* Add/Edit Product Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-lg rounded-2xl">
          <DialogHeader>
            <DialogTitle>
              {selectedProduct ? "Edit Produk" : "Tambah Produk Baru"}
            </DialogTitle>
            <DialogDescription>
              {selectedProduct
                ? "Perbarui informasi produk di bawah ini"
                : "Isi form berikut untuk menambah produk baru"}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Nama Produk</Label>
              <Input
                id="name"
                placeholder="Contoh: Ayam Kampung Segar"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="rounded-xl"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="category">Kategori</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                >
                  <SelectTrigger className="rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Ayam">Ayam</SelectItem>
                    <SelectItem value="Telur">Telur</SelectItem>
                    <SelectItem value="Paket">Paket</SelectItem>
                    <SelectItem value="Daging">Daging</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="unit">Satuan</Label>
                <Select
                  value={formData.unit}
                  onValueChange={(value) => setFormData({ ...formData, unit: value })}
                >
                  <SelectTrigger className="rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ekor">Ekor</SelectItem>
                    <SelectItem value="kg">Kilogram</SelectItem>
                    <SelectItem value="paket">Paket</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="price">Harga (Rp)</Label>
                <Input
                  id="price"
                  type="number"
                  placeholder="0"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: parseInt(e.target.value) || 0 })
                  }
                  className="rounded-xl"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="stock">Stok</Label>
                <Input
                  id="stock"
                  type="number"
                  placeholder="0"
                  value={formData.stock}
                  onChange={(e) =>
                    setFormData({ ...formData, stock: parseInt(e.target.value) || 0 })
                  }
                  className="rounded-xl"
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value: "active" | "inactive") =>
                  setFormData({ ...formData, status: value })
                }
              >
                <SelectTrigger className="rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Aktif</SelectItem>
                  <SelectItem value="inactive">Nonaktif</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">Deskripsi</Label>
              <Textarea
                id="description"
                placeholder="Deskripsi produk..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="rounded-xl resize-none"
                rows={3}
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDialogOpen(false)}
              className="rounded-xl"
            >
              Batal
            </Button>
            <Button
              onClick={handleSaveProduct}
              className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 rounded-xl"
            >
              {selectedProduct ? "Simpan Perubahan" : "Tambah Produk"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md rounded-2xl">
          <DialogHeader>
            <DialogTitle>Hapus Produk</DialogTitle>
            <DialogDescription>
              Apakah Anda yakin ingin menghapus produk "{selectedProduct?.name}"? 
              Tindakan ini tidak dapat dibatalkan.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
              className="rounded-xl"
            >
              Batal
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteProduct}
              className="rounded-xl"
            >
              Hapus
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
