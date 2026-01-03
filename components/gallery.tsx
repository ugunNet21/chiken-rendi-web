"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, X } from "lucide-react"

const galleryImages = [
  {
    id: 1,
    src: "/chicken-farm-herd-grazing.jpg",
    alt: "Ayam di peternakan",
    title: "Peternakan Kami",
  },
  {
    id: 2,
    src: "/fresh-eggs-basket-collection.jpg",
    alt: "Koleksi telur segar",
    title: "Telur Segar",
  },
  {
    id: 3,
    src: "/chicken-coop-farm-building.jpg",
    alt: "Kandang ayam modern",
    title: "Fasilitas Terbaik",
  },
  {
    id: 4,
    src: "/farm-workers-caring-for-chickens.jpg",
    alt: "Tim peternakan kami",
    title: "Tim Profesional",
  },
  {
    id: 5,
    src: "/chicken-feeding-farm-fresh-feed.jpg",
    alt: "Pemberian pakan",
    title: "Nutrisi Optimal",
  },
  {
    id: 6,
    src: "/packaging-fresh-chicken-products.jpg",
    alt: "Pengemasan produk",
    title: "Proses Pengemasan",
  },
]

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  return (
    <section id="gallery" className="w-full py-20 md:py-32 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Galeri Peternakan</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Lihat fasilitas peternakan kami, proses produksi, dan kualitas produk kami.
          </p>
        </div>

        {/* Grid Gallery */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {galleryImages.map((image) => (
            <div
              key={image.id}
              onClick={() => setSelectedImage(image.id)}
              className="relative overflow-hidden rounded-lg cursor-pointer group h-64"
            >
              <img
                src={image.src || "/placeholder.svg"}
                alt={image.alt}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors flex items-end p-4">
                <h3 className="text-white font-semibold text-lg">{image.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage !== null && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full">
            <img
              src={galleryImages.find((img) => img.id === selectedImage)?.src || "/placeholder.svg"}
              alt="Gallery"
              className="w-full h-auto rounded-lg"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors"
            >
              <X size={24} className="text-white" />
            </button>
            <button
              onClick={() => {
                const index = galleryImages.findIndex((img) => img.id === selectedImage)
                const prevIndex = index === 0 ? galleryImages.length - 1 : index - 1
                setSelectedImage(galleryImages[prevIndex].id)
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors"
            >
              <ChevronLeft size={24} className="text-white" />
            </button>
            <button
              onClick={() => {
                const index = galleryImages.findIndex((img) => img.id === selectedImage)
                const nextIndex = index === galleryImages.length - 1 ? 0 : index + 1
                setSelectedImage(galleryImages[nextIndex].id)
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors"
            >
              <ChevronRight size={24} className="text-white" />
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
