export default function Hero() {
  return (
    <section id="home" className="w-full bg-gradient-to-b from-secondary to-background py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="flex flex-col gap-6">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold text-balance text-foreground">
                Ayam & Telur Segar dari Peternakan Terpercaya
              </h1>
              <p className="text-lg text-muted-foreground">
                Kami menyediakan ayam berkualitas tinggi dan telur organik segar langsung dari peternakan kami. Produk
                terbaik dengan harga yang kompetitif.
              </p>
            </div>
            <div className="flex gap-4 pt-4">
              <button className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity">
                Pesan Sekarang
              </button>
              <button className="px-8 py-3 border border-primary text-primary rounded-lg font-semibold hover:bg-primary/10 transition-colors">
                Pelajari Lebih
              </button>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative h-96 md:h-full">
            <img
              src="/fresh-chicken-farm-eggs.jpg"
              alt="Ayam dan telur segar"
              className="rounded-2xl object-cover w-full h-full shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
