import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const products = [
  {
    id: 1,
    name: "Ayam Kampung Segar",
    description: "Ayam kampung hidup berkualitas premium, dipilih langsung dari peternakan kami",
    price: "Rp 80.000",
    image: "/fresh-chicken-farm-poultry.jpg",
    badge: "Best Seller",
  },
  {
    id: 2,
    name: "Telur Ayam Kampung",
    description: "Telur segar organik dari ayam kampung kami, dikemas dengan hati-hati",
    price: "Rp 25.000",
    image: "/fresh-chicken-eggs-basket.jpg",
    badge: "Popular",
  },
  {
    id: 3,
    name: "Paket Combo",
    description: "5 kg ayam kampung + 2 kg telur segar - Paket hemat untuk keluarga",
    price: "Rp 350.000",
    image: "/chicken-and-eggs-combo-package.jpg",
    badge: "Promo",
  },
  {
    id: 4,
    name: "Daging Ayam Potong",
    description: "Daging ayam segar, sudah dipotong sesuai kebutuhan Anda",
    price: "Rp 45.000",
    image: "/fresh-chicken-meat-butcher-cut.jpg",
    badge: "New",
  },
]

export default function Products() {
  return (
    <section id="products" className="w-full py-20 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Produk Kami</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Pilihan produk segar berkualitas tinggi dari peternakan kami. Semua produk diproses dengan standar
            kebersihan terbaik.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-3 right-3 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold">
                  {product.badge}
                </div>
              </div>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">{product.name}</CardTitle>
                <CardDescription className="line-clamp-2">{product.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-primary">{product.price}</span>
                  <Button size="sm" className="bg-primary hover:opacity-90">
                    Pesan
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
